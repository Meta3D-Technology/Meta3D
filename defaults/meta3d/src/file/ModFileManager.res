open Js.Typed_array
open Meta3dCommonlib

type fileJson = {
  protocolName:string,
  blockName:string,

  imagePaths: array<string>,
  soundPaths: array<string>,
  glbPaths: array<string>,
}

let generateMod = (fileStr: string, assetFileJson, assetFiles): ArrayBuffer.t => {
  let encoder = TextEncoder.newTextEncoder()

  BinaryFileOperator.generate(
    [
      TextEncoder.encodeUint8Array(fileStr, encoder),
      TextEncoder.encodeUint8Array(assetFileJson->Obj.magic->Js.Json.stringify, encoder),
    ]->Js.Array.concat(assetFiles, _),
  )
}

let loadMod = (modBinaryFile: ArrayBuffer.t): (
  Js.Typed_array.Uint8Array.t,
  Js.Typed_array.Uint8Array.t,
  array<Js.Typed_array.Uint8Array.t>,
) => {
  let dataArr = BinaryFileOperator.load(modBinaryFile)

  (dataArr[0], dataArr[1], dataArr->ArraySt.sliceFrom(2))
}

let _convertUint8ArrayToBase64 = %raw(`







function uint8ArrayToBase64(uint8Array) {







    const blob = new Blob([uint8Array]);







    return new Promise((resolve, reject) => {







        const reader = new FileReader();







        reader.onloadend = function() {







            resolve(reader.result);







        };







        reader.onerror = reject;







        reader.readAsDataURL(blob);







    });







}







`)

let _convertUint8ArrayToAudioBlob = %raw(`







function uint8ArrayToAudioBlob(uint8Array) {
    return Promise.resolve( new Blob([uint8Array]))
}







`)

let _convertUint8ArrayToArrayBuffer = %raw(`







function uint8ArrayToArrayBuffer(uint8Array) {







    return Promise.resolve( uint8Array.buffer)







}







`)

let _getResourceId = assetPath => {
  let splitor =
  switch(assetPath){
    | assetPath if assetPath-> Js.String.includes("\\", _) =>
    "\\"
    | assetPath if assetPath -> Js.String.includes("/", _) =>
    "/"
    | _ => Meta3dCommonlib.Exception.throwErr(
        Meta3dCommonlib.Exception.buildErr(
          Meta3dCommonlib.Log.buildErrorMessage(
            ~title="unknow",
            ~description="",
            ~reason="",
            ~solution=j``,
            ~params=j``,
          ),
        ),
      )

  }
  let assetName = assetPath->Js.String.split(splitor, _)->Js.Array.pop->OptionSt.getExn

  assetName->Js.String.split(".", _)->ArraySt.unsafeGetFirst
}

let _parseAssets = ((setFunc, convertFunc), stateData, start, end, assetPaths, assetFilesData) => {
  let imageFilesData = assetFilesData->ArraySt.slice(start, end)

  // imageFilesData->ArraySt.reduceOneParami((. stateData, fileData, index) => {
  imageFilesData->ArraySt.traverseReducePromiseIM((. stateData, fileData, index) => {
    convertFunc(fileData)->Js.Promise.then_(data => {
      setFunc(stateData, _getResourceId(assetPaths[index]), data)->Js.Promise.resolve
    }, _)
  }, stateData)
}

let _parseImages = (setImageBase64ResourceFunc, stateData, assetFileJson, assetFilesData) => {
  _parseAssets(
    (setImageBase64ResourceFunc, _convertUint8ArrayToBase64),
    stateData,
    0,
    assetFileJson.imagePaths->ArraySt.length,
    assetFileJson.imagePaths,
    assetFilesData,
  )
}

let _parseAudios = (setAudioBlobResourceFunc, stateData, assetFileJson, assetFilesData) => {
  _parseAssets(
    (setAudioBlobResourceFunc, _convertUint8ArrayToAudioBlob),
    stateData,
      assetFileJson.imagePaths->ArraySt.length,
      assetFileJson.imagePaths->ArraySt.length + assetFileJson.soundPaths->ArraySt.length,
    assetFileJson.soundPaths,
    assetFilesData,
  )
}

let _parseGlbs = (setArrayBufferResourceFunc, stateData, assetFileJson, assetFilesData) => {
  _parseAssets(
    (setArrayBufferResourceFunc, _convertUint8ArrayToArrayBuffer),
    stateData,
      assetFileJson.imagePaths->ArraySt.length + assetFileJson.soundPaths->ArraySt.length,
      assetFileJson.imagePaths->ArraySt.length +
      assetFileJson.soundPaths->ArraySt.length +
      assetFileJson.glbPaths->ArraySt.length,
    assetFileJson.glbPaths,
    assetFilesData,
  )
}

let parse = (
  (setImageBase64ResourceFunc, setAudioBlobResourceFunc, setArrayBufferResourceFunc),
  stateData,
  modFuncData,
  assetFileJsonData,
  assetFilesData,
) => {
  let decoder = TextDecoder.newTextDecoder("utf-8")

  let assetFileJson: fileJson =
    TextDecoder.decodeUint8Array(assetFileJsonData, decoder)
    ->FileUtils.removeAlignedEmptyChars
    ->Js.Json.parseExn
    ->Obj.magic

  _parseImages(setImageBase64ResourceFunc, stateData, assetFileJson, assetFilesData)
  ->Js.Promise.then_(_parseAudios(setAudioBlobResourceFunc, _, assetFileJson, assetFilesData), _)
  ->Js.Promise.then_(_parseGlbs(setArrayBufferResourceFunc, _, assetFileJson, assetFilesData), _)
  ->Js.Promise.then_(stateData => {
    let lib = TextDecoder.decodeUint8Array(modFuncData, decoder)->LibUtils.serializeLib("Mod")

    (
      stateData,
      assetFileJson,
      (
        LibUtils.getFuncFromLib(lib, "getBlockService")->Obj.magic,
        LibUtils.getFuncFromLib(lib, "createBlockState")->Obj.magic,
        LibUtils.getFuncFromLib(lib, "getBlockInfo")->Obj.magic,
      ),
    )->Js.Promise.resolve
  }, _)
}

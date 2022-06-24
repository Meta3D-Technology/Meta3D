open Js.Typed_array

let _generate = (packageData, fileStr: string): ArrayBuffer.t => {
  let encoder = TextEncoder.newTextEncoder()

  BinaryFileOperator.generate([
    TextEncoder.encodeUint8Array(packageData->Obj.magic->Js.Json.stringify, encoder),
    TextEncoder.encodeUint8Array(fileStr, encoder),
  ])
}

let generateExtension = _generate

let loadExtension = (extensionBinaryFile: ArrayBuffer.t): ExtensionFileType.extensionFileData => {
  let decoder = TextDecoder.newTextDecoder("utf-8")

  let dataArr = BinaryFileOperator.load(extensionBinaryFile)

  // let lib = TextDecoder.decodeUint8Array(dataArr[1], decoder)->LibUtils.serializeLib("Extension")

  {
    extensionPackageData: TextDecoder.decodeUint8Array(dataArr[0], decoder)
    ->FileUtils.removeAlignedEmptyChars
    ->Js.Json.parseExn
    ->Obj.magic,
    extensionFuncData: dataArr[1],
    // {
    //   getExtensionServiceFunc: LibUtils.getFuncFromLib(lib, "getExtensionService")->Obj.magic,
    //   createExtensionStateFunc: LibUtils.getFuncFromLib(lib, "createExtensionState")->Obj.magic,
    //   getExtensionLifeFunc: LibUtils.getFuncFromLib(lib, "getExtensionLife")->Obj.magic,
    // },
  }
}

let generateContribute = _generate

let loadContribute = (
  contributeBinaryFile: ArrayBuffer.t,
): ExtensionFileType.contributeFileData => {
  let decoder = TextDecoder.newTextDecoder("utf-8")

  let dataArr = BinaryFileOperator.load(contributeBinaryFile)

  // let lib = TextDecoder.decodeUint8Array(dataArr[1], decoder)->LibUtils.serializeLib("Contribute")

  {
    contributePackageData: TextDecoder.decodeUint8Array(dataArr[0], decoder)
    ->FileUtils.removeAlignedEmptyChars
    ->Js.Json.parseExn
    ->Obj.magic,
    // contributeFuncData: {
    //   getContributeFunc: LibUtils.getFuncFromLib(lib, "getContribute")->Obj.magic,
    // },
    contributeFuncData: dataArr[1],
  }
}

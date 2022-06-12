open Js.Typed_array

let _generate = (packageData, fileStr: string): ArrayBuffer.t => {
  let encoder = TextEncoder.newTextEncoder()

  BinaryFileOperator.generate([
    TextEncoder.encodeUint8Array(packageData->Obj.magic->Js.Json.stringify, encoder),
    TextEncoder.encodeUint8Array(fileStr, encoder),
  ])
}

let generateExtension = _generate

let _removeAlignedEmptyChars = decodedStr => decodedStr->Js.String.trim

let loadExtension = (extensionBinaryFile: ArrayBuffer.t): ExtensionFileType.extensionFileData => {
  let decoder = TextDecoder.newTextDecoder("utf-8")

  let dataArr = BinaryFileOperator.load(extensionBinaryFile)

  let lib = TextDecoder.decodeUint8Array(dataArr[1], decoder)->LibUtils.serializeLib("Extension")

  {
    extensionPackageData: TextDecoder.decodeUint8Array(dataArr[0], decoder)
    ->_removeAlignedEmptyChars
    ->Js.Json.parseExn
    ->Obj.magic,
    extensionFuncData: {
      getExtensionServiceFunc: LibUtils.getFuncFromLib(lib, "getExtensionService")->Obj.magic,
      createExtensionStateFunc: LibUtils.getFuncFromLib(lib, "createExtensionState")->Obj.magic,
      getExtensionLifeFunc: LibUtils.getFuncFromLib(lib, "getExtensionLife")->Obj.magic,
    },
  }
}

let generateContribute = _generate

let loadContribute = (
  contributeBinaryFile: ArrayBuffer.t,
): ExtensionFileType.contributeFileData => {
  let decoder = TextDecoder.newTextDecoder("utf-8")

  let dataArr = BinaryFileOperator.load(contributeBinaryFile)

  let lib = TextDecoder.decodeUint8Array(dataArr[1], decoder)->LibUtils.serializeLib("Contribute")

  {
    contributePackageData: TextDecoder.decodeUint8Array(dataArr[0], decoder)
    ->_removeAlignedEmptyChars
    ->Js.Json.parseExn
    ->Obj.magic,
    contributeFuncData: {
      getContributeFunc: LibUtils.getFuncFromLib(lib, "getContribute")->Obj.magic,
    },
  }
}

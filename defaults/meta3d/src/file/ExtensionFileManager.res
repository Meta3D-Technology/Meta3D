open Js.Typed_array

let _compress = (fileStr: string): ArrayBuffer.t => {
  let encoder = TextEncoder.newTextEncoder()

  TextEncoder.encodeUint8Array(fileStr, encoder)->Uint8Array.buffer
}

let compressExtension = (extensionFileStr: string): ArrayBuffer.t => {
  _compress(extensionFileStr)
}

let loadExtension = (extensionBinaryFile: ArrayBuffer.t): ExtensionFileType.extensionFileData => {
  let decoder = TextDecoder.newTextDecoder("utf-8")

  let lib =
    TextDecoder.decodeArrayBuffer(extensionBinaryFile, decoder)->LibUtils.serializeLib("Extension")

  {
    extensionName: LibUtils.getFuncFromLib(lib, "getName")->Obj.magic(),
    getExtensionServiceFunc: LibUtils.getFuncFromLib(lib, "getExtensionService")->Obj.magic,
    createExtensionStateFunc: LibUtils.getFuncFromLib(lib, "createExtensionState")->Obj.magic,
    getExtensionLifeFunc: LibUtils.getFuncFromLib(lib, "getExtensionLife")->Obj.magic,
  }
}

let compressContribute = (contributeFileStr: string): ArrayBuffer.t => {
  _compress(contributeFileStr)
}

let loadContribute = (
  contributeBinaryFile: ArrayBuffer.t,
): ExtensionFileType.contributeFileData => {
  let decoder = TextDecoder.newTextDecoder("utf-8")

  let lib =
    TextDecoder.decodeArrayBuffer(contributeBinaryFile, decoder)->LibUtils.serializeLib(
      "Contribute",
    )

  {
    contributeName: LibUtils.getFuncFromLib(lib, "getName")->Obj.magic(),
    getContributeFunc: LibUtils.getFuncFromLib(lib, "getContribute")->Obj.magic,
  }
}

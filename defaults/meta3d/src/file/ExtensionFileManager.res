open Js.Typed_array

let compressExtension = (extensionFileStr: string): ArrayBuffer.t => {
  let encoder = TextEncoder.newTextEncoder()

  TextEncoder.encodeUint8Array(extensionFileStr, encoder)->Uint8Array.buffer
}

let loadExtension = (extensionBinaryFile: ArrayBuffer.t): ExtensionFileType.extensionFileData => {
  let decoder = TextDecoder.newTextDecoder("utf-8")

  let lib =
    TextDecoder.decodeArrayBuffer(extensionBinaryFile, decoder)->LibUtils.serializeLib("Extension")

  {
    extensionName: LibUtils.getFuncFromLib(lib, "getName")->Obj.magic,
    getExtensionServiceFunc: LibUtils.getFuncFromLib(lib, "getExtensionService")->Obj.magic,
    createExtensionStateFunc: LibUtils.getFuncFromLib(lib, "createExtensionState")->Obj.magic,
    getExtensionLifeFunc: LibUtils.getFuncFromLib(lib, "getExtensionLife")->Obj.magic,
  }
}

// let compressContribute = (contributeFileStr: string): ArrayBuffer.t => {
//   // accept extension file string

//   // convert to binary file
//   ()
// }

// let loadContribute = (contributeBinaryFile: ArrayBuffer.t) => {
//   //TODO implement
//   Obj.magic(1)
// }

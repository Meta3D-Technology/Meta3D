open Js.Typed_array

open AppFileType

let generate = (
  allExtensionFileData: array<(extensionPackageData, ExtensionFileType.extensionFuncData)>,
  allContributeFileData: array<(contributePackageData, ExtensionFileType.contributeFuncData)>,
): ArrayBuffer.t => {
  let encoder = TextEncoder.newTextEncoder()

  [
    allExtensionFileData
    ->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. result, (extensionPackageData, extensionFuncData)) => {
        result
        ->Meta3dCommonlib.ArraySt.push(
          TextEncoder.encodeUint8Array(extensionPackageData->Obj.magic->Js.Json.stringify, encoder),
        )
        ->Meta3dCommonlib.ArraySt.push(extensionFuncData)
      },
      [],
    )
    ->BinaryFileOperator.generate
    ->Uint8Array.fromBuffer,
    allContributeFileData
    ->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. result, (contributePackageData, contributeFuncData)) => {
        result
        ->Meta3dCommonlib.ArraySt.push(
          TextEncoder.encodeUint8Array(
            contributePackageData->Obj.magic->Js.Json.stringify,
            encoder,
          ),
        )
        ->Meta3dCommonlib.ArraySt.push(contributeFuncData)
      },
      [],
    )
    ->BinaryFileOperator.generate
    ->Uint8Array.fromBuffer,
  ]->BinaryFileOperator.generate
}

let _parse = (appBinaryFile: ArrayBuffer.t) => {
  let decoder = TextDecoder.newTextDecoder("utf-8")

  let [allExtensionBinaryTypeFile, allContributeBinaryTypeFile] = BinaryFileOperator.load(
    appBinaryFile,
  )

  (
    BinaryFileOperator.load(allExtensionBinaryTypeFile->Uint8Array.buffer)
    ->Meta3dCommonlib.ArraySt.chunk(2)
    ->Meta3dCommonlib.ArraySt.map(([extensionPackageData, extensionFuncData]) => {
      let lib =
        TextDecoder.decodeUint8Array(extensionFuncData, decoder)->LibUtils.serializeLib("Extension")

      {
        extensionPackageData: TextDecoder.decodeUint8Array(extensionPackageData, decoder)
        ->FileUtils.removeAlignedEmptyChars
        ->Js.Json.parseExn
        ->Obj.magic,
        extensionFuncData: {
          getExtensionServiceFunc: LibUtils.getFuncFromLib(lib, "getExtensionService")->Obj.magic,
          createExtensionStateFunc: LibUtils.getFuncFromLib(lib, "createExtensionState")->Obj.magic,
          getExtensionLifeFunc: LibUtils.getFuncFromLib(lib, "getExtensionLife")->Obj.magic,
        },
      }
    }),
    BinaryFileOperator.load(allContributeBinaryTypeFile->Uint8Array.buffer)
    ->Meta3dCommonlib.ArraySt.chunk(2)
    ->Meta3dCommonlib.ArraySt.map(([contributePackageData, contributeFuncData]) => {
      let lib =
        TextDecoder.decodeUint8Array(contributeFuncData, decoder)->LibUtils.serializeLib(
          "Contribute",
        )

      {
        contributePackageData: TextDecoder.decodeUint8Array(contributePackageData, decoder)
        ->FileUtils.removeAlignedEmptyChars
        ->Js.Json.parseExn
        ->Obj.magic,
        contributeFuncData: {
          getContributeFunc: LibUtils.getFuncFromLib(lib, "getContribute")->Obj.magic,
        },
      }
    }),
  )
}

let _prepare = (): Meta3dType.Index.state => {
  {
    extensionServiceMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    extensionStateMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    extensionLifeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    contributeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  }
}

let _getStartExtensionNames = allExtensionDataArr => {
  allExtensionDataArr
  ->Meta3dCommonlib.ArraySt.filter(({extensionPackageData}) => {
    extensionPackageData.isStart
  })
  ->Meta3dCommonlib.ArraySt.map(({extensionPackageData}) => {
    extensionPackageData.name
  })
}

let _run = ((allExtensionDataArr, allContributeDataArr)) => {
  let state =
    allExtensionDataArr->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. state, {extensionPackageData, extensionFuncData}: extensionFileData) => {
        state->ExtensionManager.registerExtension(
          extensionPackageData.name,
          extensionFuncData.getExtensionServiceFunc,
          extensionFuncData.getExtensionLifeFunc,
          (
            extensionPackageData.dependentExtensionNameMap,
            extensionPackageData.dependentContributeNameMap,
          ),
          extensionFuncData.createExtensionStateFunc(),
        )
      },
      _prepare(),
    )

  allContributeDataArr
  ->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. state, {contributePackageData, contributeFuncData}: contributeFileData) => {
      state->ExtensionManager.registerContribute(
        contributePackageData.name,
        contributeFuncData.getContributeFunc,
        (
          contributePackageData.dependentExtensionNameMap,
          contributePackageData.dependentContributeNameMap,
        ),
      )
    },
    state,
  )
  ->ExtensionManager.startExtensions(_getStartExtensionNames(allExtensionDataArr))
}

let load = (appBinaryFile: ArrayBuffer.t): Meta3dType.Index.state => {
  appBinaryFile->_parse->_run
}

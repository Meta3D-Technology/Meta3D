open Js.Typed_array

open AppAndPackageFileType

let generate = ((
  allExtensionFileData: array<(extensionPackageData, ExtensionFileType.extensionFuncData)>,
  allContributeFileData: array<(contributePackageData, ExtensionFileType.contributeFuncData)>,
)): array<Uint8Array.t> => {
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
  ]
}

let mergeAllPackageBinaryFiles = (
  // (
  //   allExtensionFileData: array<(extensionPackageData, ExtensionFileType.extensionFuncData)>,
  //   allContributeFileData: array<(contributePackageData, ExtensionFileType.contributeFuncData)>,
  // ),
  [allExtensionBinaryUint8File, allContributeBinaryUint8File]: array<Uint8Array.t>,
  // (
  //   allExtensionFileData: array<ExtensionFileType.extensionFileData>,
  //   allContributeFileData: array<ExtensionFileType.contributeFileData>,
  // ),
  allPackageBinaryFiles: array<ArrayBuffer.t>,
): // allPackageBinaryUint8Files: array<Uint8Array.t>,
// allPackageBinaryUint8Files: array<Uint8Array.t>,
// : (
//   array<(extensionPackageData, ExtensionFileType.extensionFuncData)>,
//   array<(contributePackageData, ExtensionFileType.contributeFuncData)>,
// )
// : (array<ExtensionFileType.extensionFileData>, array<ExtensionFileType.contributeFileData>)
array<Uint8Array.t> => {
  // allPackageBinaryUint8Files->Meta3dCommonlib.ArraySt.reduceOneParam(
  allPackageBinaryFiles->Meta3dCommonlib.ArraySt.reduceOneParam(
    // (. [allExtensionBinaryUint8File, allContributeBinaryUint8File], packageBinaryUint8File) => {
    (. [allExtensionBinaryUint8File, allContributeBinaryUint8File], packageBinaryFile) => {
      let [
        allExtensionBinaryUint8FileInPackage,
        allContributeBinaryUint8FileInPackage,
        // ] = BinaryFileOperator.load(packageBinaryUint8File->Uint8Array.buffer)
      ] = BinaryFileOperator.load(packageBinaryFile)

      [
        Js.Array.concat(
          BinaryFileOperator.load(allExtensionBinaryUint8FileInPackage->Uint8Array.buffer),
          BinaryFileOperator.load(allExtensionBinaryUint8File->Uint8Array.buffer),
        )
        ->BinaryFileOperator.generate
        ->Uint8Array.fromBuffer,
        Js.Array.concat(
          BinaryFileOperator.load(allContributeBinaryUint8FileInPackage->Uint8Array.buffer),
          BinaryFileOperator.load(allContributeBinaryUint8File->Uint8Array.buffer),
        )
        ->BinaryFileOperator.generate
        ->Uint8Array.fromBuffer,
      ]

      // [
      //       BinaryFileOperator.merge(allExtensionBinaryUint8File, allExtensionBinaryUint8FileInPackage),

      //       BinaryFileOperator.merge(allContributeBinaryUint8File, allContributeBinaryUint8FileInPackage)
      //  ]

      // (
      //   BinaryFileOperator.load(allExtensionBinaryUint8File->Uint8Array.buffer)
      //   ->Meta3dCommonlib.ArraySt.chunk(2)
      //   ->Js.Array.concat(allExtensionFileData),
      //   BinaryFileOperator.load(allContributeBinaryUint8File->Uint8Array.buffer)
      //   ->Meta3dCommonlib.ArraySt.chunk(2)
      //   ->Js.Array.concat(allContributeFileData),
      // )
    },
    [allExtensionBinaryUint8File, allContributeBinaryUint8File],
  )
}

let getContributeFunc = (contributeFuncData, decoder) => {
  let lib =
    TextDecoder.decodeUint8Array(contributeFuncData, decoder)->LibUtils.serializeLib("Contribute")

  LibUtils.getFuncFromLib(lib, "getContribute")
}

let _parse = ([allExtensionBinaryUint8File, allContributeBinaryUint8File]) => {
  let decoder = TextDecoder.newTextDecoder("utf-8")

  //   let [
  //     allExtensionBinaryUint8File,
  //     allContributeBinaryUint8File,
  //     configData,
  //   ] = BinaryFileOperator.load(appBinaryFile)

  (
    BinaryFileOperator.load(allExtensionBinaryUint8File->Uint8Array.buffer)
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
    BinaryFileOperator.load(allContributeBinaryUint8File->Uint8Array.buffer)
    ->Meta3dCommonlib.ArraySt.chunk(2)
    ->Meta3dCommonlib.ArraySt.map(([contributePackageData, contributeFuncData]) => {
      {
        contributePackageData: TextDecoder.decodeUint8Array(contributePackageData, decoder)
        ->FileUtils.removeAlignedEmptyChars
        ->Js.Json.parseExn
        ->Obj.magic,
        contributeFuncData: {
          getContributeFunc: getContributeFunc(contributeFuncData, decoder)->Obj.magic,
        },
      }
    }),
    // TextDecoder.decodeUint8Array(configData, decoder)
    // ->FileUtils.removeAlignedEmptyChars
    // ->Js.Json.parseExn
    // ->Obj.magic,
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

// let _run = ((allExtensionDataArr, allContributeDataArr, configData)) => {
let _run = ((allExtensionDataArr, allContributeDataArr)) => {
  let state =
    allExtensionDataArr->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. state, {extensionPackageData, extensionFuncData}: extensionFileData) => {
        state->ExtensionManager.registerExtension(
          extensionPackageData.protocolName,
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

  let state =
    allContributeDataArr->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. state, {contributePackageData, contributeFuncData}: contributeFileData) => {
        state->ExtensionManager.registerContribute(
          contributePackageData.protocolName,
          contributeFuncData.getContributeFunc,
          (
            contributePackageData.dependentExtensionNameMap,
            contributePackageData.dependentContributeNameMap,
          ),
        )
      },
      state,
    )

  (state, allExtensionDataArr)
}

let load = (data: array<Uint8Array.t>): (Meta3dType.Index.state, array<extensionFileData>) => {
  data->_parse->_run
}

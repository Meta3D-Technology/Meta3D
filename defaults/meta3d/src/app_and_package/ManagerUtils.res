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
  [allExtensionUint8, allContributeUint8]: array<Uint8Array.t>,
  // (
  //   allExtensionFileData: array<ExtensionFileType.extensionFileData>,
  //   allContributeFileData: array<ExtensionFileType.contributeFileData>,
  // ),
  allPackageBinaryFiles: array<ArrayBuffer.t>,
): // allPackageUint8s: array<Uint8Array.t>,
// allPackageUint8s: array<Uint8Array.t>,
// : (
//   array<(extensionPackageData, ExtensionFileType.extensionFuncData)>,
//   array<(contributePackageData, ExtensionFileType.contributeFuncData)>,
// )
// : (array<ExtensionFileType.extensionFileData>, array<ExtensionFileType.contributeFileData>)
array<Uint8Array.t> => {
  // allPackageUint8s->Meta3dCommonlib.ArraySt.reduceOneParam(
  allPackageBinaryFiles->Meta3dCommonlib.ArraySt.reduceOneParam(
    // (. [allExtensionUint8, allContributeUint8], packageUint8) => {
    (. [allExtensionUint8, allContributeUint8], packageBinaryFile) => {
      let [
        allExtensionUint8InPackage,
        allContributeUint8InPackage,
        // ] = BinaryFileOperator.load(packageUint8->Uint8Array.buffer)
      ] = BinaryFileOperator.load(packageBinaryFile)

      [
        Js.Array.concat(
          BinaryFileOperator.load(allExtensionUint8InPackage->Uint8Array.buffer),
          BinaryFileOperator.load(allExtensionUint8->Uint8Array.buffer),
        )
        ->BinaryFileOperator.generate
        ->Uint8Array.fromBuffer,
        Js.Array.concat(
          BinaryFileOperator.load(allContributeUint8InPackage->Uint8Array.buffer),
          BinaryFileOperator.load(allContributeUint8->Uint8Array.buffer),
        )
        ->BinaryFileOperator.generate
        ->Uint8Array.fromBuffer,
      ]

      // [
      //       BinaryFileOperator.merge(allExtensionUint8, allExtensionUint8InPackage),

      //       BinaryFileOperator.merge(allContributeUint8, allContributeUint8InPackage)
      //  ]

      // (
      //   BinaryFileOperator.load(allExtensionUint8->Uint8Array.buffer)
      //   ->Meta3dCommonlib.ArraySt.chunk(2)
      //   ->Js.Array.concat(allExtensionFileData),
      //   BinaryFileOperator.load(allContributeUint8->Uint8Array.buffer)
      //   ->Meta3dCommonlib.ArraySt.chunk(2)
      //   ->Js.Array.concat(allContributeFileData),
      // )
    },
    [allExtensionUint8, allContributeUint8],
  )
}

let getExtensionFuncDataStr = (decoder, extensionFuncData) => {
  TextDecoder.decodeUint8Array(extensionFuncData, decoder)
}

let getExtensionFuncData = (encoder, extensionFuncDataStr) => {
  TextEncoder.encodeUint8Array(extensionFuncDataStr, encoder)
}

let getContributeFuncDataStr = (decoder, contributeFuncData) => {
  TextDecoder.decodeUint8Array(contributeFuncData, decoder)
}

let getContributeFuncData = (encoder, contributeFuncDataStr) => {
  TextEncoder.encodeUint8Array(contributeFuncDataStr, encoder)
}

let getContributeFunc = (contributeFuncData, decoder) => {
  let lib =
    TextDecoder.decodeUint8Array(contributeFuncData, decoder)->LibUtils.serializeLib("Contribute")

  LibUtils.getFuncFromLib(lib, "getContribute")
}

let _parse1 = ([allExtensionUint8, allContributeUint8]) => {
  let decoder = TextDecoder.newTextDecoder("utf-8")

  (
    BinaryFileOperator.load(allExtensionUint8->Uint8Array.buffer)
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
    BinaryFileOperator.load(allContributeUint8->Uint8Array.buffer)
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
  )
}

let parse2 = ([allExtensionUint8, allContributeUint8]) => {
  let decoder = TextDecoder.newTextDecoder("utf-8")

  (
    BinaryFileOperator.load(allExtensionUint8->Uint8Array.buffer)
    ->Meta3dCommonlib.ArraySt.chunk(2)
    ->Meta3dCommonlib.ArraySt.map(([extensionPackageData, extensionFuncData]) => {
      (
        TextDecoder.decodeUint8Array(extensionPackageData, decoder)
        ->FileUtils.removeAlignedEmptyChars
        ->Js.Json.parseExn
        ->Obj.magic,
        extensionFuncData,
      )
    }),
    BinaryFileOperator.load(allContributeUint8->Uint8Array.buffer)
    ->Meta3dCommonlib.ArraySt.chunk(2)
    ->Meta3dCommonlib.ArraySt.map(([contributePackageData, contributeFuncData]) => {
      (
        TextDecoder.decodeUint8Array(contributePackageData, decoder)
        ->FileUtils.removeAlignedEmptyChars
        ->Js.Json.parseExn
        ->Obj.magic,
        contributeFuncData,
      )
    }),
  )
}

let _prepare = (): Meta3dType.Index.state => {
  {
    extensionServiceMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    extensionStateMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    extensionLifeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    contributeExceptActionMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    actionMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    packageStoreInAppMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  }
}

let _checkVersion = (protocolVersion, dependentProtocolVersion, dependentProtocolName) => {
  // Semver.satisfies(Semver.minVersion(protocolVersion), dependentProtocolVersion)
  Semver.gte(Semver.minVersion(protocolVersion), Semver.minVersion(dependentProtocolVersion))
    ? ()
    : Meta3dCommonlib.Exception.throwErr(
        Meta3dCommonlib.Exception.buildErr(
          Meta3dCommonlib.Log.buildErrorMessage(
            ~title="version not match",
            ~description={
              j`${dependentProtocolName}
              ${protocolVersion} not match dependentProtocolVersion: ${dependentProtocolVersion}`
            },
            ~reason="",
            ~solution=j``,
            ~params=j``,
          ),
        ),
      )
}

let _checkDependentMap = (dependentMap, allDataMap) => {
  dependentMap
  ->Meta3dCommonlib.ImmutableHashMap.entries
  ->Meta3dCommonlib.ArraySt.forEach(((blockProtocolName, blockProtocolVersion)) => {
    let protocolVersion = switch allDataMap->Meta3dCommonlib.ImmutableHashMap.get(
      blockProtocolName,
    ) {
    | None =>
      Meta3dCommonlib.Exception.throwErr(
        Meta3dCommonlib.Exception.buildErr(
          Meta3dCommonlib.Log.buildErrorMessage(
            ~title={j`not find dependent protocol: ${blockProtocolName}`},
            ~description={
              j``
            },
            ~reason="",
            ~solution=j``,
            ~params=j``,
          ),
        ),
      )
    | Some(data) => data
    }

    // _checkVersion(protocolVersion, blockProtocolVersion, blockProtocolName)
  })
}

let _checkAllDependents = ((allExtensionDataArr, allContributeDataArr)) => {
  let allExtensionDataMap =
    allExtensionDataArr->Meta3dCommonlib.ArraySt.reduceOneParami(
      (. result, {extensionPackageData}: extensionFileData, i) => {
        result->Meta3dCommonlib.ImmutableHashMap.set(
          extensionPackageData.protocol.name,
          extensionPackageData.protocol.version,
        )
      },
      Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    )

  let allContributeDataMap =
    allContributeDataArr->Meta3dCommonlib.ArraySt.reduceOneParami(
      (. result, {contributePackageData}: contributeFileData, i) => {
        result->Meta3dCommonlib.ImmutableHashMap.set(
          contributePackageData.protocol.name,
          contributePackageData.protocol.version,
        )
      },
      Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    )

  allExtensionDataArr->Meta3dCommonlib.ArraySt.forEach((
    {extensionPackageData}: extensionFileData,
  ) => {
    _checkDependentMap(
      extensionPackageData.dependentBlockProtocolNameMap,
      allExtensionDataMap->Meta3dCommonlib.ImmutableHashMap.merge(allContributeDataMap),
    )
  })
  allContributeDataArr->Meta3dCommonlib.ArraySt.forEach((
    {contributePackageData}: contributeFileData,
  ) => {
    _checkDependentMap(
      contributePackageData.dependentBlockProtocolNameMap,
      allExtensionDataMap->Meta3dCommonlib.ImmutableHashMap.merge(allContributeDataMap),
    )
  })

  (allExtensionDataArr, allContributeDataArr)
}

// let _run = ((allExtensionDataArr, allContributeDataArr, configData)) => {
let _run = ((allExtensionDataArr, allContributeDataArr)) => {
  let state =
    allExtensionDataArr->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. state, {extensionPackageData, extensionFuncData}: extensionFileData) => {
        state->ExtensionManager.registerExtension(
          extensionPackageData.protocol.name,
          extensionFuncData.getExtensionServiceFunc,
          extensionFuncData.getExtensionLifeFunc,
          extensionFuncData.createExtensionStateFunc(),
        )
      },
      _prepare(),
    )

  let state =
    allContributeDataArr->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. state, {contributePackageData, contributeFuncData}: contributeFileData) => {
        state->ExtensionManager.registerContribute(
          contributePackageData.protocol.name,
          contributeFuncData.getContributeFunc,
        )
      },
      state,
    )

  (state, allExtensionDataArr)
}

let load = (data: array<Uint8Array.t>): (Meta3dType.Index.state, array<extensionFileData>) => {
  data->_parse1->_checkAllDependents->_run
}

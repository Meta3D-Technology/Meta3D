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
  [allExtensionUint8, allContributeUint8]: array<Uint8Array.t>,
  allPackageBinaryFiles: array<ArrayBuffer.t>,
): array<Uint8Array.t> => {
  [
    allExtensionUint8,
    allContributeUint8,
    allPackageBinaryFiles
    ->Meta3dCommonlib.ArraySt.map(Uint8Array.fromBuffer)
    ->BinaryFileOperator.generate
    ->Uint8Array.fromBuffer,
  ]
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

let convertContributeFuncData = contributeFuncData => {
  let decoder = TextDecoder.newTextDecoder("utf-8")

  {getContributeFunc: getContributeFunc(contributeFuncData, decoder)->Obj.magic}
}

let rec _mergeAllPackageBinaryUint8s = (
  [allExtensionUint8, allContributeUint8]: array<Uint8Array.t>,
  allPackageBinaryUint8s: array<Uint8Array.t>,
): array<Uint8Array.t> => {
  allPackageBinaryUint8s->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. [allExtensionUint8, allContributeUint8], packageBinaryUint8) => {
      let [
        allExtensionUint8InPackage,
        allContributeUint8InPackage,
        allSubPackageBinaryUint8s,
        _,
      ] = BinaryFileOperator.load(packageBinaryUint8->Uint8Array.buffer)

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
      ]->_mergeAllPackageBinaryUint8s(
        allSubPackageBinaryUint8s->Uint8Array.buffer->BinaryFileOperator.load,
      )
    },
    [allExtensionUint8, allContributeUint8],
  )
}

let _parse1 = ([allExtensionUint8, allContributeUint8, allPackageBinaryUint8s, _]) => {
  let decoder = TextDecoder.newTextDecoder("utf-8")

  let [allExtensionUint8, allContributeUint8] = _mergeAllPackageBinaryUint8s(
    [allExtensionUint8, allContributeUint8],
    allPackageBinaryUint8s->Uint8Array.buffer->BinaryFileOperator.load,
  )

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
        // contributeFuncData: {
        //   getContributeFunc: getContributeFunc(contributeFuncData, decoder)->Obj.magic,
        // },
        contributeFuncData: convertContributeFuncData(contributeFuncData),
      }
    }),
  )
}

let decodePackageData = (packageData, decoder) => {
  TextDecoder.decodeUint8Array(packageData, decoder)
  ->FileUtils.removeAlignedEmptyChars
  ->Js.Json.parseExn
  ->Obj.magic
}

let _parse = ([allExtensionUint8, allContributeUint8, allPackageBinaryUint8s]) => {
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
    BinaryFileOperator.load(allPackageBinaryUint8s->Uint8Array.buffer)->Meta3dCommonlib.ArraySt.map(
      Uint8Array.buffer,
    ),
  )
}

let parse2 = ([
  allExtensionUint8,
  allContributeUint8,
  allPackageBinaryUint8s,
  packageDataUint8,
]) => {
  let decoder = TextDecoder.newTextDecoder("utf-8")

  let (data1, data2, data3) = _parse([
    allExtensionUint8,
    allContributeUint8,
    allPackageBinaryUint8s,
  ])

  (data1, data2, data3, decodePackageData(packageDataUint8, decoder))
}

let parse3 = _parse

let _prepare = (): Meta3dType.Index.state => {
  {
    extensionServiceMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    extensionStateMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    extensionLifeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    contributeExceptInputMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    inputMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
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

let _addGeneratedContribute = (
  (allExtensionDataArr, allContributeDataArr),
  addGeneratedContributeFunc,
  selectedElements,
) => {
  (allExtensionDataArr, allContributeDataArr->addGeneratedContributeFunc(selectedElements))
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
          extensionFuncData.createExtensionStateFunc(. state, ExtensionManager.buildAPI()),
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

// let loadApp = (addGeneratedContributeFunc, customData, data: array<Uint8Array.t>): (
let loadApp = (addGeneratedContributeFunc,
selectedElements,
 data: array<Uint8Array.t>): (
  Meta3dType.Index.state,
  array<extensionFileData>,
) => {
  data
  ->_parse1
  ->_checkAllDependents
  ->_addGeneratedContribute(addGeneratedContributeFunc, selectedElements)
  ->_run
}

let loadPackage = (data: array<Uint8Array.t>): (
  Meta3dType.Index.state,
  array<extensionFileData>,
) => {
  data->_parse1->_checkAllDependents->_run
}

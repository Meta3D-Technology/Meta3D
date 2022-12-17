open Js.Typed_array

open AppAndPackageFileType

let _checkVersion = (protocolVersion, dependentProtocolVersion, dependentProtocolName) => {
  Semver.satisfies(Semver.minVersion(protocolVersion), dependentProtocolVersion)
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

let _convertDependentMap = (dependentMap, allDataMap) => {
  dependentMap
  ->Meta3dCommonlib.ImmutableHashMap.entries
  ->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. map, (dependentNameKey, dependentData: ExtensionFileType.dependentData)) => {
      let (newName, protocolVersion) = switch allDataMap->Meta3dCommonlib.ImmutableHashMap.get(
        dependentData.protocolName,
      ) {
      | None =>
        Meta3dCommonlib.Exception.throwErr(
          Meta3dCommonlib.Exception.buildErr(
            Meta3dCommonlib.Log.buildErrorMessage(
              ~title={j`not find dependent protocol: ${dependentData.protocolName}`},
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

      _checkVersion(protocolVersion, dependentData.protocolVersion, dependentData.protocolName)

      map->Meta3dCommonlib.ImmutableHashMap.set(dependentNameKey, newName)
    },
    Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  )
}

let convertAllFileData = (
  allExtensionFileData: array<ExtensionFileType.extensionFileData>,
  allContributeFileData: array<ExtensionFileType.contributeFileData>,
  allPackageEntryExtensionProtocolData: array<(
    ExtensionFileType.extensionProtocolData,
    Meta3dType.Index.extensionName,
  )>,
  (
    allExtensionNewNames: array<Meta3dType.Index.extensionName>,
    (
      startExtensionNames: array<Meta3dType.Index.extensionName>,
      entryExtensionNames: array<Meta3dType.Index.extensionName>,
    ),
    allContributeNewNames: array<Meta3dType.Index.contributeName>,
  ),
): (
  array<(extensionPackageData, ExtensionFileType.extensionFuncData)>,
  array<(contributePackageData, ExtensionFileType.contributeFuncData)>,
) => {
  // TODO check:allExtensionNewNames.length == allExtensionFileData.length
  // TODO check:allContributeNewNames.length == allContributeFileData.length

  // let [
  //   allExtensionBinaryUint8File,
  //   allContributeBinaryUint8File,
  //   configData,
  // ] = BinaryFileOperator.load()

  let allExtensionDataMap =
    allExtensionFileData->Meta3dCommonlib.ArraySt.reduceOneParami(
      (. result, {extensionPackageData}, i) => {
        result->Meta3dCommonlib.ImmutableHashMap.set(
          extensionPackageData.protocol.name,
          (
            allExtensionNewNames->Meta3dCommonlib.ArraySt.getExn(i),
            extensionPackageData.protocol.version,
          ),
        )
      },
      Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    )
  let allExtensionDataMap =
    allPackageEntryExtensionProtocolData->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. allExtensionDataMap, ({name, version}, entryExtensionName)) => {
        allExtensionDataMap->Meta3dCommonlib.ImmutableHashMap.set(
          name,
          (entryExtensionName, version),
        )
      },
      allExtensionDataMap,
    )

  let allContributeDataMap =
    allContributeFileData->Meta3dCommonlib.ArraySt.reduceOneParami(
      (. result, {contributePackageData}, i) => {
        result->Meta3dCommonlib.ImmutableHashMap.set(
          contributePackageData.protocol.name,
          (
            allContributeNewNames->Meta3dCommonlib.ArraySt.getExn(i),
            contributePackageData.protocol.version,
          ),
        )
      },
      Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    )

  (
    allExtensionFileData->Meta3dCommonlib.ArraySt.reduceOneParami(
      (. result, {extensionPackageData, extensionFuncData}, i) => {
        let newName = allExtensionNewNames->Meta3dCommonlib.ArraySt.getExn(i)

        result->Meta3dCommonlib.ArraySt.push((
          (
            {
              name: newName,
              type_: startExtensionNames->Meta3dCommonlib.ArraySt.includes(newName)
                ? Start
                : entryExtensionNames->Meta3dCommonlib.ArraySt.includes(newName)
                ? Entry
                : Default,
              dependentExtensionNameMap: _convertDependentMap(
                extensionPackageData.dependentExtensionNameMap,
                allExtensionDataMap,
              ),
              dependentContributeNameMap: _convertDependentMap(
                extensionPackageData.dependentContributeNameMap,
                allContributeDataMap,
              ),
            }: extensionPackageData
          ),
          extensionFuncData,
        ))
      },
      [],
    ),
    allContributeFileData->Meta3dCommonlib.ArraySt.reduceOneParami(
      (. result, {contributePackageData, contributeFuncData}, i) => {
        let newName = allContributeNewNames->Meta3dCommonlib.ArraySt.getExn(i)

        result->Meta3dCommonlib.ArraySt.push((
          (
            {
              name: newName,
              dependentExtensionNameMap: _convertDependentMap(
                contributePackageData.dependentExtensionNameMap,
                allExtensionDataMap,
              ),
              dependentContributeNameMap: _convertDependentMap(
                contributePackageData.dependentContributeNameMap,
                allContributeDataMap,
              ),
            }: contributePackageData
          ),
          contributeFuncData,
        ))
      },
      [],
    ),
  )
}

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

  let state =
    allContributeDataArr->Meta3dCommonlib.ArraySt.reduceOneParam(
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

  (state, allExtensionDataArr)
}

let load = (data: array<Uint8Array.t>): (Meta3dType.Index.state, array<extensionFileData>) => {
  data->_parse->_run
}

let getSpecificExtensionName = (allExtensionDataArr, extensionType) => {
  switch allExtensionDataArr->Meta3dCommonlib.ArraySt.filter(({extensionPackageData}) => {
    extensionPackageData.type_ === extensionType
  }) {
  | startExtensions if startExtensions->Meta3dCommonlib.ArraySt.length !== 1 =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Exception.buildErr(
        Meta3dCommonlib.Log.buildErrorMessage(
          ~title="should only has one type extension",
          ~description={
            j``
          },
          ~reason="",
          ~solution=j``,
          ~params=j``,
        ),
      ),
    )
  | startExtensions => startExtensions[0].extensionPackageData.name
  }
}

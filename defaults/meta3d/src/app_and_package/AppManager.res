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

      map->Meta3dCommonlib.ImmutableHashMap.set(dependentNameKey, dependentData.protocolName)
    },
    Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  )
}

let convertAllFileData = (
  allExtensionFileData: array<ExtensionFileType.extensionFileData>,
  allContributeFileData: array<ExtensionFileType.contributeFileData>,
  allPackageEntryExtensionProtocolData: array<(
    ExtensionFileType.extensionProtocolData,
    // TODO refactor: remove entryExtensionName
    Meta3dType.Index.extensionName,
  )>,
  (
    // TODO remove
    allExtensionNewNames: array<Meta3dType.Index.extensionName>,
    // TODO change to startExtensionProtocolNames
    startExtensionNames: array<Meta3dType.Index.extensionName>,
    allContributeNewNames: array<Meta3dType.Index.contributeName>,
  ),
) => {
  // ManagerUtils.convertAllFileData(
  //   allExtensionFileData,
  //   allContributeFileData,
  //   allPackageEntryExtensionProtocolData,
  //   (allExtensionNewNames, (startExtensionNames, []), allContributeNewNames),
  // )
  // TODO check:allExtensionNewNames.length == allExtensionFileData.length
  // TODO check:allContributeNewNames.length == allContributeFileData.length

  let allExtensionDataMap =
    allExtensionFileData->Meta3dCommonlib.ArraySt.reduceOneParami(
      (. result, {extensionPackageData}: ExtensionFileType.extensionFileData, i) => {
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
      (. result, {contributePackageData}: ExtensionFileType.contributeFileData, i) => {
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
              protocolName: extensionPackageData.protocol.name,
              type_: startExtensionNames->Meta3dCommonlib.ArraySt.includes(newName)
                ? Start
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
              protocolName: contributePackageData.protocol.name,
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

let generate = (
  (allExtensionFileData, allContributeFileData),
  allPackageBinaryFiles,
  configData: Js.Nullable.t<Meta3dType.Index.startConfigData>,
) => {
  let encoder = TextEncoder.newTextEncoder()

  ManagerUtils.generate((allExtensionFileData, allContributeFileData))
  ->ManagerUtils.mergeAllPackageBinaryFiles(allPackageBinaryFiles)
  ->Meta3dCommonlib.ArraySt.push(
    TextEncoder.encodeUint8Array(
      configData
      ->Obj.magic
      ->Meta3dCommonlib.NullableSt.getWithDefault([])
      ->Obj.magic
      ->Js.Json.stringify,
      encoder,
    ),
  )
  ->BinaryFileOperator.generate
}

let execGetContributeFunc = (
  ~contributeFuncData,
  ~dependentExtensionNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentContributeNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  (),
) => {
  (
    ManagerUtils.getContributeFunc(
      contributeFuncData,
      TextDecoder.newTextDecoder("utf-8"),
    )->Obj.magic
  )(ExtensionManager.buildAPI(), (dependentExtensionNameMap, dependentContributeNameMap))
}

let load = (appBinaryFile: ArrayBuffer.t): (
  Meta3dType.Index.state,
  array<extensionFileData>,
  Meta3dType.Index.startConfigData,
) => {
  let [
    allExtensionBinaryUint8File,
    allContributeBinaryUint8File,
    configData,
  ] = BinaryFileOperator.load(appBinaryFile)

  let decoder = TextDecoder.newTextDecoder("utf-8")

  let (state, allExtensionDataArr) = ManagerUtils.load([
    allExtensionBinaryUint8File,
    allContributeBinaryUint8File,
  ])

  (
    state,
    allExtensionDataArr,
    TextDecoder.decodeUint8Array(configData, decoder)
    ->FileUtils.removeAlignedEmptyChars
    ->Js.Json.parseExn
    ->Obj.magic,
  )
}

let start = ((state, allExtensionDataArr, configData)): unit => {
  state->ExtensionManager.startExtension(
    ManagerUtils.getSpecificExtensionProtocolName(allExtensionDataArr, Start),
    configData,
  )
}

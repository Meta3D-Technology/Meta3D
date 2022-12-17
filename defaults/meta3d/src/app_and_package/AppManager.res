open Js.Typed_array

open AppAndPackageFileType

let convertAllFileData = (
  allExtensionFileData,
  allContributeFileData,
  allPackageEntryExtensionProtocolData,
  (allExtensionNewNames, startExtensionNames, allContributeNewNames),
) => {
  ManagerUtils.convertAllFileData(
    allExtensionFileData,
    allContributeFileData,
    allPackageEntryExtensionProtocolData,
    (allExtensionNewNames, (startExtensionNames, []), allContributeNewNames),
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
    ManagerUtils.getSpecificExtensionName(allExtensionDataArr, Start),
    configData,
  )
}

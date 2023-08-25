open Js.Typed_array

open AppAndPackageFileType

let convertAllFileData = (
  allExtensionFileData: array<ExtensionFileType.extensionFileData>,
  allContributeFileData: array<ExtensionFileType.contributeFileData>,
  // allPackageEntryExtensionProtocolData: array<ExtensionFileType.extensionProtocolData>,
  // TODO change to startExtensionProtocolNames
  startExtensionNames: array<Meta3dType.Index.extensionName>,
) => {
  // ManagerUtils.convertAllFileData(
  //   allExtensionFileData,
  //   allContributeFileData,
  //   allPackageEntryExtensionProtocolData,
  //   (allExtensionNewNames, (startExtensionNames, []), allContributeNewNames),
  // )
  // TODO check:allExtensionNewNames.length == allExtensionFileData.length
  // TODO check:allContributeNewNames.length == allContributeFileData.length

  (
    allExtensionFileData->Meta3dCommonlib.ArraySt.reduceOneParami(
      (. result, {extensionPackageData, extensionFuncData}, i) => {
        // let newName = allExtensionNewNames->Meta3dCommonlib.ArraySt.getExn(i)

        result->Meta3dCommonlib.ArraySt.push((
          (
            {
              name: extensionPackageData.name,
              version: extensionPackageData.version,
              account: extensionPackageData.account,
              displayName: extensionPackageData.displayName,
              repoLink: extensionPackageData.repoLink,
              description: extensionPackageData.description,
              protocol: extensionPackageData.protocol,
              type_: startExtensionNames->Meta3dCommonlib.ArraySt.includes(
                extensionPackageData.name,
              )
                ? Start
                : Default,
              dependentBlockProtocolNameMap: extensionPackageData.dependentBlockProtocolNameMap,
            }: extensionPackageData
          ),
          extensionFuncData,
        ))
      },
      [],
    ),
    allContributeFileData->Meta3dCommonlib.ArraySt.reduceOneParami(
      (. result, {contributePackageData, contributeFuncData}, i) => {
        // let newName = allContributeNewNames->Meta3dCommonlib.ArraySt.getExn(i)

        result->Meta3dCommonlib.ArraySt.push((
          (
            {
              name: contributePackageData.name,
              version: contributePackageData.version,
              account: contributePackageData.account,
              displayName: contributePackageData.displayName,
              repoLink: contributePackageData.repoLink,
              description: contributePackageData.description,
              protocol: contributePackageData.protocol,
              dependentBlockProtocolNameMap: contributePackageData.dependentBlockProtocolNameMap,
            }: contributePackageData
          ),
          contributeFuncData,
        ))
      },
      [],
    ),
  )
}

let _flatten = arr => {
  arr->Meta3dCommonlib.ArraySt.reduceOneParam((. result, value) => {
    Js.Array.concat(result, value)
  }, [])
}

let generate = (
  (allExtensionFileData, allContributeFileData),
  allPackageBinaryFiles,
  allPackageBinaryFileDataStoredInApp: array<(packageData, Js.Typed_array.ArrayBuffer.t)>,
  configData: Js.Nullable.t<Meta3dType.Index.startConfigData>,
) => {
  let encoder = TextEncoder.newTextEncoder()

  ManagerUtils.generate((allExtensionFileData, allContributeFileData))
  ->ManagerUtils.mergeAllPackageBinaryFiles(allPackageBinaryFiles)
  ->Meta3dCommonlib.ArraySt.push(
    allPackageBinaryFileDataStoredInApp
    ->Meta3dCommonlib.ArraySt.map(((packageData, packageBinaryFile)) => {
      [
        TextEncoder.encodeUint8Array(packageData->Obj.magic->Js.Json.stringify, encoder),
        packageBinaryFile->Uint8Array.fromBuffer,
      ]
    })
    ->_flatten
    ->BinaryFileOperator.generate
    ->Uint8Array.fromBuffer,
  )
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

let getExtensionFuncDataStr = extensionFuncData => {
  ManagerUtils.getExtensionFuncDataStr(TextDecoder.newTextDecoder("utf-8"), extensionFuncData)
}

let getExtensionFuncData = extensionFuncDataStr => {
  ManagerUtils.getExtensionFuncData(TextEncoder.newTextEncoder(), extensionFuncDataStr)
}

let getContributeFuncDataStr = contributeFuncData => {
  ManagerUtils.getContributeFuncDataStr(TextDecoder.newTextDecoder("utf-8"), contributeFuncData)
}

let getContributeFuncData = contributeFuncDataStr => {
  ManagerUtils.getContributeFuncData(TextEncoder.newTextEncoder(), contributeFuncDataStr)
}

let execGetContributeFunc = (~contributeFuncData, ()) => {
  (
    ManagerUtils.getContributeFunc(
      contributeFuncData,
      TextDecoder.newTextDecoder("utf-8"),
    )->Obj.magic
  )(ExtensionManager.buildAPI())
}

let _parseAllPackageUint8StoredInApp = allPackageUint8StoredInApp => {
  let decoder = TextDecoder.newTextDecoder("utf-8")

  BinaryFileOperator.load(allPackageUint8StoredInApp->Uint8Array.buffer)
  ->Meta3dCommonlib.ArraySt.chunk(2)
  ->Meta3dCommonlib.ArraySt.map(([packageData, packageUint8]) => {
    let packageBinaryFile = packageUint8->Uint8Array.buffer

    (
      TextDecoder.decodeUint8Array(packageData, decoder)
      ->FileUtils.removeAlignedEmptyChars
      ->Js.Json.parseExn
      ->Obj.magic,
      packageBinaryFile,
    )
  })
}

let _loadAllPackageUint8StoredInApp = (
  state: Meta3dType.Index.state,
  allPackageUint8StoredInApp,
): Meta3dType.Index.state => {
  _parseAllPackageUint8StoredInApp(
    allPackageUint8StoredInApp,
  )->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. state: Meta3dType.Index.state, ((packageProtocol, _, _, _), packageBinaryFile)) => {
      {
        ...state,
        packageStoreInAppMap: state.packageStoreInAppMap->Meta3dCommonlib.ImmutableHashMap.set(
          packageProtocol.name,
          packageBinaryFile,
        ),
      }
    },
    state,
  )
}

let load = (appBinaryFile: ArrayBuffer.t): (
  Meta3dType.Index.state,
  array<extensionFileData>,
  Meta3dType.Index.startConfigData,
) => {
  let [
    allExtensionUint8,
    allContributeUint8,
    allPackageUint8StoredInApp,
    configData,
  ] = BinaryFileOperator.load(appBinaryFile)

  let decoder = TextDecoder.newTextDecoder("utf-8")

  let (state, allExtensionDataArr) = ManagerUtils.load([allExtensionUint8, allContributeUint8])

  let state = state->_loadAllPackageUint8StoredInApp(allPackageUint8StoredInApp)

  (
    state,
    allExtensionDataArr,
    TextDecoder.decodeUint8Array(configData, decoder)
    ->FileUtils.removeAlignedEmptyChars
    ->Js.Json.parseExn
    ->Obj.magic,
  )
}

let _getStartExtensionProtocolName = (
  allExtensionDataArr
): Meta3dType.Index.extensionProtocolName => {
  switch allExtensionDataArr->Meta3dCommonlib.ArraySt.filter(({extensionPackageData}) => {
    extensionPackageData.type_ === Start
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
  | startExtensions => startExtensions[0].extensionPackageData.protocol.name
  }
}

let start = ((state, allExtensionDataArr, configData)): unit => {
  state->ExtensionManager.startExtension(
    _getStartExtensionProtocolName(allExtensionDataArr),
    configData,
  )
}

let getAllPackageAndExtensionAndContributeFileDataOfApp = (appBinaryFile: ArrayBuffer.t): (
  array<(packageData, ArrayBuffer.t)>,
  (
    array<(extensionPackageData, ExtensionFileType.extensionFuncData)>,
    array<(contributePackageData, ExtensionFileType.contributeFuncData)>,
  ),
) => {
  let [
    allExtensionUint8,
    allContributeUint8,
    allPackageUint8StoredInApp,
    configData,
  ] = BinaryFileOperator.load(appBinaryFile)

  (
    _parseAllPackageUint8StoredInApp(allPackageUint8StoredInApp),
    [allExtensionUint8, allContributeUint8]->ManagerUtils.parse2,
  )
}

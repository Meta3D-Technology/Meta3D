open Js.Typed_array

open AppAndPackageFileType

let _convertDependentMap = dependentMap => {
  dependentMap->Meta3dCommonlib.ImmutableHashMap.map((.
    dependentData: ExtensionFileType.dependentData,
  ) => dependentData.protocolName)
}

let convertAllFileData = (
  allExtensionFileData: array<ExtensionFileType.extensionFileData>,
  allContributeFileData: array<ExtensionFileType.contributeFileData>,
  // allPackageEntryExtensionProtocolData: array<(
  //   ExtensionFileType.extensionProtocolData,
  //   Meta3dType.Index.extensionName,
  // )>,
  // TODO change to entryExtensionProtocolNames
  entryExtensionNames: array<Meta3dType.Index.extensionName>,
) => {
  // ManagerUtils.convertAllFileData(
  //   allExtensionFileData,
  //   allContributeFileData,
  //   allPackageEntryExtensionProtocolData,
  //   (allExtensionNewNames, ([], entryExtensionNames), allContributeNewNames),
  // )

  // TODO check:allExtensionNewNames.length == allExtensionFileData.length
  // TODO check:allContributeNewNames.length == allContributeFileData.length

  // let allExtensionDataMap =
  //   allExtensionFileData->Meta3dCommonlib.ArraySt.reduceOneParami(
  //     (. result, {extensionPackageData}, i) => {
  //       result->Meta3dCommonlib.ImmutableHashMap.set(
  //         extensionPackageData.protocol.name,
  //         (
  //           allExtensionNewNames->Meta3dCommonlib.ArraySt.getExn(i),
  //           extensionPackageData.protocol.version,
  //         ),
  //       )
  //     },
  //     Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //   )
  // let allExtensionDataMap =
  //   allPackageEntryExtensionProtocolData->Meta3dCommonlib.ArraySt.reduceOneParam(
  //     (. allExtensionDataMap, ({name, version}, entryExtensionName)) => {
  //       allExtensionDataMap->Meta3dCommonlib.ImmutableHashMap.set(
  //         name,
  //         (entryExtensionName, version),
  //       )
  //     },
  //     allExtensionDataMap,
  //   )

  // let allContributeDataMap =
  //   allContributeFileData->Meta3dCommonlib.ArraySt.reduceOneParami(
  //     (. result, {contributePackageData}, i) => {
  //       result->Meta3dCommonlib.ImmutableHashMap.set(
  //         contributePackageData.protocol.name,
  //         (
  //           allContributeNewNames->Meta3dCommonlib.ArraySt.getExn(i),
  //           contributePackageData.protocol.version,
  //         ),
  //       )
  //     },
  //     Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //   )

  (
    allExtensionFileData->Meta3dCommonlib.ArraySt.reduceOneParami(
      (. result, {extensionPackageData, extensionFuncData}, i) => {
        // let newName = allExtensionNewNames->Meta3dCommonlib.ArraySt.getExn(i)

        result->Meta3dCommonlib.ArraySt.push((
          (
            {
              name: extensionPackageData.name,
              protocolName: extensionPackageData.protocol.name,
              // type_: startExtensionNames->Meta3dCommonlib.ArraySt.includes(newName)
              //   ? Start
              // :
              type_: entryExtensionNames->Meta3dCommonlib.ArraySt.includes(
                extensionPackageData.name,
              )
                ? Entry
                : Default,
              dependentExtensionProtocolNameMap: _convertDependentMap(
                extensionPackageData.dependentExtensionProtocolNameMap,
              ),
              dependentContributeProtocolNameMap: _convertDependentMap(
                extensionPackageData.dependentContributeProtocolNameMap,
              ),
              // dependentExtensionProtocolNameMap: extensionPackageData.dependentExtensionProtocolNameMap,
              // dependentContributeProtocolNameMap: extensionPackageData.dependentContributeProtocolNameMap,
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
              protocolName: contributePackageData.protocol.name,
              dependentExtensionProtocolNameMap: _convertDependentMap(
                contributePackageData.dependentExtensionProtocolNameMap,
              ),
              dependentContributeProtocolNameMap: _convertDependentMap(
                contributePackageData.dependentContributeProtocolNameMap,
              ),
              // dependentExtensionProtocolNameMap: contributePackageData.dependentExtensionProtocolNameMap,
              // dependentContributeProtocolNameMap: contributePackageData.dependentContributeProtocolNameMap,
            }: contributePackageData
          ),
          contributeFuncData,
        ))
      },
      [],
    ),
  )
}

// let generate = ((allExtensionFileData, allContributeFileData)) => {
//   ManagerUtils.generate((allExtensionFileData, allContributeFileData))->BinaryFileOperator.generate
// }

let generate = ((allExtensionFileData, allContributeFileData), allPackageBinaryFiles) => {
  ManagerUtils.generate((allExtensionFileData, allContributeFileData))
  ->ManagerUtils.mergeAllPackageBinaryFiles(allPackageBinaryFiles)
  ->BinaryFileOperator.generate
}

let _getEntryExtensionProtocolName = (
  allExtensionDataArr
): Meta3dType.Index.extensionProtocolName => {
  switch allExtensionDataArr->Meta3dCommonlib.ArraySt.filter(({extensionPackageData}) => {
    extensionPackageData.type_ === Entry
  }) {
  | entryExtensions if entryExtensions->Meta3dCommonlib.ArraySt.length === 0 =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Exception.buildErr(
        Meta3dCommonlib.Log.buildErrorMessage(
          ~title="should has one type extension at least",
          ~description={
            j``
          },
          ~reason="",
          ~solution=j``,
          ~params=j``,
        ),
      ),
    )
  | entryExtensions => entryExtensions[0].extensionPackageData.protocolName
  }
}

let load = (packageBinaryFile: ArrayBuffer.t): (
  Meta3dType.Index.state,
  array<extensionFileData>,
  Meta3dType.Index.extensionProtocolName,
) => {
  let (state, allExtensionDataArr) = packageBinaryFile->BinaryFileOperator.load->ManagerUtils.load

  (state, allExtensionDataArr, _getEntryExtensionProtocolName(allExtensionDataArr))
}

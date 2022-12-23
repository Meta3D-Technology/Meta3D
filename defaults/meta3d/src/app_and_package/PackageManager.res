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
  (
    allExtensionNewNames: array<Meta3dType.Index.extensionName>,
    // TODO change to entryExtensionProtocolNames
    entryExtensionNames: array<Meta3dType.Index.extensionName>,
    allContributeNewNames: array<Meta3dType.Index.contributeName>,
  ),
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
        let newName = allExtensionNewNames->Meta3dCommonlib.ArraySt.getExn(i)

        result->Meta3dCommonlib.ArraySt.push((
          (
            {
              name: newName,
              protocolName: extensionPackageData.protocol.name,
              // type_: startExtensionNames->Meta3dCommonlib.ArraySt.includes(newName)
              //   ? Start
              // :
              type_: entryExtensionNames->Meta3dCommonlib.ArraySt.includes(newName)
                ? Entry
                : Default,
              dependentExtensionNameMap: _convertDependentMap(
                extensionPackageData.dependentExtensionNameMap,
              ),
              dependentContributeNameMap: _convertDependentMap(
                extensionPackageData.dependentContributeNameMap,
              ),
              // dependentExtensionNameMap: extensionPackageData.dependentExtensionNameMap,
              // dependentContributeNameMap: extensionPackageData.dependentContributeNameMap,
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
              ),
              dependentContributeNameMap: _convertDependentMap(
                contributePackageData.dependentContributeNameMap,
              ),
              // dependentExtensionNameMap: contributePackageData.dependentExtensionNameMap,
              // dependentContributeNameMap: contributePackageData.dependentContributeNameMap,
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

let load = (packageBinaryFile: ArrayBuffer.t): (
  Meta3dType.Index.state,
  array<extensionFileData>,
  Meta3dType.Index.extensionProtocolName,
) => {
  let (state, allExtensionDataArr) = packageBinaryFile->BinaryFileOperator.load->ManagerUtils.load

  (state, allExtensionDataArr, ManagerUtils.getSpecificExtensionProtocolName(allExtensionDataArr, Entry))
}

let generateExtension = (
  ~name,
  ~protocol,
  ~displayName="",
  ~repoLink="",
  ~description="",
  ~fileStr=PackageManagerTool.buildEmptyExtensionFileStr(),
  ~dependentExtensionProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentContributeProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  (),
) => {
  Main.generateExtension(
    (
      {
        name,
        protocol,
        displayName,
        repoLink,
        description,
        dependentExtensionProtocolNameMap,
        dependentContributeProtocolNameMap,
      }: ExtensionFileType.extensionPackageData
    ),
    fileStr,
  )
}

let generateContribute = (
  ~name,
  ~protocol,
  ~displayName="",
  ~repoLink="",
  ~description="",
  ~fileStr=PackageManagerTool.buildEmptyContributeFileStr(),
  ~dependentExtensionProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentContributeProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  (),
) => {
  Main.generateContribute(
    (
      {
        name,
        protocol,
        displayName,
        repoLink,
        description,
        dependentExtensionProtocolNameMap,
        dependentContributeProtocolNameMap,
      }: ExtensionFileType.contributePackageData
    ),
    fileStr,
  )
}

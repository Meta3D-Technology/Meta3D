let generateExtension = (
  ~name,
  ~protocol,
  ~displayName="",
  ~repoLink="",
  ~description="",
  ~fileStr=PackageManagerTool.buildEmptyExtensionFileStr(),
  ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
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
        dependentBlockProtocolNameMap,
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
  ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
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
        dependentBlockProtocolNameMap,
      }: ExtensionFileType.contributePackageData
    ),
    fileStr,
  )
}

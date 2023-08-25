let generateExtension = (
  ~name,
  ~protocol={
    name: "e1-protocol",
    version: "^0.0.1",
  }: ExtensionFileType.extensionProtocolData,
  ~version="0.0.1",
  ~account="meta3d",
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
        version,
        account,
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
  ~protocol={
    name: "c1-protocol",
    version: "^0.0.1",
  }: ExtensionFileType.contributeProtocolData,
  ~version="0.0.1",
  ~account="meta3d",
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
        version,
        account,
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

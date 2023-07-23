let generateExtension = (
  ~name,
  ~protocol,
  ~displayName="",
  ~repoLink="",
  ~description="",
  ~fileStr="",
  ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  (),
) => {
  Meta3d.Main.generateExtension(
    (
      {
        name,
        protocol,
        displayName,
        repoLink,
        description,
        dependentBlockProtocolNameMap,
      }: Meta3d.ExtensionFileType.extensionPackageData
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
  ~fileStr="",
  ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  (),
) => {
  Meta3d.Main.generateContribute(
    (
      {
        name,
        protocol,
        displayName,
        repoLink,
        description,
        dependentBlockProtocolNameMap,
      }: Meta3d.ExtensionFileType.contributePackageData
    ),
    fileStr,
  )
}

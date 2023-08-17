let generateExtension = (
  ~name,
  ~protocol,
  ~version="0.0.1",
  ~account="meta3d",
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
        version,
        account,
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
  ~version="0.0.1",
  ~account="meta3d",
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
        version,
        account,
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

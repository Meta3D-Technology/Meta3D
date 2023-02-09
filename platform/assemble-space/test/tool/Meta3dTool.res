let generateExtension = (
  ~name,
  ~protocol,
  ~displayName="",
  ~repoLink="",
  ~description="",
  ~fileStr="",
  ~dependentExtensionProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentContributeProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
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
        dependentExtensionProtocolNameMap,
        dependentContributeProtocolNameMap,
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
  ~dependentExtensionProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentContributeProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
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
        dependentExtensionProtocolNameMap,
        dependentContributeProtocolNameMap,
      }: Meta3d.ExtensionFileType.contributePackageData
    ),
    fileStr,
  )
}

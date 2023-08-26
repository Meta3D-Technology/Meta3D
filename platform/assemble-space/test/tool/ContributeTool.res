let buildContributePackageData = (
  ~name="p1",
  ~version="0.0.1",
  ~account="meta3d",
  ~displayName="d1",
  ~repoLink="",
  ~description="dp1",
  ~protocol={
    name: "p1",
    version: "^0.0.1",
  }: Meta3d.ExtensionFileType.contributeProtocolData,
  ~dependentPackageStoredInAppProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  (),
): Meta3d.ExtensionFileType.contributePackageData => {
  {
    name,
    version,
    account,
    displayName,
    repoLink,
    description,
    protocol,
    dependentBlockProtocolNameMap,
    dependentPackageStoredInAppProtocolNameMap,
  }
}

let buildContributeData = (
  ~contributePackageData,
  ~contributeFuncData=Js.Typed_array.Uint8Array.make([]),
  (),
): Meta3d.ExtensionFileType.contributeFileData => {
  {
    contributePackageData,
    contributeFuncData,
  }
}

let buildSelectedContribute = (
  ~protocolName,
  ~protocolVersionRange,
  ~protocolVersion="0.0.1",
  ~protocolConfig=None,
  ~protocolIconBase64="pi1",
  // ~protocolDisplayName="d1",
  ~contributeFuncData=Js.Typed_array.Uint8Array.make([]),
  ~id="e1",
  ~displayName="d1",
  ~name="e1",
  ~version="0.0.1",
  ~account="u1",
  (),
): FrontendUtils.AssembleSpaceCommonType.contributeData => {
  (
    {
      id,
      data: buildContributeData(
        ~contributePackageData=buildContributePackageData(
          ~name,
          ~displayName,
          ~protocol={
            name: protocolName,
            version: protocolVersionRange,
          },
          (),
        ),
        ~contributeFuncData,
        (),
      ),
      protocolName,
      protocolVersion,
      protocolIconBase64,
      version,
      account,
    },
    protocolConfig,
  )
}

let generateContribute = (
  ~name,
  ~version="0.0.1",
  ~account="meta3d",
  ~protocolName="",
  ~protocolVersion="",
  ~displayName="d1",
  ~repoLink="",
  ~description="dp1",
  ~dependentPackageStoredInAppProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~fileStr=ElementVisualTool.buildEmptyContributeFileStr(),
  (),
) => {
  Meta3d.Main.generateContribute(
    (
      {
        name,
        version,
        account,
        displayName,
        repoLink,
        description,
        protocol: {
          name: protocolName,
          version: protocolVersion,
        },
        dependentPackageStoredInAppProtocolNameMap,
        dependentBlockProtocolNameMap,
      }: Meta3d.ExtensionFileType.contributePackageData
    ),
    fileStr,
  )
}

let getContribute = (contributeData: FrontendUtils.AssembleSpaceCommonType.contributeData) => {
  contributeData->Meta3dCommonlib.Tuple2.getFirst
}

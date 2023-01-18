let buildContributePackageData = (
  ~name="p1",
  ~protocol={
    name: "p1",
    version: "^0.0.1",
  }: Meta3d.ExtensionFileType.contributeProtocolData,
  ~dependentExtensionProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentContributeProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  (),
): Meta3d.ExtensionFileType.contributePackageData => {
  {
    name,
    protocol,
    dependentExtensionProtocolNameMap,
    dependentContributeProtocolNameMap,
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
  ~contributeFuncData=Js.Typed_array.Uint8Array.make([]),
  ~id="e1",
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
  ~protocolName="",
  ~protocolVersion="",
  ~dependentExtensionProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentContributeProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~fileStr=ElementVisualTool.buildEmptyContributeFileStr(),
  (),
) => {
  Meta3d.Main.generateContribute(
    (
      {
        name,
        protocol: {
          name: protocolName,
          version: protocolVersion,
        },
        dependentExtensionProtocolNameMap,
        dependentContributeProtocolNameMap,
      }: Meta3d.ExtensionFileType.contributePackageData
    ),
    fileStr,
  )
}

let getContribute = (contributeData: FrontendUtils.AssembleSpaceCommonType.contributeData) => {
  contributeData->Meta3dCommonlib.Tuple2.getFirst
}

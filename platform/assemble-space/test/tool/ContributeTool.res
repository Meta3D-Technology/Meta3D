let buildContributePackageData = (
  ~name="p1",
  ~protocol={
    name: "p1",
    version: "^0.0.1",
  }: Meta3d.ExtensionFileType.contributeProtocolData,
  ~dependentExtensionNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentContributeNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  (),
): Meta3d.ExtensionFileType.contributePackageData => {
  {
    name: name,
    protocol: protocol,
    dependentExtensionNameMap: dependentExtensionNameMap,
    dependentContributeNameMap: dependentContributeNameMap,
  }
}

let buildContributeData = (
  ~contributePackageData,
  ~contributeFuncData=Js.Typed_array.Uint8Array.make([]),
  (),
): Meta3d.ExtensionFileType.contributeFileData => {
  {
    contributePackageData: contributePackageData,
    contributeFuncData: contributeFuncData,
  }
}

let buildSelectedContribute = (
  ~protocolName,
  ~protocolVersion,
  ~protocolConfig=None,
  ~contributeFuncData=Js.Typed_array.Uint8Array.make([]),
  ~id="e1",
  ~name="e1",
  ~version="0.0.1",
  ~username="u1",
  (),
): FrontendUtils.AssembleSpaceCommonType.contributeData => {
  (
    {
      id: id,
      data: buildContributeData(
        ~contributePackageData=buildContributePackageData(
          ~name,
          ~protocol={
            name: protocolName,
            version: protocolVersion,
          },
          (),
        ),
        ~contributeFuncData,
        (),
      ),
      version: version,
      username: username,
    },
    protocolConfig,
  )
}

let generateContribute = (
  ~name,
  ~protocolName="",
  ~protocolVersion="",
  ~dependentExtensionNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentContributeNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~fileStr=ElementVisualTool.buildEmptyContributeFileStr(),
  (),
) => {
  Meta3d.Main.generateContribute(
    (
      {
        name: name,
        protocol: {
          name: protocolName,
          version: protocolVersion,
        },
        dependentExtensionNameMap: dependentExtensionNameMap,
        dependentContributeNameMap: dependentContributeNameMap,
      }: Meta3d.ExtensionFileType.contributePackageData
    ),
    fileStr,
  )
}

let getContribute = (contributeData: FrontendUtils.AssembleSpaceCommonType.contributeData) => {
  contributeData->Meta3dCommonlib.Tuple2.getFirst
}

let buildContributePackageData = (
  ~name="p1",
  ~protocol={
    name: "p1",
    version: "0.0.1",
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

let buildSelectedContribute = (
  ~protocolName,
  ~protocolVersion,
  ~contributeFuncData=Js.Typed_array.Uint8Array.make([]),
  ~id="e1",
  ~version="0.0.1",
  (),
): FrontendUtils.AssembleSpaceCommonType.contribute => {
  {
    id: id,
    data: {
      contributePackageData: buildContributePackageData(
        ~protocol={
          name: protocolName,
          version: protocolVersion,
        },
        (),
      ),
      contributeFuncData: contributeFuncData,
    },
    version
  }
}



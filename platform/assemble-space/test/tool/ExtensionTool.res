let buildExtensionPackageData = (
  ~name="p1",
  ~displayName="",
  ~repoLink="",
  ~description="",
  ~protocol={
    name: "p1",
    version: "^0.0.1",
  }: Meta3d.ExtensionFileType.extensionProtocolData,
  ~dependentExtensionProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentContributeProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  (),
): Meta3d.ExtensionFileType.extensionPackageData => {
  {
    name,
    displayName,
    repoLink,
    description,
    protocol,
    dependentExtensionProtocolNameMap,
    dependentContributeProtocolNameMap,
  }
}

let buildExtensionData = (
  ~extensionPackageData,
  ~extensionFuncData=Js.Typed_array.Uint8Array.make([]),
  (),
): Meta3d.ExtensionFileType.extensionFileData => {
  {
    extensionPackageData,
    extensionFuncData,
  }
}

let buildSelectedExtension = (
  ~protocolName,
  ~protocolVersion,
  ~protocolVersionRange="^0.0.1",
  ~protocolConfig=None,
  ~protocolIconBase64="pi1",
  // ~protocolDisplayName="d1",
  ~extensionFuncData=Js.Typed_array.Uint8Array.make([]),
  ~name="e1",
  ~displayName="d1",
  ~id="e1",
  ~version="0.0.1",
  ~account="u1",
  (),
): FrontendUtils.AssembleSpaceCommonType.extensionData => {
  (
    {
      id,
      data: buildExtensionData(
        ~extensionPackageData=buildExtensionPackageData(
          ~name,
          ~displayName,
          ~protocol={
            name: protocolName,
            version: protocolVersionRange,
          },
          (),
        ),
        ~extensionFuncData,
        (),
      ),
      protocolName,
      protocolVersion,
      protocolIconBase64,
      // protocolDisplayName,
      version,
      account,
    },
    protocolConfig,
  )
}

let buildExtensionImplement = (
  ~file=Js.Typed_array.ArrayBuffer.make(0),
  ~id="e1",
  ~version="0.0.1",
  ~account="u1",
  (),
): FrontendUtils.BackendCloudbaseType.implement => {
  id,
  file,
  version,
  account,
}

let generateExtension = (
  ~name,
  ~protocolName="",
  ~protocolVersion="",
  ~displayName="",
  ~repoLink="",
  ~description="",
  ~dependentExtensionProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentContributeProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~fileStr=ElementVisualTool.buildEmptyExtensionFileStr(),
  (),
) => {
  Meta3d.Main.generateExtension(
    (
      {
        name,
        displayName,
        repoLink,
        description,
        protocol: {
          name: protocolName,
          version: protocolVersion,
        },
        dependentExtensionProtocolNameMap,
        dependentContributeProtocolNameMap,
      }: Meta3d.ExtensionFileType.extensionPackageData
    ),
    fileStr,
  )
}

let getExtension = (extensionData: FrontendUtils.AssembleSpaceCommonType.extensionData) => {
  extensionData->Meta3dCommonlib.Tuple2.getFirst
}

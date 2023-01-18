let buildExtensionPackageData = (
  ~name="p1",
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
  ~protocolVersionRange,
  ~protocolVersion="0.0.1",
  ~protocolConfig=None,
  ~protocolIconBase64="pi1",
  ~extensionFuncData=Js.Typed_array.Uint8Array.make([]),
  ~name="e1",
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
  ~dependentExtensionProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentContributeProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~fileStr=ElementVisualTool.buildEmptyExtensionFileStr(),
  (),
) => {
  Meta3d.Main.generateExtension(
    (
      {
        name,
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

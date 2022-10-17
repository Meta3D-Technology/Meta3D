let buildExtensionPackageData = (
  ~name="p1",
  ~protocol={
    name: "p1",
    version: "^0.0.1",
  }: Meta3d.ExtensionFileType.extensionProtocolData,
  ~dependentExtensionNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentContributeNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  (),
): Meta3d.ExtensionFileType.extensionPackageData => {
  {
    name: name,
    protocol: protocol,
    dependentExtensionNameMap: dependentExtensionNameMap,
    dependentContributeNameMap: dependentContributeNameMap,
  }
}

let buildExtensionData = (
  ~extensionPackageData,
  ~extensionFuncData=Js.Typed_array.Uint8Array.make([]),
  (),
): Meta3d.ExtensionFileType.extensionFileData => {
  {
    extensionPackageData: extensionPackageData,
    extensionFuncData: extensionFuncData,
  }
}

let buildSelectedExtension = (
  ~protocolName,
  ~protocolVersion,
  ~protocolConfig=None,
  ~extensionFuncData=Js.Typed_array.Uint8Array.make([]),
  ~name="e1",
  ~id="e1",
  ~version="0.0.1",
  ~username="u1",
  (),
): FrontendUtils.AssembleSpaceCommonType.extensionData => {
  (
    {
      id: id,
      data: buildExtensionData(
        ~extensionPackageData=buildExtensionPackageData(
          ~name,
          ~protocol={
            name: protocolName,
            version: protocolVersion,
          },
          (),
        ),
        ~extensionFuncData,
        (),
      ),
      version: version,
      username: username,
    },
    protocolConfig,
  )
}

let buildExtensionImplement = (
  ~file=Js.Typed_array.ArrayBuffer.make(0),
  ~id="e1",
  ~version="0.0.1",
  ~username="u1",
  (),
): FrontendUtils.BackendCloudbaseType.implement => {
  id: id,
  file: file,
  version: version,
  username: username,
}

let generateExtension = (
  ~name,
  ~protocolName="",
  ~protocolVersion="",
  ~dependentExtensionNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentContributeNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~fileStr=ElementVisualTool.buildEmptyExtensionFileStr(),
  (),
) => {
  Meta3d.Main.generateExtension(
    (
      {
        name: name,
        protocol: {
          name: protocolName,
          version: protocolVersion,
        },
        dependentExtensionNameMap: dependentExtensionNameMap,
        dependentContributeNameMap: dependentContributeNameMap,
      }: Meta3d.ExtensionFileType.extensionPackageData
    ),
    fileStr,
  )
}

let getExtension = (extensionData: FrontendUtils.AssembleSpaceCommonType.extensionData) => {
  extensionData->Meta3dCommonlib.Tuple2.getFirst
}

let buildExtensionPackageData = (
  ~name="p1",
  ~version="0.0.1",
  ~account="meta3d",
  ~displayName="",
  ~repoLink="",
  ~description="",
  ~protocol={
    name: "p1",
    version: "^0.0.1",
  }: Meta3d.ExtensionFileType.extensionProtocolData,
  ~dependentPackageStoredInAppProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  (),
): Meta3d.ExtensionFileType.extensionPackageData => {
  {
    name,
    version,
    account,
    displayName,
    repoLink,
    description,
    protocol,
    dependentPackageStoredInAppProtocolNameMap,
    dependentBlockProtocolNameMap,
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
  ~protocolName="e1 protocol",
  ~protocolVersion="0.0.1",
  ~protocolVersionRange="^0.0.1",
  ~protocolConfig=None,
  ~protocolIconBase64="pi1",
  ~protocolDisplayName="d1",
  ~protocolRepoLink="pl1",
  ~protocolDescription="pd1",
  ~extensionFuncData=Js.Typed_array.Uint8Array.make([]),
  ~name="e1",
  ~displayName="d1",
  ~id="e1",
  ~version="0.0.1",
  ~account="u1",
  (),
): AssembleSpaceCommonType.extensionData => {
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
      protocolDisplayName,
      protocolRepoLink,
      protocolDescription,
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
): BackendCloudbaseType.implement => {
  id,
  file,
  version,
  account,
}

let generateExtension = (
  ~name,
  ~version="0.0.1",
  ~account="meta3d",
  ~protocolName="",
  ~protocolVersion="",
  ~displayName="",
  ~repoLink="",
  ~description="",
  ~dependentPackageStoredInAppProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~fileStr=ElementVisualTool.buildEmptyExtensionFileStr(),
  (),
) => {
  Meta3d.Main.generateExtension(
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
      }: Meta3d.ExtensionFileType.extensionPackageData
    ),
    fileStr,
  )
}

let getExtension = (extensionData: AssembleSpaceCommonType.extensionData) => {
  extensionData->Meta3dCommonlib.Tuple2.getFirst
}

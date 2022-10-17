let findSkins = (
  service: FrontendUtils.AssembleSpaceType.service,
  errorFunc,
  protocolConfigStr,
  selectedContributes,
) => {
  let uiControlConfigLib = service.meta3d.serializeUIControlProtocolConfigLib(. protocolConfigStr)
  let {protocolName, protocolVersion} = service.meta3d.getSkinProtocolData(. uiControlConfigLib)

  switch selectedContributes
  ->SelectedContributesUtils.getSkins
  ->Meta3dCommonlib.ListSt.toArray
  ->Meta3dCommonlib.ArraySt.filter(({data}) => {
    let protocol = data.contributePackageData.protocol

    protocol.name === protocolName &&
      Meta3d.Semver.satisfies(Meta3d.Semver.minVersion(protocol.version), protocolVersion)
  }) {
  | skins if skins->Meta3dCommonlib.ArraySt.length === 0 =>
    errorFunc(
      Meta3dCommonlib.Exception.buildErr(
        Meta3dCommonlib.Log.buildErrorMessage(
          ~title="currentSelectedUIControl need skin",
          ~description={
            j`skin protocol:
                      protocolName: ${protocolName}, protocolVersion: ${protocolVersion}`
          },
          ~reason="",
          ~solution=j``,
          ~params=j``,
        ),
      ),
    )
  | skins => skins
  }
}

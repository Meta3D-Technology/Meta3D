let getItems = (
  (
    getProtocolFunc,
    getDisplayNameFromResultDataFunc,
    getDisplayNameFromItemFunc,
    getPushedDataFunc,
  ),
  protocols: array<FrontendUtils.BackendCloudbaseType.protocol>,
  selectedItemsFromMarket,
) => {
  protocols
  ->Meta3dCommonlib.ArraySt.sort((a, b) => {
    Meta3d.Semver.gt(a.version, b.version) ? 1 : -1
  })
  // ->Meta3dCommonlib.Log.printForDebug
  ->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. result, protocol: FrontendUtils.BackendCloudbaseType.protocol) => {
      let {name, iconBase64, version} = protocol

      selectedItemsFromMarket
      ->Meta3dCommonlib.ListSt.filter(((item, _)) => {
        let protocol: Meta3d.ExtensionFileType.contributeProtocolData = getProtocolFunc(item)

        protocol.name === name && Meta3d.Semver.satisfies(version, protocol.version)
      })
      // ->Meta3dCommonlib.Log.printForDebug
      ->Meta3dCommonlib.ListSt.reduce(result, (result, (item, protocolConfig)) => {
        result->Meta3dCommonlib.ArraySt.includesByFunc(
          data => {
            getDisplayNameFromResultDataFunc(data) == getDisplayNameFromItemFunc(item)
          },
        )
          ? result
          : result->Meta3dCommonlib.ArraySt.push(getPushedDataFunc(item, protocol, protocolConfig))
      })
    },
    [],
  )
}

let getProtocolConfigStr = protocolConfig => {
  protocolConfig->Meta3dCommonlib.OptionSt.map((
    {configStr}: FrontendUtils.CommonType.protocolConfig,
  ) => configStr)
}

let buildBasicInfoUI = (
  service: FrontendUtils.AssembleSpaceType.service,
  protocolName,
  protocolVersion,
  implementName,
  implementVersion,
  displayName,
) => {
  <>
    {service.ui.buildTitle(. ~level=2, ~children={React.string(`基本信息`)}, ())}
    {service.ui.buildText(.
      ~_type=#default,
      ~children={
        React.string({
          j`协议名：${protocolName}`
        })
      },
      (),
    )}
    {service.ui.buildText(.
      ~_type=#default,
      ~children={
        React.string({
          j`协议版本：${protocolVersion}`
        })
      },
      (),
    )}
    {service.ui.buildText(.
      ~_type=#default,
      ~children={
        React.string({
          j`实现名：${implementName}`
        })
      },
      (),
    )}
    {service.ui.buildText(.
      ~_type=#default,
      ~children={
        React.string({
          j`实现版本：${implementVersion}`
        })
      },
      (),
    )}
    {service.ui.buildText(.
      ~_type=#default,
      ~children={
        React.string({
          j`显示名：${displayName}`
        })
      },
      (),
    )}
  </>
}

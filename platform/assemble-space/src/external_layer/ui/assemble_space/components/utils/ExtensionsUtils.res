open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let _getProtocolConfigStr = protocolConfig => {
    protocolConfig->Meta3dCommonlib.OptionSt.map((
      {configStr}: FrontendUtils.CommonType.protocolConfig,
    ) => configStr)
  }

  // TODO perf: defer load when panel change
  let _getExtensions = ({getAllPublishExtensionProtocols}, selectedExtensionsFromMarket) => {
    // TODO support >1000
    getAllPublishExtensionProtocols(.
      FrontendUtils.MarketUtils.getLimitCount(),
      0,
    )->Meta3dBsMost.Most.map(protocols => {
      ExtensionsContributesUtils.getItems(
        (
          ({data}: FrontendUtils.AssembleSpaceCommonType.extension) =>
            data.extensionPackageData.protocol,
          ((displayName, _, _, _, _, _, _)) => displayName,
          ({data}: FrontendUtils.AssembleSpaceCommonType.extension) =>
            data.extensionPackageData.displayName,
          (extension, protocol, protocolConfig) =>
            (
              extension.data.extensionPackageData.displayName,
              protocol.iconBase64,
              protocol.displayName,
              protocol.repoLink,
              protocol.description,
              protocolConfig->ExtensionsContributesUtils.getProtocolConfigStr,
              extension,
            )->Obj.magic,
        ),
        protocols,
        selectedExtensionsFromMarket,
      )->Obj.magic
    }, _)
  }

  let getDifferenceSet = (extensions, selectedExtensionNames) => {
    extensions->Meta3dCommonlib.ArraySt.filter(((
      displayName,
      _,
      _,
      _,
      _,
      _,
      extension: FrontendUtils.AssembleSpaceCommonType.extension,
    )) => {
      !(
        selectedExtensionNames->Meta3dCommonlib.ListSt.includes(
          extension.data.extensionPackageData.name,
        )
      )
    })
  }

  let useEffectOnceAsync = (
    (setIsLoaded, setExtensions),
    service,
    selectedExtensionsFromMarket,
  ) => {
    (
      _getExtensions(
        service.backend,
        selectedExtensionsFromMarket,
      )->Meta3dBsMost.Most.observe(extensions => {
        setIsLoaded(_ => true)

        setExtensions(_ => extensions)
      }, _),
      None,
    )
  }
}

@react.component
let make = (
  ~service: service,
  ~selectedExtensionsFromMarket: selectedExtensionsFromMarket,
  ~selectedExtensionNames,
  ~useDispatch,
  ~selectExtension,
) => {
  let dispatch = useDispatch(service.react.useDispatch)

  let (isLoaded, setIsLoaded) = service.react.useState(_ => false)
  let (extensions, setExtensions) = service.react.useState(_ => [])

  // let showedExtensions = service.react.useSelector(. Method.useSelector)

  service.react.useEffectOnceAsync(() =>
    Method.useEffectOnceAsync((setIsLoaded, setExtensions), service, selectedExtensionsFromMarket)
  )

  !isLoaded
    ? <p> {React.string(`loading...`)} </p>
    : <List
        grid={{gutter: 16, column: 3}}
        dataSource={extensions->Method.getDifferenceSet(selectedExtensionNames)}
        renderItem={((
          displayName,
          protocolIconBase64,
          protocolDisplayName,
          protocolRepoLink,
          protocolDescription,
          configStr,
          extension,
        )) => {
          <List.Item>
            <Card
              key={displayName}
              onClick={_ => {
                selectExtension(
                  dispatch,
                  protocolIconBase64,
                  protocolDisplayName,
                  protocolRepoLink,
                  protocolDescription,
                  configStr,
                  extension,
                )
              }}
              bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
              cover={<Image preview=false src={protocolIconBase64} width=50 height=50 />}>
              <Card.Meta
                title={<span
                  style={ReactDOM.Style.make(
                    ~whiteSpace="normal",
                    ~wordWrap="break-word",
                    ~wordBreak="break-all",
                    (),
                  )}>
                  {React.string(displayName)}
                </span>}
              />
            </Card>
          </List.Item>
        }}
      />
}

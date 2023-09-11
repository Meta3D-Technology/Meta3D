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
  let _getContributes = ({getAllPublishContributeProtocols}, selectedContributesFromMarket) => {
    // TODO support >1000
    getAllPublishContributeProtocols(.
      FrontendUtils.MarketUtils.getLimitCount(),
      0,
    )->Meta3dBsMost.Most.map((protocols: array<FrontendUtils.BackendCloudbaseType.protocol>) => {
      ExtensionsContributesUtils.getItems(
        (
          ({data}: FrontendUtils.AssembleSpaceCommonType.contribute) =>
            data.contributePackageData.protocol,
          ((displayName, _, _, _)) => displayName,
          ({data}: FrontendUtils.AssembleSpaceCommonType.contribute) =>
            data.contributePackageData.displayName,
          (contribute, protocol, protocolConfig) => (
            contribute.data.contributePackageData.displayName,
            protocol.iconBase64,
            protocolConfig->ExtensionsContributesUtils.getProtocolConfigStr,
            contribute,
          ),
        ),
        protocols,
        selectedContributesFromMarket,
      )
    }, _)
  }

  let getDifferenceSet = (contributes, selectedContributeNames) => {
    contributes->Meta3dCommonlib.ArraySt.filter(((
      displayName,
      _,
      _,
      contribute: FrontendUtils.AssembleSpaceCommonType.contribute,
    )) => {
      !(
        selectedContributeNames->Meta3dCommonlib.ListSt.includes(
          contribute.data.contributePackageData.name,
        )
      )
    })
  }

  let useEffectOnceAsync = (
    (setIsLoaded, setContributes),
    service,
    selectedContributesFromMarket,
  ) => {
    (
      _getContributes(
        service.backend,
        selectedContributesFromMarket,
      )->Meta3dBsMost.Most.observe(contributes => {
        setIsLoaded(_ => true)
        setContributes(_ => contributes)
      }, _),
      None,
    )
  }
}

@react.component
let make = (
  ~service: service,
  ~selectedContributesFromMarket: selectedContributesFromMarket,
  ~selectedContributeNames,
  ~useDispatch,
  ~selectContribute,
) => {
  let dispatch = useDispatch(service.react.useDispatch)

  let (isLoaded, setIsLoaded) = service.react.useState(_ => false)
  let (contributes, setContributes) = service.react.useState(_ => [])

  service.react.useEffectOnceAsync(() =>
    Method.useEffectOnceAsync((setIsLoaded, setContributes), service, selectedContributesFromMarket)
  )

  !isLoaded
    ? <p> {React.string(`loading...`)} </p>
    : <List
        grid={{gutter: 16, column: 3}}
        dataSource={contributes->Method.getDifferenceSet(selectedContributeNames)}
        renderItem={((displayName, protocolIconBase64, protocolConfigStr, contribute)) => {
          <List.Item>
            <Card
              key={displayName}
              onClick={_ => {
                selectContribute(dispatch, protocolIconBase64, protocolConfigStr, contribute)
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

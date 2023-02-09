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
    getAllPublishContributeProtocols()->Meta3dBsMost.Most.map(
      protocols => {
        protocols
        ->Meta3dCommonlib.ArraySt.reduceOneParam(
          (.
            result,
            {name, iconBase64, version}: FrontendUtils.BackendCloudbaseType.protocol,
          ) => {
            selectedContributesFromMarket
            ->Meta3dCommonlib.ListSt.filter(
              (({data}: FrontendUtils.AssembleSpaceCommonType.contribute, _)) => {
                let protocol = data.contributePackageData.protocol

                protocol.name === name && Meta3d.Semver.satisfies(version, protocol.version)
              },
            )
            ->Meta3dCommonlib.ListSt.reduce(
              result,
              (result, (contribute, protocolConfig)) => {
                result->Meta3dCommonlib.ArraySt.push((
                  contribute.data.contributePackageData.displayName,
                  iconBase64,
                  protocolConfig->_getProtocolConfigStr,
                  contribute,
                ))
              },
            )
          },
          [],
        )
        ->Meta3dCommonlib.ArraySt.removeDuplicateItemsWithBuildKeyFunc((. (name, _, _, _)) => {
          name
        })
      },
      // | list{(contribute, protocolConfig)} =>

      _,
    )
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
        dataSource={contributes}
        renderItem={((name, iconBase64, configStr, contribute)) => {
          <List.Item>
            <Card
              key={name}
              onClick={_ => {
                selectContribute(dispatch, iconBase64, configStr, contribute)
              }}
              bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
              cover={<img
                style={ReactDOM.Style.make(~width="50px", ~height="50px", ())} src={iconBase64}
              />}>
              <Card.Meta
                title={<span
                  style={ReactDOM.Style.make(
                    ~whiteSpace="normal",
                    ~wordWrap="break-word",
                    ~wordBreak="break-all",
                    (),
                  )}>
                  {React.string(name)}
                </span>}
              />
            </Card>
          </List.Item>
        }}
      />
}

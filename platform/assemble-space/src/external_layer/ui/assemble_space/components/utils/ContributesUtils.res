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
    getAllPublishContributeProtocols(. FrontendUtils.MarketUtils.getLimitCount(), 0)->Meta3dBsMost.Most.map(
      protocols => {
        protocols
        ->Meta3dCommonlib.ArraySt.reduceOneParam(
          (. result, {name, iconBase64, version}: FrontendUtils.BackendCloudbaseType.protocol) => {
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
        // ->Meta3dCommonlib.ArraySt.removeDuplicateItemsWithBuildKeyFunc((. (
        //   displayName,
        //   _,
        //   _,
        //   _,
        // )) => {
        //   displayName
        // })
      },
      // | list{(contribute, protocolConfig)} =>

      _,
    )
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

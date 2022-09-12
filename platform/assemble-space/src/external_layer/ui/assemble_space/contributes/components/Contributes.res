open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

// TODO refactor: duplicate

module Method = {
  // TODO perf: defer load when panel change
  let _getContributesAndContributes = (
    {getAllPublishContributeProtocols},
    selectedContributesFromShop,
  ) => {
    getAllPublishContributeProtocols()->Meta3dBsMost.Most.map(protocols => {
      protocols->Meta3dCommonlib.ArraySt.reduceOneParam(
        (. result, {name, iconBase64, version}: FrontendUtils.BackendCloudbaseType.protocol) => {
          switch selectedContributesFromShop->Meta3dCommonlib.ListSt.filter((
            {data}: FrontendUtils.AssembleSpaceCommonType.contribute,
          ) => {
            let protocol = data.contributePackageData.protocol

            protocol.name === name && Meta3d.Semver.satisfies(version, protocol.version)
          }) {
          | list{contribute} => result->Meta3dCommonlib.ArraySt.push((name, iconBase64, contribute))
          | _ => result
          }
        },
        [],
      )
    }, _)
  }

  let selectContribute = (dispatch, protocolIconBase64, contribute) => {
    dispatch(FrontendUtils.AssembleSpaceStoreType.SelectContribute(protocolIconBase64, contribute))
  }

  let useEffectOnceAsync = (
    (setIsLoaded, setContributes),
    service,
    selectedContributesFromShop,
  ) => {
    (
      _getContributesAndContributes(
        service.backend,
        selectedContributesFromShop,
      )->Meta3dBsMost.Most.observe(contributes => {
        setIsLoaded(_ => true)
        setContributes(_ => contributes)
      }, _),
      None,
    )
  }
}

@react.component
let make = (~service: service, ~selectedContributesFromShop: selectedContributesFromShop) => {
  let dispatch = service.react.useDispatch()

  let (isLoaded, setIsLoaded) = service.react.useState(_ => false)
  let (contributes, setContributes) = service.react.useState(_ => [])

  service.react.useEffectOnceAsync(() =>
    Method.useEffectOnceAsync((setIsLoaded, setContributes), service, selectedContributesFromShop)
  )

  !isLoaded
    ? <p> {React.string(`loading...`)} </p>
    : <List
        grid={{gutter: 16, column: 3}}
        dataSource={contributes}
        renderItem={((name, iconBase64, contribute)) => {
          <List.Item>
            <Card
              key={name}
              onClick={_ => {
                Method.selectContribute(dispatch, iconBase64, contribute)
              }}
              bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
              cover={<img
                style={ReactDOM.Style.make(~width="50px", ~height="50px", ())} src={iconBase64}
              />}>
              <Card.Meta
                style={ReactDOM.Style.make(~width="100px", ())} title={React.string(name)}
              />
            </Card>
          </List.Item>
        }}
      />
}

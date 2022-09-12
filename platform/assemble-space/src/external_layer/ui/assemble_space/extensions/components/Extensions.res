open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  // TODO perf: defer load when panel change
  let _getExtensionsAndContributes = (
    {getAllPublishExtensionProtocols},
    selectedExtensionsFromShop,
  ) => {
    getAllPublishExtensionProtocols()->Meta3dBsMost.Most.map(protocols => {
      protocols->Meta3dCommonlib.ArraySt.reduceOneParam(
        (. result, {name, iconBase64, version}: FrontendUtils.BackendCloudbaseType.protocol) => {
          switch selectedExtensionsFromShop->Meta3dCommonlib.ListSt.filter((
            {data}: FrontendUtils.AssembleSpaceCommonType.extension,
          ) => {
            let protocol = data.extensionPackageData.protocol

            protocol.name === name && Meta3d.Semver.satisfies(version, protocol.version)
          }) {
          | list{extension} => result->Meta3dCommonlib.ArraySt.push((name, iconBase64, extension))
          | _ => result
          }
        },
        [],
      )
    }, _)
  }

  let selectExtension = (dispatch, protocolIconBase64, extension) => {
    dispatch(FrontendUtils.AssembleSpaceStoreType.SelectExtension(protocolIconBase64, extension))
  }

  let useEffectOnceAsync = ((setIsLoaded, setExtensions), service, selectedExtensionsFromShop) => {
    (
      _getExtensionsAndContributes(
        service.backend,
        selectedExtensionsFromShop,
      )->Meta3dBsMost.Most.observe(extensions => {
        setIsLoaded(_ => true)
        setExtensions(_ => extensions)
      }, _),
      None,
    )
  }
}

@react.component
let make = (~service: service, ~selectedExtensionsFromShop: selectedExtensionsFromShop) => {
  let dispatch = service.react.useDispatch()

  let (isLoaded, setIsLoaded) = service.react.useState(_ => false)
  let (extensions, setExtensions) = service.react.useState(_ => [])

  service.react.useEffectOnceAsync(() =>
    Method.useEffectOnceAsync((setIsLoaded, setExtensions), service, selectedExtensionsFromShop)
  )

  !isLoaded
    ? <p> {React.string(`loading...`)} </p>
    : <List
        grid={{gutter: 16, column: 3}}
        dataSource={extensions}
        renderItem={((name, iconBase64, extension)) => {
          <List.Item>
            <Card
              key={name}
              onClick={_ => {
                Method.selectExtension(dispatch, iconBase64, extension)
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

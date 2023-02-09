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
    getAllPublishExtensionProtocols()->Meta3dBsMost.Most.map(
      protocols => {
        protocols
        ->Meta3dCommonlib.ArraySt.reduceOneParam(
          (.
            result,
            {
              name,
              iconBase64,
              version,
              displayName,
              repoLink,
              description,
            }: FrontendUtils.BackendCloudbaseType.protocol,
          ) => {
            selectedExtensionsFromMarket
            ->Meta3dCommonlib.ListSt.filter(
              (({data}: FrontendUtils.AssembleSpaceCommonType.extension, _)) => {
                let protocol = data.extensionPackageData.protocol

                protocol.name === name && Meta3d.Semver.satisfies(version, protocol.version)
              },
            )
            ->Meta3dCommonlib.ListSt.reduce(
              result,
              (result, (extension, protocolConfig)) => {
                result->Meta3dCommonlib.ArraySt.push((
                  extension.data.extensionPackageData.displayName,
                  iconBase64,
                  displayName,
                  repoLink,
                  description,
                  protocolConfig->_getProtocolConfigStr,
                  extension,
                ))
              },
            )
          },
          [],
        )
        ->Meta3dCommonlib.ArraySt.removeDuplicateItemsWithBuildKeyFunc((. (
          name,
          _,
          _,
          _,
          _,
          _,
          _,
        )) => {
          name
        })
      },
      // | list{(extension, protocolConfig)} =>

      _,
    )
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
  ~useDispatch,
  ~selectExtension,
) => {
  let dispatch = useDispatch(service.react.useDispatch)

  let (isLoaded, setIsLoaded) = service.react.useState(_ => false)
  let (extensions, setExtensions) = service.react.useState(_ => [])

  service.react.useEffectOnceAsync(() =>
    Method.useEffectOnceAsync((setIsLoaded, setExtensions), service, selectedExtensionsFromMarket)
  )

  !isLoaded
    ? <p> {React.string(`loading...`)} </p>
    : <List
        grid={{gutter: 16, column: 3}}
        dataSource={extensions}
        renderItem={((
          name,
          iconBase64,
          displayName,
          repoLink,
          description,
          configStr,
          extension,
        )) => {
          <List.Item>
            <Card
              key={name}
              onClick={_ => {
                selectExtension(
                  dispatch,
                  iconBase64,
                  displayName,
                  repoLink,
                  description,
                  configStr,
                  extension,
                )
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

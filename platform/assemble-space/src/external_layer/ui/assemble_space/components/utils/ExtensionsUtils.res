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
    getAllPublishExtensionProtocols(10, 10)->Meta3dBsMost.Most.map(
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
              (({data, protocolVersion}: FrontendUtils.AssembleSpaceCommonType.extension, _)) => {
                let protocol = data.extensionPackageData.protocol

                protocol.name === name && Meta3d.Semver.eq(version, protocolVersion)
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
          displayName,
          _,
          _,
          _,
          _,
          _,
          _,
        )) => {
          displayName
        })
      },
      // protocol.name === name && Meta3d.Semver.satisfies(version, protocol.version)
      // protocol.name === name && Meta3d.Semver.gte(version, protocolVersion)

      // | list{(extension, protocolConfig)} =>

      _,
    )
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

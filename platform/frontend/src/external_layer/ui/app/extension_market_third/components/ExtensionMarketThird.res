open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

@react.component
let make = (
  ~service: FrontendUtils.FrontendType.service,
  ~extensionProtocolItem: FrontendUtils.BackendCloudbaseType.protocol,
  ~allPublishExtensionProtocolConfigs,
) => {
  let dispatch = AppStore.useDispatch()
  let {selectedExtensions} = AppStore.useSelector(({userCenterState}: AppStore.state) =>
    userCenterState
  )

  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (page, setPage) = React.useState(_ => 1)
  //   let (extensionProtocolItem, setExtensionProtocolItem) = React.useState(_ => None)
  //   let (allPublishExtensions, setAllPublishExtensions) = React.useState(_ => None)
  let (allPublishExtensions, setAllPublishExtensions) = React.useState(_ => [])
  //   let (selectPublishExtensionProtocol, setSelectPublishExtensionProtocol) = React.useState(_ =>
  //     Meta3dCommonlib.ImmutableHashMap.createEmpty()
  //   )
  let (selectPublishExtension, setSelectPublishExtension) = React.useState(_ =>
    Meta3dCommonlib.ImmutableHashMap.createEmpty()
  )

  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  let (isDownloadBegin, setIsDownloadBegin) = React.useState(_ => false)

  let _groupAllPublishExtensions = (
    allPublishExtensions: array<FrontendUtils.FrontendType.publishExtension>,
  ): array<array<FrontendUtils.FrontendType.publishExtension>> => {
    FrontendUtils.MarketUtils.groupAllPublishItems(
      (
        ({info}: FrontendUtils.FrontendType.publishExtension) => info.name,
        ({info}: FrontendUtils.FrontendType.publishExtension) => info.version,
      ),
      allPublishExtensions,
    )
  }

  let _getAllPublishExtensionsCount = allPublishExtensions => {
    allPublishExtensions->_groupAllPublishExtensions->Meta3dCommonlib.ArraySt.length
  }

  let _onChange = (page, pageSize) => {
    setPage(_ => page)
  }

  React.useEffect1(() => {
    service.backend.getAllPublishExtensionInfos(.
      FrontendUtils.MarketUtils.getLimitCount(),
      0,
      extensionProtocolItem.name,
      extensionProtocolItem.version,
    )
    ->Meta3dBsMost.Most.observe(data => {
      setAllPublishExtensions(
        _ =>
          data->Meta3dCommonlib.ArraySt.map(
            (info): FrontendUtils.FrontendType.publishExtension => {
              protocolName: extensionProtocolItem.name,
              protocolVersion: extensionProtocolItem.version,
              protocolIconBase64: extensionProtocolItem.iconBase64,
              protocolDisplayName: extensionProtocolItem.displayName,
              info,
            },
          ),
      )
      setIsLoaded(_ => true)
    }, _)
    ->Js.Promise.catch(e => {
      setIsLoaded(_ => false)

      FrontendUtils.ErrorUtils.errorWithExn(
        e->FrontendUtils.Error.promiseErrorToExn,
        None,
      )->Obj.magic
    }, _)
    ->ignore

    None
  }, [])

  <Layout>
    <Layout.Content>
      {!isLoaded
        ? <p> {React.string(`loading...`)} </p>
        : {
            let (protocolName, protocolVersion) = (
              extensionProtocolItem.name,
              extensionProtocolItem.version,
            )

            <>
              {isDownloadBegin
                ? <p> {React.string({j`${downloadProgress->Js.Int.toString}% downloading...`})} </p>
                : React.null}
              <List
                itemLayout=#horizontal
                dataSource={FrontendUtils.MarketUtils.getCurrentPage(
                  allPublishExtensions->_groupAllPublishExtensions,
                  page,
                  FrontendUtils.MarketUtils.getPageSize(),
                )}
                renderItem={(items: array<FrontendUtils.FrontendType.publishExtension>) => {
                  let firstItem =
                    items->Meta3dCommonlib.ArraySt.getFirst->Meta3dCommonlib.OptionSt.getExn

                  let extensionProtocolItem =
                    selectPublishExtension
                    ->Meta3dCommonlib.ImmutableHashMap.get(firstItem.info.name)
                    ->Meta3dCommonlib.OptionSt.getWithDefault(firstItem)

                  <List.Item>
                    <List.Item.Meta
                      key={extensionProtocolItem.info.displayName}
                      title={<Typography.Title level=3>
                        {React.string(extensionProtocolItem.info.displayName)}
                      </Typography.Title>}
                      description={UIDescriptionUtils.build(
                        extensionProtocolItem.info.account,
                        extensionProtocolItem.info.repoLink,
                        extensionProtocolItem.info.description,
                      )}
                    />
                    {FrontendUtils.SelectUtils.buildSelectWithoutEmpty(
                      version =>
                        setSelectPublishExtension(value =>
                          value->Meta3dCommonlib.ImmutableHashMap.set(
                            extensionProtocolItem.info.name,
                            items
                            ->Meta3dCommonlib.ArraySt.find(
                              extensionProtocolItem =>
                                extensionProtocolItem.info.version === version,
                            )
                            ->Meta3dCommonlib.OptionSt.getExn,
                          )
                        ),
                      extensionProtocolItem.info.version,
                      items->Meta3dCommonlib.ArraySt.map(extensionProtocolItem =>
                        extensionProtocolItem.info.version
                      ),
                    )}
                    {
                      //   FrontendUtils.MarketUtils.isSelect(
                      //   (({id}, _): FrontendUtils.AssembleSpaceCommonType.extensionData) => id,
                      //   extensionProtocolItem.info.id,
                      //   selectedExtensions,
                      // )
                      FrontendUtils.MarketUtils.isSelect(
                        (
                          ({version, data}, _): FrontendUtils.AssembleSpaceCommonType.extensionData,
                        ) => {j`${version}_${data.extensionPackageData.name}`},
                        {
                          j`${extensionProtocolItem.info.version}_${extensionProtocolItem.info.name}`
                        },
                        selectedExtensions,
                      )
                        ? <Button
                            onClick={_ => {
                              dispatch(
                                AppStore.UserCenterAction(
                                  UserCenterStore.NotSelectExtension(extensionProtocolItem.info.name, extensionProtocolItem.info.version),
                                ),
                              )
                            }}>
                            {React.string(`取消选择`)}
                          </Button>
                        : <Button
                            onClick={_ => {
                              setIsDownloadBegin(_ => true)

                              service.backend.findPublishExtension(.
                                progress => setDownloadProgress(_ => progress),
                                FrontendUtils.MarketUtils.getLimitCount(),
                                0,
                                extensionProtocolItem.info.account,
                                extensionProtocolItem.info.name,
                                extensionProtocolItem.info.version,
                              )
                              ->Meta3dBsMost.Most.observe(file => {
                                Meta3dCommonlib.NullableSt.isNullable(file)
                                  ? {
                                      setIsDownloadBegin(_ => false)

                                      FrontendUtils.ErrorUtils.error(
                                        {j`找不到extension file`},
                                        None,
                                      )->Obj.magic
                                    }
                                  : {
                                      setIsDownloadBegin(_ => false)

                                      dispatch(
                                        AppStore.UserCenterAction(
                                          UserCenterStore.SelectExtension(
                                            {
                                              id: extensionProtocolItem.info.id,
                                              data: Meta3d.Main.loadExtension(
                                                file->Meta3dCommonlib.NullableSt.getExn,
                                              ),
                                              protocolName: extensionProtocolItem.protocolName,
                                              protocolVersion: extensionProtocolItem.protocolVersion,
                                              protocolIconBase64: extensionProtocolItem.protocolIconBase64,
                                              version: extensionProtocolItem.info.version,
                                              account: extensionProtocolItem.info.account,
                                            },
                                            allPublishExtensionProtocolConfigs->Meta3dCommonlib.ArraySt.find(
                                              (
                                                {
                                                  name,
                                                  version,
                                                }: FrontendUtils.CommonType.protocolConfig,
                                              ) => {
                                                name === protocolName && version === protocolVersion
                                              },
                                            ),
                                          ),
                                        ),
                                      )
                                    }
                              }, _)
                              ->Js.Promise.catch(e => {
                                setIsDownloadBegin(_ => false)

                                FrontendUtils.ErrorUtils.errorWithExn(
                                  e->FrontendUtils.Error.promiseErrorToExn,
                                  None,
                                )->Obj.magic
                              }, _)
                              ->ignore
                            }}>
                            {React.string(`选择`)}
                          </Button>
                    }
                  </List.Item>
                }}
              />
            </>
          }}
    </Layout.Content>
    <Layout.Footer>
      {switch isLoaded {
      | true =>
        <Pagination
          current={page}
          defaultPageSize={FrontendUtils.MarketUtils.getPageSize()}
          total={_getAllPublishExtensionsCount(allPublishExtensions)}
          onChange=_onChange
        />
      | false => React.null
      }}
    </Layout.Footer>
  </Layout>
}

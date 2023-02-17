open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

@react.component
let make = (
  ~service: FrontendUtils.FrontendType.service,
  ~contributeProtocolItem: FrontendUtils.BackendCloudbaseType.protocol,
  ~allPublishContributeProtocolConfigs,
) => {
  let dispatch = AppStore.useDispatch()
  let {selectedContributes} = AppStore.useSelector(({userCenterState}: AppStore.state) =>
    userCenterState
  )

  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (page, setPage) = React.useState(_ => 1)
  //   let (contributeProtocolItem, setContributeProtocolItem) = React.useState(_ => None)
  //   let (allPublishContributes, setAllPublishContributes) = React.useState(_ => None)
  let (allPublishContributes, setAllPublishContributes) = React.useState(_ => [])
  //   let (selectPublishContributeProtocol, setSelectPublishContributeProtocol) = React.useState(_ =>
  //     Meta3dCommonlib.ImmutableHashMap.createEmpty()
  //   )
  let (selectPublishContribute, setSelectPublishContribute) = React.useState(_ =>
    Meta3dCommonlib.ImmutableHashMap.createEmpty()
  )

  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  let (isDownloadBegin, setIsDownloadBegin) = React.useState(_ => false)

  let _groupAllPublishContributes = (
    allPublishContributes: array<FrontendUtils.FrontendType.publishContribute>,
  ): array<array<FrontendUtils.FrontendType.publishContribute>> => {
    FrontendUtils.MarketUtils.groupAllPublishItems(
      (
        ({info}: FrontendUtils.FrontendType.publishContribute) => info.name,
        ({info}: FrontendUtils.FrontendType.publishContribute) => info.version,
      ),
      allPublishContributes,
    )
  }

  let _getAllPublishContributesCount = allPublishContributes => {
    allPublishContributes->_groupAllPublishContributes->Meta3dCommonlib.ArraySt.length
  }

  let _onChange = (page, pageSize) => {
    setPage(_ => page)
  }

  React.useEffect1(() => {
    service.backend.getAllPublishContributeInfos(.
      FrontendUtils.MarketUtils.getLimitCount(),
      0,
      contributeProtocolItem.name,
      contributeProtocolItem.version,
    )
    ->Meta3dBsMost.Most.observe(data => {
      setAllPublishContributes(
        _ =>
          data->Meta3dCommonlib.ArraySt.map(
            (info): FrontendUtils.FrontendType.publishContribute => {
              protocolName: contributeProtocolItem.name,
              protocolVersion: contributeProtocolItem.version,
              protocolIconBase64: contributeProtocolItem.iconBase64,
              protocolDisplayName: contributeProtocolItem.displayName,
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
              contributeProtocolItem.name,
              contributeProtocolItem.version,
            )

            <>
              {isDownloadBegin
                ? <p> {React.string({j`${downloadProgress->Js.Int.toString}% downloading...`})} </p>
                : React.null}
              <List
                itemLayout=#horizontal
                dataSource={FrontendUtils.MarketUtils.getCurrentPage(
                  allPublishContributes->_groupAllPublishContributes,
                  page,
                  FrontendUtils.MarketUtils.getPageSize(),
                )}
                renderItem={(items: array<FrontendUtils.FrontendType.publishContribute>) => {
                  let firstItem =
                    items->Meta3dCommonlib.ArraySt.getFirst->Meta3dCommonlib.OptionSt.getExn

                  let contributeProtocolItem =
                    selectPublishContribute
                    ->Meta3dCommonlib.ImmutableHashMap.get(firstItem.info.name)
                    ->Meta3dCommonlib.OptionSt.getWithDefault(firstItem)

                  <List.Item>
                    <List.Item.Meta
                      key={contributeProtocolItem.info.displayName}
                      title={<Typography.Title level=3>
                        {React.string(contributeProtocolItem.info.displayName)}
                      </Typography.Title>}
                      description={UIDescriptionUtils.build(
                        contributeProtocolItem.info.account,
                        contributeProtocolItem.info.repoLink,
                        contributeProtocolItem.info.description,
                      )}
                    />
                    {FrontendUtils.SelectUtils.buildSelectWithoutEmpty(
                      version =>
                        setSelectPublishContribute(value =>
                          value->Meta3dCommonlib.ImmutableHashMap.set(
                            contributeProtocolItem.info.name,
                            items
                            ->Meta3dCommonlib.ArraySt.find(
                              contributeProtocolItem =>
                                contributeProtocolItem.info.version === version,
                            )
                            ->Meta3dCommonlib.OptionSt.getExn,
                          )
                        ),
                      contributeProtocolItem.info.version,
                      items->Meta3dCommonlib.ArraySt.map(contributeProtocolItem =>
                        contributeProtocolItem.info.version
                      ),
                    )}
                    {FrontendUtils.MarketUtils.isSelect(
                      (({id}, _): FrontendUtils.AssembleSpaceCommonType.contributeData) => id,
                      contributeProtocolItem.info.id,
                      selectedContributes,
                    )
                      ? <Button
                          onClick={_ => {
                            dispatch(
                              AppStore.UserCenterAction(
                                UserCenterStore.NotSelectContribute(contributeProtocolItem.info.id),
                              ),
                            )
                          }}>
                          {React.string(`取消选择`)}
                        </Button>
                      : <Button
                          onClick={_ => {
                            setIsDownloadBegin(_ => true)

                            service.backend.findPublishContribute(.
                              progress => setDownloadProgress(_ => progress),
                              FrontendUtils.MarketUtils.getLimitCount(),
                              0,
                              contributeProtocolItem.info.account,
                              contributeProtocolItem.info.name,
                              contributeProtocolItem.info.version,
                            )
                            ->Meta3dBsMost.Most.observe(file => {
                              Meta3dCommonlib.NullableSt.isNullable(file)
                                ? {
                                    setIsDownloadBegin(_ => false)

                                    FrontendUtils.ErrorUtils.error(
                                      {j`找不到contribute file`},
                                      None,
                                    )->Obj.magic
                                  }
                                : {
                                    setIsDownloadBegin(_ => false)

                                    dispatch(
                                      AppStore.UserCenterAction(
                                        UserCenterStore.SelectContribute(
                                          {
                                            id: contributeProtocolItem.info.id,
                                            data: Meta3d.Main.loadContribute(
                                              file->Meta3dCommonlib.NullableSt.getExn,
                                            ),
                                            protocolName: contributeProtocolItem.protocolName,
                                            protocolVersion: contributeProtocolItem.protocolVersion,
                                            protocolIconBase64: contributeProtocolItem.protocolIconBase64,
                                            version: contributeProtocolItem.info.version,
                                            account: contributeProtocolItem.info.account,
                                          },
                                          allPublishContributeProtocolConfigs->Meta3dCommonlib.ArraySt.find(
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
                        </Button>}
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
          total={_getAllPublishContributesCount(allPublishContributes)}
          onChange=_onChange
        />
      | false => React.null
      }}
    </Layout.Footer>
  </Layout>
}

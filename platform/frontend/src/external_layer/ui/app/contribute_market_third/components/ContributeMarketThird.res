open Antd
%%raw("import 'antd/dist/antd.css'")

@react.component
let make = (
  ~service: FrontendType.service,
  ~contributeProtocolItem: BackendCloudbaseType.protocol,
  ~allPublishContributeProtocolConfigs,
) => {
  let dispatch = AppStore.useDispatch()
  let {selectedContributes} = AppStore.useSelector((
    {userCenterState}: AppStoreType.state,
  ) => userCenterState)

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
    allPublishContributes: array<FrontendType.publishContribute>,
  ): array<array<FrontendType.publishContribute>> => {
    MarketUtils.groupAllPublishItems(
      (
        ({info}: FrontendType.publishContribute) => info.name,
        ({info}: FrontendType.publishContribute) => info.version,
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
      MarketUtils.getLimitCount(),
      0,
      contributeProtocolItem.name,
      contributeProtocolItem.version,
    )
    ->Meta3dBsMostDefault.Most.observe(data => {
      setAllPublishContributes(
        _ =>
          data->Meta3dCommonlib.ArraySt.map(
            (info): FrontendType.publishContribute => {
              protocolName: contributeProtocolItem.name,
              protocolVersion: contributeProtocolItem.version,
              protocolIconBase64: contributeProtocolItem.iconBase64,
              protocolDisplayName: contributeProtocolItem.displayName,
              protocolRepoLink: contributeProtocolItem.repoLink,
              protocolDescription: contributeProtocolItem.description,
              info,
            },
          ),
      )
      setIsLoaded(_ => true)
    }, _)
    ->Js.Promise.catch(e => {
      setIsLoaded(_ => false)

      ErrorUtils.errorWithExn(
        e->Error.promiseErrorToExn,
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
                dataSource={MarketUtils.getCurrentPage(
                  allPublishContributes->_groupAllPublishContributes,
                  page,
                  MarketUtils.getPageSize(),
                )}
                renderItem={(items: array<FrontendType.publishContribute>) => {
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
                    {SelectUtils.buildSelectWithoutEmpty(
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
                    {
                      //   MarketUtils.isSelect(
                      //   (({id}, _): AssembleSpaceCommonType.contributeData) => id,
                      //   contributeProtocolItem.info.id,
                      //   selectedContributes,
                      // )

                      MarketUtils.isSelect(
                        (
                          (
                            {version, data},
                            _,
                          ): AssembleSpaceCommonType.contributeData,
                        ) => {j`${version}_${data.contributePackageData.name}`},
                        {
                          j`${contributeProtocolItem.info.version}_${contributeProtocolItem.info.name}`
                        },
                        selectedContributes,
                      )
                        ? <Button
                            onClick={_ => {
                              dispatch(
                                AppStoreType.UserCenterAction(
                                  UserCenterStoreType.NotSelectContribute(
                                    contributeProtocolItem.info.name,
                                    contributeProtocolItem.info.version,
                                  ),
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
                                MarketUtils.getLimitCount(),
                                0,
                                contributeProtocolItem.info.account,
                                contributeProtocolItem.info.name,
                                contributeProtocolItem.info.version,
                              )
                              ->Meta3dBsMostDefault.Most.observe(file => {
                                Meta3dCommonlib.NullableSt.isNullable(file)
                                  ? {
                                      setIsDownloadBegin(_ => false)

                                      ErrorUtils.error(
                                        {j`找不到contribute file`},
                                        None,
                                      )->Obj.magic
                                    }
                                  : {
                                      setIsDownloadBegin(_ => false)

                                      dispatch(
                                        AppStoreType.UserCenterAction(
                                          UserCenterStoreType.SelectContribute(
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
                                                }: CommonType.protocolConfig,
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

                                ErrorUtils.errorWithExn(
                                  e->Error.promiseErrorToExn,
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
          defaultPageSize={MarketUtils.getPageSize()}
          total={_getAllPublishContributesCount(allPublishContributes)}
          showSizeChanger=false
          onChange=_onChange
        />
      | false => React.null
      }}
    </Layout.Footer>
  </Layout>
}

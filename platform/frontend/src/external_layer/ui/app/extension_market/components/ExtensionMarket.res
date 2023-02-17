open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

type showType =
  | Second
  | Third

@react.component
let make = (~service: FrontendUtils.FrontendType.service) => {
  let dispatch = AppStore.useDispatch()
  let {selectedExtensions} = AppStore.useSelector(({userCenterState}: AppStore.state) =>
    userCenterState
  )

  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  // let (
  //   allPublishExtensionProtocolsCount,
  //   setAllPublishExtensionProtocolsCount,
  // ) = React.useState(_ => None)
  let (showType, setShowType) = React.useState(_ => Second)
  let (secondPage, setSecondPage) = React.useState(_ => 1)
  let (thirdPage, setThirdPage) = React.useState(_ => 1)
  let (allPublishExtensionProtocols, setAllPublishExtensionProtocols) = React.useState(_ => [])
  let (
    allPublishExtensionProtocolConfigs,
    setAllPublishExtensionProtocolConfigs,
  ) = React.useState(_ => [])
  let (extensionProtocolItem, setExtensionProtocolItem) = React.useState(_ => None)
  let (allPublishExtensions, setAllPublishExtensions) = React.useState(_ => None)
  let (selectPublishExtensionProtocol, setSelectPublishExtensionProtocol) = React.useState(_ =>
    Meta3dCommonlib.ImmutableHashMap.createEmpty()
  )
  let (selectPublishExtension, setSelectPublishExtension) = React.useState(_ =>
    Meta3dCommonlib.ImmutableHashMap.createEmpty()
  )

  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  let (isDownloadBegin, setIsDownloadBegin) = React.useState(_ => false)

  let _isSelect = (id, selectedExtensions: UserCenterStore.selectedExtensions) => {
    selectedExtensions->Meta3dCommonlib.ListSt.includesByFunc(((selectedExtension, _)) =>
      id === selectedExtension.id
    )
  }

  // let _clearSelectPublishExtensionProtocol = name => {
  //   setSelectPublishExtensionProtocol(value =>
  //     value->Meta3dCommonlib.ImmutableHashMap.deleteVal(name)
  //   )
  // }

  // let _clearSelectPublishExtension = name => {
  //   setSelectPublishExtension(value => value->Meta3dCommonlib.ImmutableHashMap.deleteVal(name))
  // }

  // let _groupAllPublishExtensionProtocols = (
  //   allPublishExtensionProtocols: array<FrontendUtils.BackendCloudbaseType.protocol>,
  // ): array<array<FrontendUtils.BackendCloudbaseType.protocol>> => {
  //   allPublishExtensionProtocols
  //   ->Meta3dCommonlib.ArraySt.reduceOneParam((. map, {name} as protocol) => {
  //     map->Meta3dCommonlib.ImmutableHashMap.set(
  //       name,
  //       map
  //       ->Meta3dCommonlib.ImmutableHashMap.get(name)
  //       ->Meta3dCommonlib.OptionSt.getWithDefault([])
  //       ->Meta3dCommonlib.ArraySt.push(protocol),
  //     )
  //   }, Meta3dCommonlib.ImmutableHashMap.createEmpty())
  //   ->Meta3dCommonlib.ImmutableHashMap.entries
  //   ->Meta3dCommonlib.ArraySt.map(((
  //     name,
  //     protocols: array<FrontendUtils.BackendCloudbaseType.protocol>,
  //   )) => {
  //     protocols
  //     // ->Meta3dCommonlib.ArraySt.copy
  //     ->Meta3dCommonlib.ArraySt.sort((a, b) => {
  //       Meta3d.Semver.gt(a.version, b.version) ? -1 : 1
  //     })
  //   })
  // }

  // let _groupAllPublishExtensions = (
  //   allPublishExtensions: array<FrontendUtils.FrontendType.publishExtension>,
  // ): array<array<FrontendUtils.FrontendType.publishExtension>> => {
  //   allPublishExtensions
  //   ->Meta3dCommonlib.ArraySt.reduceOneParam((. map, {info} as implement) => {
  //     map->Meta3dCommonlib.ImmutableHashMap.set(
  //       info.name,
  //       map
  //       ->Meta3dCommonlib.ImmutableHashMap.get(info.name)
  //       ->Meta3dCommonlib.OptionSt.getWithDefault([])
  //       ->Meta3dCommonlib.ArraySt.push(implement),
  //     )
  //   }, Meta3dCommonlib.ImmutableHashMap.createEmpty())
  //   ->Meta3dCommonlib.ImmutableHashMap.entries
  //   ->Meta3dCommonlib.ArraySt.map(((
  //     name,
  //     implements: array<FrontendUtils.FrontendType.publishExtension>,
  //   )) => {
  //     implements
  //     // ->Meta3dCommonlib.ArraySt.copy
  //     ->Meta3dCommonlib.ArraySt.sort((a, b) => {
  //       Meta3d.Semver.gt(a.info.version, b.info.version) ? -1 : 1
  //     })
  //   })
  // }

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

  let onChangeForSecond = (page, pageSize) => {
    setSecondPage(_ => page)
  }

  let onChangeForThird = (page, pageSize) => {
    setThirdPage(_ => page)
  }

  RescriptReactRouter.watchUrl(url => {
    switch url.path {
    | list{"ExtensionMarket"} =>
      setSelectPublishExtensionProtocol(_ => Meta3dCommonlib.ImmutableHashMap.createEmpty())
      setSelectPublishExtension(_ => Meta3dCommonlib.ImmutableHashMap.createEmpty())

      setExtensionProtocolItem(_ => None)
      setAllPublishExtensions(_ => None)

      setShowType(_ => Second)
      setSecondPage(_ => 1)
      setThirdPage(_ => 1)
    | _ => ()
    }
  })->ignore

  // React.useEffect1(() => {
  //   service.backend.getAllPublishExtensionProtocolsCount()->Meta3dBsMost.Most.observe(count => {
  //     setAllPublishExtensionProtocolsCount(_ => count->Some)
  //     setIsLoaded(_ => true)
  //   }, _)->Js.Promise.catch(e => {
  //     setIsLoaded(_ => false)

  //     FrontendUtils.ErrorUtils.errorWithExn(
  //       e->FrontendUtils.Error.promiseErrorToExn,
  //       None,
  //     )->Obj.magic
  //   }, _)->ignore

  //   None
  // }, [])

  React.useEffect1(() => {
    // TODO handle count > limitCount
    service.backend.getAllPublishExtensionProtocols(.
      // FrontendUtils.MarketUtils.getPageSize(),
      // (page - 1) * FrontendUtils.MarketUtils.getPageSize(),
      FrontendUtils.MarketUtils.getLimitCount(),
      0,
    )
    ->Meta3dBsMost.Most.flatMap(protocols => {
      service.backend.getAllPublishExtensionProtocolConfigs(
        FrontendUtils.MarketUtils.getLimitCount(),
        0,
      )->Meta3dBsMost.Most.map(
        protocolConfigs => {
          (
            protocols->Meta3dCommonlib.ArraySt.filter(
              ({name}: FrontendUtils.BackendCloudbaseType.protocol) =>
                name->FrontendUtils.MarketUtils.isNotInnerProtocol,
            ),
            protocolConfigs->Meta3dCommonlib.ArraySt.filter(
              ({name}: FrontendUtils.CommonType.protocolConfig) =>
                name->FrontendUtils.MarketUtils.isNotInnerProtocol,
            ),
          )
        },
        _,
      )
    }, _)
    ->Meta3dBsMost.Most.observe(((protocols, protocolConfigs)) => {
      setAllPublishExtensionProtocols(_ => protocols)
      setAllPublishExtensionProtocolConfigs(_ => protocolConfigs)
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
    <Layout.Header>
      <Nav currentKey="2" />
    </Layout.Header>
    <Layout.Content>
      {!isLoaded
        ? <p> {React.string(`loading...`)} </p>
        : {
            switch extensionProtocolItem {
            | Some(item: FrontendUtils.BackendCloudbaseType.protocol) =>
              let (protocolName, protocolVersion) = (item.name, item.version)

              switch allPublishExtensions {
              | Some(allPublishExtensions) =>
                <>
                  {isDownloadBegin
                    ? <p>
                        {React.string({j`${downloadProgress->Js.Int.toString}% downloading...`})}
                      </p>
                    : React.null}
                  <List
                    itemLayout=#horizontal
                    dataSource={FrontendUtils.MarketUtils.getCurrentPage(
                      allPublishExtensions->_groupAllPublishExtensions,
                      thirdPage,
                      FrontendUtils.MarketUtils.getPageSize(),
                    )}
                    renderItem={(items: array<FrontendUtils.FrontendType.publishExtension>) => {
                      let firstItem =
                        items->Meta3dCommonlib.ArraySt.getFirst->Meta3dCommonlib.OptionSt.getExn

                      let item =
                        selectPublishExtension
                        ->Meta3dCommonlib.ImmutableHashMap.get(firstItem.info.name)
                        ->Meta3dCommonlib.OptionSt.getWithDefault(firstItem)

                      <List.Item>
                        <List.Item.Meta
                          key={item.info.displayName}
                          title={<Typography.Title level=3>
                            {React.string(item.info.displayName)}
                          </Typography.Title>}
                          description={UIDescriptionUtils.build(
                            item.info.account,
                            item.info.repoLink,
                            item.info.description,
                          )}
                        />
                        {FrontendUtils.SelectUtils.buildSelectWithoutEmpty(
                          version =>
                            setSelectPublishExtension(value =>
                              value->Meta3dCommonlib.ImmutableHashMap.set(
                                item.info.name,
                                items
                                ->Meta3dCommonlib.ArraySt.find(
                                  item => item.info.version === version,
                                )
                                ->Meta3dCommonlib.OptionSt.getExn,
                              )
                            ),
                          item.info.version,
                          items->Meta3dCommonlib.ArraySt.map(item => item.info.version),
                        )}
                        {FrontendUtils.MarketUtils.isSelect(
                          (({id}, _): FrontendUtils.AssembleSpaceCommonType.extensionData) => id,
                          item.info.id,
                          selectedExtensions,
                        )
                          ? <Button
                              onClick={_ => {
                                dispatch(
                                  AppStore.UserCenterAction(
                                    UserCenterStore.NotSelectExtension(item.info.id),
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
                                  item.info.account,
                                  item.info.name,
                                  item.info.version,
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
                                                id: item.info.id,
                                                data: Meta3d.Main.loadExtension(
                                                  file->Meta3dCommonlib.NullableSt.getExn,
                                                ),
                                                protocolName: item.protocolName,
                                                protocolVersion: item.protocolVersion,
                                                protocolIconBase64: item.protocolIconBase64,
                                                version: item.info.version,
                                                account: item.info.account,
                                              },
                                              allPublishExtensionProtocolConfigs->Meta3dCommonlib.ArraySt.find(
                                                (
                                                  {
                                                    name,
                                                    version,
                                                  }: FrontendUtils.CommonType.protocolConfig,
                                                ) => {
                                                  name === protocolName &&
                                                    version === protocolVersion
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
              | None =>
                setIsLoaded(_ => false)

                service.backend.getAllPublishExtensionInfos(.
                  FrontendUtils.MarketUtils.getLimitCount(),
                  0,
                  item.name,
                  item.version,
                )
                ->Meta3dBsMost.Most.observe(data => {
                  setAllPublishExtensions(_ =>
                    data
                    ->Meta3dCommonlib.ArraySt.map(
                      (info): FrontendUtils.FrontendType.publishExtension => {
                        protocolName: item.name,
                        protocolVersion: item.version,
                        protocolIconBase64: item.iconBase64,
                        protocolDisplayName: item.displayName,
                        info,
                      },
                    )
                    ->Some
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

                <> </>
              }
            | None =>
              <List
                itemLayout=#horizontal
                dataSource={FrontendUtils.MarketUtils.getCurrentPage(
                  allPublishExtensionProtocols->FrontendUtils.MarketUtils.groupAllPublishProtocols,
                  secondPage,
                  FrontendUtils.MarketUtils.getPageSize(),
                )}
                renderItem={(items: array<FrontendUtils.BackendCloudbaseType.protocol>) => {
                  let firstItem =
                    items->Meta3dCommonlib.ArraySt.getFirst->Meta3dCommonlib.OptionSt.getExn

                  let item =
                    selectPublishExtensionProtocol
                    ->Meta3dCommonlib.ImmutableHashMap.get(firstItem.name)
                    ->Meta3dCommonlib.OptionSt.getWithDefault(firstItem)

                  <List.Item>
                    <List.Item.Meta
                      key={item.displayName}
                      avatar={<img
                        src={item.iconBase64}
                        width="50px"
                        height="50px"
                        onClick={_ => {
                          setExtensionProtocolItem(_ => item->Some)
                        }}
                      />}
                      title={<Typography.Title
                        level=3
                        onClick={_ => {
                          // _clearSelectPublishExtensionProtocol(item.name)
                          setShowType(_ => Third)

                          setExtensionProtocolItem(_ => item->Some)
                        }}>
                        {React.string(item.displayName)}
                      </Typography.Title>}
                      description={UIDescriptionUtils.build(
                        item.account,
                        item.repoLink,
                        item.description,
                      )}
                    />
                    {FrontendUtils.SelectUtils.buildSelectWithoutEmpty(
                      version =>
                        setSelectPublishExtensionProtocol(value =>
                          value->Meta3dCommonlib.ImmutableHashMap.set(
                            item.name,
                            items
                            ->Meta3dCommonlib.ArraySt.find(item => item.version === version)
                            ->Meta3dCommonlib.OptionSt.getExn,
                          )
                        ),
                      item.version,
                      items->Meta3dCommonlib.ArraySt.map(item => item.version),
                    )}
                  </List.Item>
                }}
              />
            }
          }}
    </Layout.Content>
    <Layout.Footer>
      {switch isLoaded {
      | true =>
        switch showType {
        | Second =>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={FrontendUtils.MarketUtils.getPageSize()}
            total={FrontendUtils.MarketUtils.getAllProtocolsCount(allPublishExtensionProtocols)}
            onChange=onChangeForSecond
          />
        | Third =>
          switch allPublishExtensions {
          | Some(allPublishExtensions) =>
            <Pagination
              defaultCurrent={1}
              defaultPageSize={FrontendUtils.MarketUtils.getPageSize()}
              total={_getAllPublishExtensionsCount(allPublishExtensions)}
              onChange=onChangeForThird
            />
          | None => React.null
          }
        }
      | false => React.null
      }}
    </Layout.Footer>
  </Layout>
}

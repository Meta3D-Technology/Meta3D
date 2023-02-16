open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

type showType =
  | Second
  | Third

@react.component
let make = (~service: FrontendUtils.FrontendType.service) => {
  let dispatch = AppStore.useDispatch()
  let {selectedContributes} = AppStore.useSelector(({userCenterState}: AppStore.state) =>
    userCenterState
  )

  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  // let (
  //   allPublishContributeProtocolsCount,
  //   setAllPublishContributeProtocolsCount,
  // ) = React.useState(_ => None)
  let (showType, setShowType) = React.useState(_ => Second)
  let (secondPage, setSecondPage) = React.useState(_ => 1)
  let (thirdPage, setThirdPage) = React.useState(_ => 1)
  let (allPublishContributeProtocols, setAllPublishContributeProtocols) = React.useState(_ => [])
  let (
    allPublishContributeProtocolConfigs,
    setAllPublishContributeProtocolConfigs,
  ) = React.useState(_ => [])
  let (contributeProtocolItem, setContributeProtocolItem) = React.useState(_ => None)
  let (allPublishContributes, setAllPublishContributes) = React.useState(_ => None)
  let (selectPublishContributeProtocol, setSelectPublishContributeProtocol) = React.useState(_ =>
    Meta3dCommonlib.ImmutableHashMap.createEmpty()
  )
  let (selectPublishContribute, setSelectPublishContribute) = React.useState(_ =>
    Meta3dCommonlib.ImmutableHashMap.createEmpty()
  )

  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  let (isDownloadBegin, setIsDownloadBegin) = React.useState(_ => false)

  let _isSelect = (id, selectedContributes: UserCenterStore.selectedContributes) => {
    selectedContributes->Meta3dCommonlib.ListSt.includesByFunc(((selectedContribute, _)) =>
      id === selectedContribute.id
    )
  }

  // let _clearSelectPublishContributeProtocol = name => {
  //   setSelectPublishContributeProtocol(value =>
  //     value->Meta3dCommonlib.ImmutableHashMap.deleteVal(name)
  //   )
  // }

  // let _clearSelectPublishContribute = name => {
  //   setSelectPublishContribute(value => value->Meta3dCommonlib.ImmutableHashMap.deleteVal(name))
  // }

  let _groupAllPublishContributeProtocols = (
    allPublishContributeProtocols: array<FrontendUtils.BackendCloudbaseType.protocol>,
  ): array<array<FrontendUtils.BackendCloudbaseType.protocol>> => {
    allPublishContributeProtocols
    ->Meta3dCommonlib.ArraySt.reduceOneParam((. map, {name} as protocol) => {
      map->Meta3dCommonlib.ImmutableHashMap.set(
        name,
        map
        ->Meta3dCommonlib.ImmutableHashMap.get(name)
        ->Meta3dCommonlib.OptionSt.getWithDefault([])
        ->Meta3dCommonlib.ArraySt.push(protocol),
      )
    }, Meta3dCommonlib.ImmutableHashMap.createEmpty())
    ->Meta3dCommonlib.ImmutableHashMap.entries
    ->Meta3dCommonlib.ArraySt.map(((
      name,
      protocols: array<FrontendUtils.BackendCloudbaseType.protocol>,
    )) => {
      protocols
      // ->Meta3dCommonlib.ArraySt.copy
      ->Meta3dCommonlib.ArraySt.sort((a, b) => {
        Meta3d.Semver.gt(a.version, b.version) ? -1 : 1
      })
    })
  }

  let _groupAllPublishContributes = (
    allPublishContributes: array<FrontendUtils.FrontendType.publishContribute>,
  ): array<array<FrontendUtils.FrontendType.publishContribute>> => {
    allPublishContributes
    ->Meta3dCommonlib.ArraySt.reduceOneParam((. map, {info} as implement) => {
      map->Meta3dCommonlib.ImmutableHashMap.set(
        info.name,
        map
        ->Meta3dCommonlib.ImmutableHashMap.get(info.name)
        ->Meta3dCommonlib.OptionSt.getWithDefault([])
        ->Meta3dCommonlib.ArraySt.push(implement),
      )
    }, Meta3dCommonlib.ImmutableHashMap.createEmpty())
    ->Meta3dCommonlib.ImmutableHashMap.entries
    ->Meta3dCommonlib.ArraySt.map(((
      name,
      implements: array<FrontendUtils.FrontendType.publishContribute>,
    )) => {
      implements
      // ->Meta3dCommonlib.ArraySt.copy
      ->Meta3dCommonlib.ArraySt.sort((a, b) => {
        Meta3d.Semver.gt(a.info.version, b.info.version) ? -1 : 1
      })
    })
  }

  let _getAllPublishContributeProtocolsCount = allPublishContributeProtocols => {
    allPublishContributeProtocols
    ->_groupAllPublishContributeProtocols
    ->Meta3dCommonlib.ArraySt.length
  }

  let _getAllPublishContributesCount = allPublishContributes => {
    allPublishContributes->_groupAllPublishContributes->Meta3dCommonlib.ArraySt.length
  }

  let _getCurrentPageOfAllPublishContributeProtocols = (
    groupedAllPublishContributeProtocols,
    page,
    pageSize,
  ) => {
    groupedAllPublishContributeProtocols->Meta3dCommonlib.ArraySt.slice(
      (page - 1) * pageSize,
      page * pageSize,
    )
  }

  let _getCurrentPageOfAllPublishContributes = (groupedAllPublishContributes, page, pageSize) => {
    groupedAllPublishContributes->Meta3dCommonlib.ArraySt.slice(
      (page - 1) * pageSize,
      page * pageSize,
    )
  }

  let onChangeForSecond = (page, pageSize) => {
    setSecondPage(_ => page)
  }

  let onChangeForThird = (page, pageSize) => {
    setThirdPage(_ => page)
  }

  RescriptReactRouter.watchUrl(url => {
    switch url.path {
    | list{"ContributeMarket"} =>
      setSelectPublishContributeProtocol(_ => Meta3dCommonlib.ImmutableHashMap.createEmpty())
      setSelectPublishContribute(_ => Meta3dCommonlib.ImmutableHashMap.createEmpty())

      setContributeProtocolItem(_ => None)
      setAllPublishContributes(_ => None)

      setShowType(_ => Second)
      setSecondPage(_ => 1)
      setThirdPage(_ => 1)
    | _ => ()
    }
  })->ignore

  // React.useEffect1(() => {
  //   service.backend.getAllPublishContributeProtocolsCount()->Meta3dBsMost.Most.observe(count => {
  //     setAllPublishContributeProtocolsCount(_ => count->Some)
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
    service.backend.getAllPublishContributeProtocols(.
      // FrontendUtils.MarketUtils.getPageSize(),
      // (page - 1) * FrontendUtils.MarketUtils.getPageSize(),
      FrontendUtils.MarketUtils.getLimitCount(),
      0,
    )
    ->Meta3dBsMost.Most.flatMap(protocols => {
      service.backend.getAllPublishContributeProtocolConfigs(
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
      setAllPublishContributeProtocols(_ => protocols)
      setAllPublishContributeProtocolConfigs(_ => protocolConfigs)
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
      <Nav currentKey="3" />
    </Layout.Header>
    <Layout.Content>
      {!isLoaded
        ? <p> {React.string(`loading...`)} </p>
        : {
            switch contributeProtocolItem {
            | Some(item: FrontendUtils.BackendCloudbaseType.protocol) =>
              let (protocolName, protocolVersion) = (item.name, item.version)

              switch allPublishContributes {
              | Some(allPublishContributes) =>
                <>
                  {isDownloadBegin
                    ? <p>
                        {React.string({j`${downloadProgress->Js.Int.toString}% downloading...`})}
                      </p>
                    : React.null}
                  <List
                    itemLayout=#horizontal
                    dataSource={_getCurrentPageOfAllPublishContributes(
                      allPublishContributes->_groupAllPublishContributes,
                      thirdPage,
                      FrontendUtils.MarketUtils.getPageSize(),
                    )}
                    renderItem={(items: array<FrontendUtils.FrontendType.publishContribute>) => {
                      let firstItem =
                        items->Meta3dCommonlib.ArraySt.getFirst->Meta3dCommonlib.OptionSt.getExn

                      let item =
                        selectPublishContribute
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
                            setSelectPublishContribute(value =>
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
                        {_isSelect(item.info.id, selectedContributes)
                          ? <Button
                              onClick={_ => {
                                dispatch(
                                  AppStore.UserCenterAction(
                                    UserCenterStore.NotSelectContribute(item.info.id),
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
                                  item.info.account,
                                  item.info.name,
                                  item.info.version,
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
                                                id: item.info.id,
                                                data: Meta3d.Main.loadContribute(
                                                  file->Meta3dCommonlib.NullableSt.getExn,
                                                ),
                                                protocolName: item.protocolName,
                                                protocolVersion: item.protocolVersion,
                                                protocolIconBase64: item.protocolIconBase64,
                                                version: item.info.version,
                                                account: item.info.account,
                                              },
                                              allPublishContributeProtocolConfigs->Meta3dCommonlib.ArraySt.find(
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

                service.backend.getAllPublishContributeInfos(.
                  FrontendUtils.MarketUtils.getLimitCount(),
                  0,
                  item.name,
                  item.version,
                )
                ->Meta3dBsMost.Most.observe(data => {
                  setAllPublishContributes(_ =>
                    data
                    ->Meta3dCommonlib.ArraySt.map(
                      (info): FrontendUtils.FrontendType.publishContribute => {
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
                dataSource={_getCurrentPageOfAllPublishContributeProtocols(
                  allPublishContributeProtocols->_groupAllPublishContributeProtocols,
                  secondPage,
                  FrontendUtils.MarketUtils.getPageSize(),
                )}
                renderItem={(items: array<FrontendUtils.BackendCloudbaseType.protocol>) => {
                  let firstItem =
                    items->Meta3dCommonlib.ArraySt.getFirst->Meta3dCommonlib.OptionSt.getExn

                  let item =
                    selectPublishContributeProtocol
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
                          setContributeProtocolItem(_ => item->Some)
                        }}
                      />}
                      title={<Typography.Title
                        level=3
                        onClick={_ => {
                          // _clearSelectPublishContributeProtocol(item.name)
                          setShowType(_ => Third)

                          setContributeProtocolItem(_ => item->Some)
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
                        setSelectPublishContributeProtocol(value =>
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
            total={_getAllPublishContributeProtocolsCount(allPublishContributeProtocols)}
            onChange=onChangeForSecond
          />
        | Third =>
          switch allPublishContributes {
          | Some(allPublishContributes) =>
            <Pagination
              defaultCurrent={1}
              defaultPageSize={FrontendUtils.MarketUtils.getPageSize()}
              total={_getAllPublishContributesCount(allPublishContributes)}
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

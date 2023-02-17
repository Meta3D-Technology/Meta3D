open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

type showType =
  | Second
  | Third

@react.component
let make = (~service: FrontendUtils.FrontendType.service) => {
  let dispatch = AppStore.useDispatch()
  let {selectedPackages} = AppStore.useSelector(({userCenterState}: AppStore.state) =>
    userCenterState
  )

  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (
    allPublishPackageEntryExtensionProtocols,
    setAllPublishPackageEntryExtensionProtocols,
  ) = React.useState(_ => [])
  //   let (
  //     allPublishPackageProtocolConfigs,
  //     setAllPublishPackageProtocolConfigs,
  //   ) = React.useState(_ => [])
  let (showType, setShowType) = React.useState(_ => Second)
  let (secondPage, setSecondPage) = React.useState(_ => 1)
  let (thirdPage, setThirdPage) = React.useState(_ => 1)
  let (
    packageEntryExtensionProtocolItem,
    setPackageEntryExtensionProtocolItem,
  ) = React.useState(_ => None)
  let (allPublishPackages, setAllPublishPackages) = React.useState(_ => None)

  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  let (isDownloadBegin, setIsDownloadBegin) = React.useState(_ => false)

  let (
    selectPublishPackageEntryExtensionProtocol,
    setSelectPublishPackageEntryExtensionProtocol,
  ) = React.useState(_ => Meta3dCommonlib.ImmutableHashMap.createEmpty())
  let (selectPublishPackage, setSelectPublishPackage) = React.useState(_ =>
    Meta3dCommonlib.ImmutableHashMap.createEmpty()
  )

  let _groupAllPublishPackages = (
    allPublishPackages: array<FrontendUtils.BackendCloudbaseType.packageImplementInfo>,
  ): array<array<FrontendUtils.BackendCloudbaseType.packageImplementInfo>> => {
    FrontendUtils.MarketUtils.groupAllPublishItems(
      (
        ({name}: FrontendUtils.BackendCloudbaseType.packageImplementInfo) => name,
        ({version}: FrontendUtils.BackendCloudbaseType.packageImplementInfo) => version,
      ),
      allPublishPackages,
    )
  }

  let _buildPackageFileName = (packageName, packageVersion) => {
    j`${packageName}_${packageVersion}`
  }

  let _getAllPublishPackagesCount = allPublishPackages => {
    allPublishPackages->_groupAllPublishPackages->Meta3dCommonlib.ArraySt.length
  }

  let onChangeForSecond = (page, pageSize) => {
    setSecondPage(_ => page)
  }

  let onChangeForThird = (page, pageSize) => {
    setThirdPage(_ => page)
  }

  RescriptReactRouter.watchUrl(url => {
    switch url.path {
    | list{"PackageMarket"} =>
      setSelectPublishPackageEntryExtensionProtocol(_ =>
        Meta3dCommonlib.ImmutableHashMap.createEmpty()
      )
      setSelectPublishPackage(_ => Meta3dCommonlib.ImmutableHashMap.createEmpty())

      setPackageEntryExtensionProtocolItem(_ => None)
      setAllPublishPackages(_ => None)

      setShowType(_ => Second)
      setSecondPage(_ => 1)
      setThirdPage(_ => 1)
    | _ => ()
    }
  })->ignore

  React.useEffect1(() => {
    service.backend.getAllPublishPackageEntryExtensionProtocols(.
      FrontendUtils.MarketUtils.getLimitCount(),
      0,
    )
    // ->Meta3dBsMost.Most.flatMap(protocols => {
    //   service.backend.getAllPublishPackageProtocolConfigs()->Meta3dBsMost.Most.map(
    //     protocolConfigs => {
    //       (
    //         protocols->Meta3dCommonlib.ArraySt.filter(
    //           ({name}: FrontendUtils.BackendCloudbaseType.protocol) =>
    //             name->FrontendUtils.MarketUtils.isNotInnerProtocol,
    //         ),
    //         protocolConfigs->Meta3dCommonlib.ArraySt.filter(
    //           ({name}: FrontendUtils.CommonType.protocolConfig) =>
    //             name->FrontendUtils.MarketUtils.isNotInnerProtocol,
    //         ),
    //       )
    //     },
    //     _,
    //   )
    // }, _)
    // ->Meta3dBsMost.Most.observe(((protocols, protocolConfigs)) => {
    ->Meta3dBsMost.Most.observe(
      protocols => {
        setAllPublishPackageEntryExtensionProtocols(_ => protocols)

        setIsLoaded(_ => true)
      },
      //   setAllPublishPackageProtocolConfigs(_ => protocolConfigs)

      _,
    )
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
      <Nav currentKey="4" />
    </Layout.Header>
    <Layout.Content>
      {!isLoaded
        ? <p> {React.string(`loading...`)} </p>
        : {
            switch packageEntryExtensionProtocolItem {
            | Some(item: FrontendUtils.BackendCloudbaseType.protocol) =>
              let (protocolName, protocolVersion) = (item.name, item.version)

              switch allPublishPackages {
              | Some(allPublishPackages) =>
                <>
                  {isDownloadBegin
                    ? <p>
                        {React.string({j`${downloadProgress->Js.Int.toString}% downloading...`})}
                      </p>
                    : React.null}
                  <List
                    itemLayout=#horizontal
                    dataSource={FrontendUtils.MarketUtils.getCurrentPage(
                      allPublishPackages->_groupAllPublishPackages,
                      thirdPage,
                      FrontendUtils.MarketUtils.getPageSize(),
                    )}
                    renderItem={(
                      items: array<FrontendUtils.BackendCloudbaseType.packageImplementInfo>,
                    ) => {
                      let firstItem =
                        items->Meta3dCommonlib.ArraySt.getFirst->Meta3dCommonlib.OptionSt.getExn

                      let item =
                        selectPublishPackage
                        ->Meta3dCommonlib.ImmutableHashMap.get(firstItem.name)
                        ->Meta3dCommonlib.OptionSt.getWithDefault(firstItem)

                      <List.Item>
                        <List.Item.Meta
                          key={item.name}
                          title={<Typography.Title level=3>
                            {React.string(item.name)}
                          </Typography.Title>}
                          description={UIDescriptionUtils.buildWithoutRepoLink(
                            item.account,
                            item.description,
                          )}
                        />
                        {FrontendUtils.SelectUtils.buildSelectWithoutEmpty(
                          version =>
                            setSelectPublishPackage(value =>
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
                        {FrontendUtils.MarketUtils.isSelect(
                          ({id}: UserCenterStore.packageData) => id,
                          item.id,
                          selectedPackages,
                        )
                          ? <Button
                              onClick={_ => {
                                dispatch(
                                  AppStore.UserCenterAction(
                                    UserCenterStore.NotSelectPackage(item.id),
                                  ),
                                )
                              }}>
                              {React.string(`取消选择`)}
                            </Button>
                          : <Button
                              onClick={_ => {
                                setIsDownloadBegin(_ => true)

                                service.backend.findPublishPackage(.
                                  progress => setDownloadProgress(_ => progress),
                                  // item.entryExtensionProtocolName,
                                  // item.entryExtensionProtocolVersion,
                                  // item.entryExtensionProtocolIconBase64,
                                  item.account,
                                  // item.entryExtensionName,
                                  item.name,
                                  item.version,
                                )
                                ->Meta3dBsMost.Most.observe(
                                  file => {
                                    Meta3dCommonlib.NullableSt.isNullable(file)
                                      ? {
                                          setIsDownloadBegin(_ => false)

                                          FrontendUtils.ErrorUtils.error(
                                            {j`找不到package file`},
                                            None,
                                          )->Obj.magic
                                        }
                                      : {
                                          setIsDownloadBegin(_ => false)

                                          dispatch(
                                            AppStore.UserCenterAction(
                                              UserCenterStore.SelectPackage({
                                                id: item.id,
                                                protocol: {
                                                  name: item.entryExtensionProtocolName,
                                                  version: item.entryExtensionProtocolVersionRange,
                                                  iconBase64: item.entryExtensionProtocolIconBase64,
                                                },
                                                entryExtensionName: item.entryExtensionName,
                                                version: item.version,
                                                name: item.name,
                                                binaryFile: file->Meta3dCommonlib.NullableSt.getExn,
                                              }),
                                            ),
                                          )
                                        }
                                  },
                                  //   data: Meta3d.Main.loadPackage(
                                  //     file->Meta3dCommonlib.NullableSt.getExn,
                                  //   ),
                                  //   version: item.version,
                                  //   account: item.account,

                                  // allPublishPackageProtocolConfigs->Meta3dCommonlib.ArraySt.find(
                                  //   (
                                  //     {
                                  //       name,
                                  //       version,
                                  //     }: FrontendUtils.CommonType.protocolConfig,
                                  //   ) => {
                                  //     name === protocolName && version === protocolVersion
                                  //   },
                                  // ),

                                  _,
                                )
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
                        <Button
                          onClick={_ => {
                            setIsDownloadBegin(_ => true)

                            service.backend.findPublishPackage(.
                              progress => setDownloadProgress(_ => progress),
                              item.account,
                              item.name,
                              item.version,
                            )
                            ->Meta3dBsMost.Most.observe(file => {
                              Meta3dCommonlib.NullableSt.isNullable(file)
                                ? {
                                    setIsDownloadBegin(_ => false)

                                    FrontendUtils.ErrorUtils.error(
                                      {j`找不到package file`},
                                      None,
                                    )->Obj.magic
                                  }
                                : {
                                    setIsDownloadBegin(_ => false)

                                    DownloadUtils.createAndDownloadBlobFile(
                                      file->Meta3dCommonlib.NullableSt.getExn,
                                      _buildPackageFileName(item.name, item.version),
                                      "package",
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
                          {React.string(`下载`)}
                        </Button>
                      </List.Item>
                    }}
                  />
                </>
              | None =>
                setIsLoaded(_ => false)

                service.backend.getAllPublishPackageInfos(.
                  FrontendUtils.MarketUtils.getLimitCount(),
                  0,
                  item.name,
                  item.version,
                )
                ->Meta3dBsMost.Most.observe(data => {
                  setAllPublishPackages(_ => data->Some)
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
                  allPublishPackageEntryExtensionProtocols->FrontendUtils.MarketUtils.groupAllPublishProtocols,
                  secondPage,
                  FrontendUtils.MarketUtils.getPageSize(),
                )}
                renderItem={(items: array<FrontendUtils.BackendCloudbaseType.protocol>) => {
                  let firstItem =
                    items->Meta3dCommonlib.ArraySt.getFirst->Meta3dCommonlib.OptionSt.getExn

                  let item =
                    selectPublishPackageEntryExtensionProtocol
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
                          setPackageEntryExtensionProtocolItem(_ => item->Some)
                        }}
                      />}
                      title={<Typography.Title
                        level=3
                        onClick={_ => {
                          setShowType(_ => Third)

                          setPackageEntryExtensionProtocolItem(_ => item->Some)
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
                        setSelectPublishPackageEntryExtensionProtocol(value =>
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
            total={FrontendUtils.MarketUtils.getAllProtocolsCount(
              allPublishPackageEntryExtensionProtocols,
            )}
            onChange=onChangeForSecond
          />
        | Third =>
          switch allPublishPackages {
          | Some(allPublishPackages) =>
            <Pagination
              defaultCurrent={1}
              defaultPageSize={FrontendUtils.MarketUtils.getPageSize()}
              total={_getAllPublishPackagesCount(allPublishPackages)}
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

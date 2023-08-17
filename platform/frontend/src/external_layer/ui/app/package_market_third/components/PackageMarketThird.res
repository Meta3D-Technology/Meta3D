open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

type showType =
  | Second
  | Third

@react.component
let make = (
  ~service: FrontendUtils.FrontendType.service,
  ~packageEntryExtensionProtocolItem: FrontendUtils.BackendCloudbaseType.protocol,
) => {
  let dispatch = AppStore.useDispatch()
  let {selectedPackages} = AppStore.useSelector(({userCenterState}: AppStore.state) =>
    userCenterState
  )

  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (page, setPage) = React.useState(_ => 1)
  let (allPublishPackages, setAllPublishPackages) = React.useState(_ => [])

  let (backendProgress, setBackendProgress) = React.useState(_ => 0)
  let (isBackendBegin, setIsBackendBegin) = React.useState(_ => false)

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

  let _onChange = (page, pageSize) => {
    setPage(_ => page)
  }

  React.useEffect1(() => {
    service.backend.getAllPublishPackageInfos(.
      FrontendUtils.MarketUtils.getLimitCount(),
      0,
      packageEntryExtensionProtocolItem.name,
      packageEntryExtensionProtocolItem.version,
    )
    ->Meta3dBsMost.Most.observe(data => {
      setAllPublishPackages(_ => data)
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
            <>
              {isBackendBegin
                ? <p> {React.string({j`${backendProgress->Js.Int.toString}% backending...`})} </p>
                : React.null}
              <List
                itemLayout=#horizontal
                dataSource={FrontendUtils.MarketUtils.getCurrentPage(
                  allPublishPackages->_groupAllPublishPackages,
                  page,
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
                              AppStore.UserCenterAction(UserCenterStore.NotSelectPackage(item.id)),
                            )
                          }}>
                          {React.string(`取消选择`)}
                        </Button>
                      : <Button
                          onClick={_ => {
                            setIsBackendBegin(_ => true)

                            service.backend.findPublishPackage(.
                              progress => setBackendProgress(_ => progress),
                              FrontendUtils.MarketUtils.getLimitCount(),
                              0,
                              // item.entryExtensionProtocolName,
                              // item.entryExtensionProtocolVersion,
                              // item.entryExtensionProtocolIconBase64,
                              item.account,
                              // item.entryExtensionName,
                              item.name,
                              item.version,
                            )
                            ->Meta3dBsMost.Most.observe(file => {
                              Meta3dCommonlib.NullableSt.isNullable(file)
                                ? {
                                    setIsBackendBegin(_ => false)

                                    FrontendUtils.ErrorUtils.error(
                                      {j`找不到package file`},
                                      None,
                                    )->Obj.magic
                                  }
                                : {
                                    setIsBackendBegin(_ => false)

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
                            }, _)
                            ->Js.Promise.catch(e => {
                              setIsBackendBegin(_ => false)

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
                        setIsBackendBegin(_ => true)

                        service.backend.findPublishPackage(.
                          progress => setBackendProgress(_ => progress),
                          FrontendUtils.MarketUtils.getLimitCount(),
                          0,
                          item.account,
                          item.name,
                          item.version,
                        )
                        ->Meta3dBsMost.Most.observe(file => {
                          Meta3dCommonlib.NullableSt.isNullable(file)
                            ? {
                                setIsBackendBegin(_ => false)

                                FrontendUtils.ErrorUtils.error(
                                  {j`找不到package file`},
                                  None,
                                )->Obj.magic
                              }
                            : {
                                setIsBackendBegin(_ => false)

                                DownloadUtils.createAndDownloadBlobFile(
                                  file->Meta3dCommonlib.NullableSt.getExn,
                                  _buildPackageFileName(item.name, item.version),
                                  "package",
                                )
                              }
                        }, _)
                        ->Js.Promise.catch(e => {
                          setIsBackendBegin(_ => false)

                          FrontendUtils.ErrorUtils.errorWithExn(
                            e->FrontendUtils.Error.promiseErrorToExn,
                            None,
                          )->Obj.magic
                        }, _)
                        ->ignore
                      }}>
                      {React.string(`下载`)}
                    </Button>
                    <Button
                      onClick={_ => {
                        setIsBackendBegin(_ => true)

                        service.backend.findPublishPackage(.
                          progress => setBackendProgress(_ => progress),
                          FrontendUtils.MarketUtils.getLimitCount(),
                          0,
                          item.account,
                          item.name,
                          item.version,
                        )
                        ->Meta3dBsMost.Most.flatMap(file => {
                          Meta3dCommonlib.NullableSt.isNullable(file)
                            ? {
                                setIsBackendBegin(_ => false)

                                FrontendUtils.ErrorUtils.error(
                                  {j`找不到package file`},
                                  None,
                                )->Obj.magic

                                Meta3dBsMost.Most.empty()->Obj.magic
                              }
                            : {
                                Meta3d.Main.getAllExtensionAndContributeFileDataOfPackage(
                                  file->Meta3dCommonlib.NullableSt.getExn,
                                )->Meta3dBsMost.Most.just
                              }
                        }, _)
                        ->Meta3dBsMost.Most.flatMap(
                          ((allExtensionFileData, allContributeFileData)) => {
                            let extensionProtocolNames =
                              allExtensionFileData->Meta3dCommonlib.ArraySt.map(((
                                extensionPackageData: Meta3d.AppAndPackageFileType.extensionPackageData,
                                _,
                              )) => {
                                extensionPackageData.protocol.name
                              })
                            let contributeProtocolNames =
                              allContributeFileData->Meta3dCommonlib.ArraySt.map(((
                                contributePackageData: Meta3d.AppAndPackageFileType.contributePackageData,
                                _,
                              )) => {
                                contributePackageData.protocol.name
                              })

                            MostUtils.concatArray([
                              service.backend.batchFindPublishExtensionProtocols(.
                                extensionProtocolNames,
                              ),
                              service.backend.batchFindPublishExtensionProtocolConfigs(.
                                extensionProtocolNames,
                              )->Obj.magic,
                              service.backend.batchFindPublishContributeProtocols(.
                                contributeProtocolNames,
                              ),
                              service.backend.batchFindPublishContributeProtocolConfigs(.
                                contributeProtocolNames,
                              )->Obj.magic,
                            ])
                            ->Meta3dBsMost.Most.reduce((arr, data) => {
                              arr->Meta3dCommonlib.ArraySt.push(data)
                            }, [
                              allExtensionFileData->Obj.magic,
                              allContributeFileData->Obj.magic,
                            ], _)
                            ->Meta3dBsMost.Most.fromPromise
                          },
                          // (
                          //   extensionPackageData.protocol.name,
                          //   extensionPackageData.protocol.version->Meta3d.Semver.minVersion,
                          // )

                          // (
                          //   contributePackageData.protocol.name,
                          //   contributePackageData.protocol.version->Meta3d.Semver.minVersion,
                          // )

                          // service.backend.batchFindPublishExtensionProtocols(.
                          //   extensionProtocolNames,
                          // ) ->Meta3dBsMost.Most.flatMap(extensionProtocols =>{
                          // service.backend.batchFindPublishExtensionProtocolConfigs(.
                          //   extensionProtocolNames,
                          // ) ->Meta3dBsMost.Most.flatMap(extensionProtocolConfigs =>{

                          // }, _)

                          // }, _)

                          _,
                        )
                        ->Meta3dBsMost.Most.tap(arr => {
                          let (
                            allExtensionFileData: array<(
                              Meta3d.AppAndPackageFileType.extensionPackageData,
                              Meta3d.ExtensionFileType.extensionFuncData,
                            )>,
                            allContributeFileData: array<(
                              Meta3d.AppAndPackageFileType.contributePackageData,
                              Meta3d.ExtensionFileType.contributeFuncData,
                            )>,
                            extensionProtocols: FrontendUtils.BackendCloudbaseType.protocols,
                            extensionProtocolConfigs: FrontendUtils.BackendCloudbaseType.protocolConfigs,
                            contributeProtocols: FrontendUtils.BackendCloudbaseType.protocols,
                            contributeProtocolConfigs: FrontendUtils.BackendCloudbaseType.protocolConfigs,
                          ) =
                            arr->Obj.magic

                          let selectedExtensions =
                            allExtensionFileData
                            ->Meta3dCommonlib.ArraySt.map(data => {
                              let (extensionPackageData, extensionFuncData) = data

                              let extensionProtocol =
                                extensionProtocols
                                ->Meta3dCommonlib.ArraySt.filter(
                                  extensionProtocol => {
                                    extensionProtocol.name == extensionPackageData.protocol.name &&
                                      Meta3d.Semver.satisfies(
                                        extensionProtocol.version,
                                        extensionPackageData.protocol.version,
                                      )
                                  },
                                )
                                ->Meta3dCommonlib.ArraySt.getFirst
                                ->Meta3dCommonlib.OptionSt.getExn

                              let extensionProtocolConfig =
                                extensionProtocolConfigs
                                ->Meta3dCommonlib.ArraySt.filter(
                                  extensionProtocolConfig => {
                                    extensionProtocolConfig.name ==
                                      extensionPackageData.protocol.name &&
                                      Meta3d.Semver.satisfies(
                                        extensionProtocolConfig.version,
                                        extensionPackageData.protocol.version,
                                      )
                                  },
                                )
                                ->Meta3dCommonlib.ArraySt.getFirst

                              (
                                (
                                  {
                                    id: FrontendUtils.IdUtils.generateId(Js.Math.random),
                                    protocolName: extensionProtocol.name,
                                    protocolVersion: extensionProtocol.version,
                                    protocolIconBase64: extensionProtocol.iconBase64,
                                    data: (
                                      {
                                        extensionPackageData: {
                                          name: extensionPackageData.name,
                                          version: extensionPackageData.version,
                                          account: extensionPackageData.account,
                                          protocol: extensionPackageData.protocol,
                                          displayName: extensionPackageData.displayName,
                                          repoLink: extensionPackageData.repoLink,
                                          description: extensionPackageData.description,
                                          dependentBlockProtocolNameMap: extensionPackageData.dependentBlockProtocolNameMap,
                                        },
                                        extensionFuncData,
                                      }: Meta3d.ExtensionFileType.extensionFileData
                                    ),
                                    version: extensionPackageData.version,
                                    account: extensionPackageData.account,
                                  }: FrontendUtils.AssembleSpaceCommonType.extension
                                ),
                                extensionProtocolConfig,
                              )
                            })
                            ->Meta3dCommonlib.ListSt.fromArray
                          let selectedContributes =
                            allContributeFileData
                            ->Meta3dCommonlib.ArraySt.map(data => {
                              let (contributePackageData, contributeFuncData) = data

                              let contributeProtocol =
                                contributeProtocols
                                ->Meta3dCommonlib.ArraySt.filter(
                                  contributeProtocol => {
                                    contributeProtocol.name ==
                                      contributePackageData.protocol.name &&
                                      Meta3d.Semver.satisfies(
                                        contributeProtocol.version,
                                        contributePackageData.protocol.version,
                                      )
                                  },
                                )
                                ->Meta3dCommonlib.ArraySt.getFirst
                                ->Meta3dCommonlib.OptionSt.getExn

                              let contributeProtocolConfig =
                                contributeProtocolConfigs
                                ->Meta3dCommonlib.ArraySt.filter(
                                  contributeProtocolConfig => {
                                    contributeProtocolConfig.name ==
                                      contributePackageData.protocol.name &&
                                      Meta3d.Semver.satisfies(
                                        contributeProtocolConfig.version,
                                        contributePackageData.protocol.version,
                                      )
                                  },
                                )
                                ->Meta3dCommonlib.ArraySt.getFirst

                              (
                                (
                                  {
                                    id: FrontendUtils.IdUtils.generateId(Js.Math.random),
                                    protocolName: contributeProtocol.name,
                                    protocolVersion: contributeProtocol.version,
                                    protocolIconBase64: contributeProtocol.iconBase64,
                                    data: (
                                      {
                                        contributePackageData: {
                                          name: contributePackageData.name,
                                          version: contributePackageData.version,
                                          account: contributePackageData.account,
                                          protocol: contributePackageData.protocol,
                                          displayName: contributePackageData.displayName,
                                          repoLink: contributePackageData.repoLink,
                                          description: contributePackageData.description,
                                          dependentBlockProtocolNameMap: contributePackageData.dependentBlockProtocolNameMap,
                                        },
                                        contributeFuncData,
                                      }: Meta3d.ExtensionFileType.contributeFileData
                                    ),
                                    version: contributePackageData.version,
                                    account: contributePackageData.account,
                                  }: FrontendUtils.AssembleSpaceCommonType.contribute
                                ),
                                contributeProtocolConfig,
                              )
                            })
                            ->Meta3dCommonlib.ListSt.fromArray

                          setIsBackendBegin(_ => false)

                          dispatch(
                            AppStore.UserCenterAction(
                              UserCenterStore.ImportPackage(
                                selectedExtensions,
                                selectedContributes,
                              ),
                            ),
                          )
                        }, _)
                        ->Meta3dBsMost.Most.drain
                        ->Js.Promise.catch(e => {
                          setIsBackendBegin(_ => false)

                          FrontendUtils.ErrorUtils.errorWithExn(
                            e->FrontendUtils.Error.promiseErrorToExn,
                            None,
                          )->Obj.magic
                        }, _)
                        ->ignore
                      }}>
                      {React.string(`导入`)}
                    </Button>
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
          total={_getAllPublishPackagesCount(allPublishPackages)}
          onChange=_onChange
        />
      | false => React.null
      }}
    </Layout.Footer>
  </Layout>
}

open Antd
%%raw("import 'antd/dist/reset.css'")

type showType =
  | Second
  | Third

@react.component
let make = (
  ~service: FrontendType.service,
  ~packageEntryExtensionProtocolItem: BackendCloudbaseType.protocol,
) => {
  let dispatch = AppStore.useDispatch()
  let {selectedPackages, importedPackageIds} = AppStore.useSelector((
    {userCenterState}: AppStoreType.state,
  ) => userCenterState)

  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (page, setPage) = React.useState(_ => 1)
  let (allPublishPackages, setAllPublishPackages) = React.useState(_ => [])

  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  let (isDownloadBegin, setIsDownloadBegin) = React.useState(_ => false)
  let (currentImportingKey, setCurrentImportingKey) = React.useState(_ => None)

  let (selectPublishPackage, setSelectPublishPackage) = React.useState(_ =>
    Meta3dCommonlib.ImmutableHashMap.createEmpty()
  )

  let _groupAllPublishPackages = (
    allPublishPackages: array<BackendCloudbaseType.packageImplementInfo>,
  ): array<array<BackendCloudbaseType.packageImplementInfo>> => {
    MarketUtils.groupAllPublishItems(
      (
        ({name}: BackendCloudbaseType.packageImplementInfo) => name,
        ({version}: BackendCloudbaseType.packageImplementInfo) => version,
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
      MarketUtils.getLimitCount(),
      0,
      packageEntryExtensionProtocolItem.name,
      packageEntryExtensionProtocolItem.version,
    )
    ->Meta3dBsMostDefault.Most.observe(data => {
      setAllPublishPackages(_ => data)
      setIsLoaded(_ => true)
    }, _)
    ->Js.Promise.catch(e => {
      setIsLoaded(_ => false)

      ErrorUtils.errorWithExn(e->Error.promiseErrorToExn, None)->Obj.magic
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
              <List
                itemLayout=#horizontal
                dataSource={MarketUtils.getCurrentPage(
                  allPublishPackages->_groupAllPublishPackages,
                  page,
                  MarketUtils.getPageSize(),
                )}
                renderItem={(items: array<BackendCloudbaseType.packageImplementInfo>) => {
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
                    {isDownloadBegin &&
                    currentImportingKey
                    ->Meta3dCommonlib.OptionSt.map(currentImportingKey =>
                      currentImportingKey == item.name
                    )
                    ->Meta3dCommonlib.OptionSt.getWithDefault(false)
                      ? <p>
                          {React.string({j`${downloadProgress->Js.Int.toString}% downloading...`})}
                        </p>
                      : React.null}
                    {SelectUtils.buildSelectWithoutEmpty(
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
                    {
                      //   MarketUtils.isSelect(
                      //   ({id}: UserCenterStoreType.packageData) => id,
                      //   item.id,
                      //   selectedPackages,
                      // )

                      MarketUtils.isSelect(
                        ({version, name}: UserCenterStoreType.packageData) => {
                          j`${version}_${name}`
                        },
                        {
                          j`${item.version}_${item.name}`
                        },
                        selectedPackages,
                      )
                        ? <Button
                            onClick={_ => {
                              dispatch(
                                AppStoreType.UserCenterAction(
                                  UserCenterStoreType.NotSelectPackage(item.name, item.version),
                                ),
                              )
                            }}>
                            {React.string(`取消选择`)}
                          </Button>
                        : <Button
                            onClick={_ => {
                              setIsDownloadBegin(_ => true)
                              setCurrentImportingKey(_ => item.name->Some)

                              service.backend.findPublishPackage(.
                                progress => setDownloadProgress(_ => progress),
                                MarketUtils.getLimitCount(),
                                0,
                                // item.entryExtensionProtocolName,
                                // item.entryExtensionProtocolVersion,
                                // item.entryExtensionProtocolIconBase64,
                                item.account,
                                // item.entryExtensionName,
                                item.name,
                                item.version,
                              )
                              ->Meta3dBsMostDefault.Most.observe(file => {
                                setIsDownloadBegin(_ => false)
                                setCurrentImportingKey(_ => None)

                                Meta3dCommonlib.NullableSt.isNullable(file)
                                  ? {
                                      ErrorUtils.error({j`找不到package file`}, None)->Obj.magic
                                    }
                                  : {
                                      dispatch(
                                        AppStoreType.UserCenterAction(
                                          UserCenterStoreType.SelectPackage({
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
                                            isStart: false,
                                            protocolConfigStr: switch item.entryExtensionProtocolConfigStr {
                                            | "" => None
                                            | value => Some(value)
                                            },
                                          }),
                                        ),
                                      )
                                    }
                              }, _)
                              ->Js.Promise.catch(e => {
                                setIsDownloadBegin(_ => false)
                                setCurrentImportingKey(_ => None)

                                ErrorUtils.errorWithExn(e->Error.promiseErrorToExn, None)->Obj.magic
                              }, _)
                              ->ignore
                            }}>
                            {React.string(`选择`)}
                          </Button>
                    }
                    <Button
                      onClick={_ => {
                        setIsDownloadBegin(_ => true)
                        setCurrentImportingKey(_ => item.name->Some)

                        service.backend.findPublishPackage(.
                          progress => setDownloadProgress(_ => progress),
                          MarketUtils.getLimitCount(),
                          0,
                          item.account,
                          item.name,
                          item.version,
                        )
                        ->Meta3dBsMostDefault.Most.observe(file => {
                          setIsDownloadBegin(_ => false)
                          setCurrentImportingKey(_ => None)
                          Meta3dCommonlib.NullableSt.isNullable(file)
                            ? {
                                ErrorUtils.error({j`找不到package file`}, None)->Obj.magic
                              }
                            : {
                                Meta3dFileUtils.DownloadUtils.createAndDownloadBlobFile(
                                  file->Meta3dCommonlib.NullableSt.getExn,
                                  _buildPackageFileName(item.name, item.version),
                                  "package",
                                )
                              }
                        }, _)
                        ->Js.Promise.catch(e => {
                          setIsDownloadBegin(_ => false)
                          setCurrentImportingKey(_ => None)

                          ErrorUtils.errorWithExn(e->Error.promiseErrorToExn, None)->Obj.magic
                        }, _)
                        ->ignore
                      }}>
                      {React.string(`下载`)}
                    </Button>
                    {MarketUtils.isSelect(id => id, item.id, importedPackageIds)
                      ? <Button disabled=true> {React.string(`已导入`)} </Button>
                      : <Button
                          onClick={_ => {
                            setIsDownloadBegin(_ => true)
                            setCurrentImportingKey(_ => item.name->Some)

                            service.backend.findPublishPackage(.
                              progress => setDownloadProgress(_ => progress),
                              MarketUtils.getLimitCount(),
                              0,
                              item.account,
                              item.name,
                              item.version,
                            )
                            ->Meta3dBsMostDefault.Most.flatMap(file => {
                              setIsDownloadBegin(_ => false)
                              setCurrentImportingKey(_ => None)

                              Meta3dCommonlib.NullableSt.isNullable(file)
                                ? {
                                    ErrorUtils.error({j`找不到package file`}, None)->Obj.magic

                                    Meta3dBsMostDefault.Most.empty()->Obj.magic
                                  }
                                : {
                                    Meta3d.Main.getAllDataOfPackage(
                                      file->Meta3dCommonlib.NullableSt.getExn,
                                    )->Meta3dBsMostDefault.Most.just
                                  }
                            }, _)
                            ->ImportUtils.importPackage(
                              (
                                service,
                                (
                                  () => {
                                    setIsDownloadBegin(_ => false)
                                    setCurrentImportingKey(_ => None)
                                  },
                                  (selectedExtensions, selectedContributes, selectedPackages) =>
                                    dispatch(
                                      AppStoreType.UserCenterAction(
                                        UserCenterStoreType.ImportPackage(
                                          item.id,
                                          selectedExtensions,
                                          selectedContributes,
                                          selectedPackages,
                                        ),
                                      ),
                                    ),
                                ),
                              ),
                              _,
                            )
                            ->Js.Promise.then_(() => {
                              dispatch(
                                AppStoreType.UserCenterAction(
                                  UserCenterStoreType.SetCurrentAppName(""),
                                ),
                              )
                              RescriptReactRouter.push("/AssembleSpace")

                              ()->Js.Promise.resolve
                            }, _)
                            ->ignore
                          }}>
                          {React.string(`导入`)}
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
          defaultPageSize={MarketUtils.getPageSize()}
          total={_getAllPublishPackagesCount(allPublishPackages)}
          showSizeChanger=false
          onChange=_onChange
        />
      | false => React.null
      }}
    </Layout.Footer>
  </Layout>
}

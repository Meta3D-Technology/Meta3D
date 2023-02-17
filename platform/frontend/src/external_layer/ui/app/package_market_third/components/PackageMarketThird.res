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

  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  let (isDownloadBegin, setIsDownloadBegin) = React.useState(_ => false)

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
              {isDownloadBegin
                ? <p> {React.string({j`${downloadProgress->Js.Int.toString}% downloading...`})} </p>
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
                            setIsDownloadBegin(_ => true)

                            service.backend.findPublishPackage(.
                              progress => setDownloadProgress(_ => progress),
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
                    <Button
                      onClick={_ => {
                        setIsDownloadBegin(_ => true)

                        service.backend.findPublishPackage(.
                          progress => setDownloadProgress(_ => progress),
                          FrontendUtils.MarketUtils.getLimitCount(),
                          0,
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
          }}
    </Layout.Content>
    <Layout.Footer>
      {switch isLoaded {
      | true =>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={FrontendUtils.MarketUtils.getPageSize()}
          total={_getAllPublishPackagesCount(allPublishPackages)}
          onChange=_onChange
        />
      | false => React.null
      }}
    </Layout.Footer>
  </Layout>
}

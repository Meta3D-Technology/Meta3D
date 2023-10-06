open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

// TODO check login

@react.component
let make = (~service: FrontendUtils.FrontendType.service) => {
  let dispatch = AppStore.useDispatch()

  let dispatchApAssembleStore = FrontendUtils.ReduxUtils.ApAssemble.useDispatch(() => {
    let dispatch = AppStore.useDispatch()

    assembleSpaceAction => {
      dispatch(FrontendUtils.AppStoreType.AssembleSpaceAction(assembleSpaceAction))
    }
  })

  // let {account} = AppStore.useSelector(({userCenterState}: FrontendUtils.AppStoreType.state) => userCenterState)
  let {importedAppIds} = AppStore.useSelector((
    {userCenterState}: FrontendUtils.AppStoreType.state,
  ) => userCenterState)

  let (refreshValue, refresh) = React.useState(_ => Js.Math.random())
  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (allPublishApps, setAllPublishApps) = React.useState(_ => [])
  let (page, setPage) = React.useState(_ => 1)
  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  let (isDownloadFinish, setIsDownloadFinish) = React.useState(_ => true)

  let _buildURL = (account: string, appName: string) =>
    j`EnterApp?account=${account}&appName=${appName}`

  let _openLink = url => {
    FrontendUtils.Window.\"open"(url, "_blank").focus()
  }

  // let _enterApp = (account: string, appName: string) => {
  //   dispatch(AppStore.EnterAppAction(EnterAppStore.EnterApp(account, appName)))

  //   RescriptReactRouter.push("/EnterApp")
  // }

  let _generateAppId = (account: string, appName: string) => {
    j`${account}_${appName}`
  }

  let onChange = (page, pageSize) => {
    setPage(_ => page)
  }

  RescriptReactRouter.watchUrl(url => {
    switch url.path {
    | list{"ShowPublishedApps"} =>
      setAllPublishApps(_ => [])
      setIsLoaded(_ => false)
      refresh(_ => Js.Math.random())

      setPage(_ => 1)
    | _ => ()
    }
  })->ignore

  React.useEffect1(() => {
    service.backend.findAllPublishApps(. FrontendUtils.MarketUtils.getLimitCount(), 0)
    ->Meta3dBsMost.Most.observe(allPublishApps => {
      Js.log(allPublishApps)
      setAllPublishApps(_ => allPublishApps)
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
  }, [refreshValue])

  <Layout>
    <Layout.Header>
      <Nav currentKey="5" />
    </Layout.Header>
    <Layout.Content>
      {!isLoaded
        ? <p> {React.string(`loading...`)} </p>
        : <>
            {!isDownloadFinish
              ? <p> {React.string({j`${downloadProgress->Js.Int.toString}% downloading...`})} </p>
              : React.null}
            <List
              itemLayout=#horizontal
              dataSource={FrontendUtils.MarketUtils.getCurrentPage(
                allPublishApps,
                page,
                FrontendUtils.MarketUtils.getPageSize(),
              )}
              renderItem={(item: FrontendUtils.BackendCloudbaseType.publishAppInfo) =>
                <List.Item>
                  <List.Item.Meta
                    key={j`${item.account}_${item.appName}`}
                    title={<Typography.Title level=3>
                      {React.string(item.appName)}
                    </Typography.Title>}
                    description={UIDescriptionUtils.buildWithoutRepoLink(
                      item.account,
                      item.description,
                    )}
                  />
                  <Button
                    onClick={_ => {
                      _openLink(_buildURL(item.account, item.appName))
                    }}>
                    {React.string(`运行`)}
                  </Button>
                  {FrontendUtils.MarketUtils.isSelect(
                    id => id,
                    _generateAppId(item.account, item.appName),
                    importedAppIds,
                  )
                    ? <Button disabled=true> {React.string(`已导入`)} </Button>
                    : <Button
                        onClick={_ => {
                          setIsDownloadFinish(_ => false)

                          service.backend.findPublishApp(.
                            progress => setDownloadProgress(_ => progress),
                            item.account,
                            item.appName,
                          )
                          ->Meta3dBsMost.Most.flatMap(file => {
                            Meta3dCommonlib.NullableSt.isNullable(file)
                              ? {
                                  setIsDownloadFinish(_ => true)

                                  FrontendUtils.ErrorUtils.error(
                                    {
                                      j`account: ${item.account} appName: ${item.appName} has no published app`
                                    },
                                    None,
                                  )->Obj.magic

                                  Meta3dBsMost.Most.empty()->Obj.magic
                                }
                              : {
                                  Meta3d.Main.getAllPackageAndExtensionAndContributeFileDataOfApp(
                                    file->Meta3dCommonlib.NullableSt.getExn,
                                  )->Meta3dBsMost.Most.just
                                }
                          }, _)
                          ->ImportUtils.importApp(
                            (
                              service,
                              (
                                () => {
                                  setIsDownloadFinish(_ => true)
                                },
                                (selectedExtensions, selectedContributes, selectedPackages) =>
                                  dispatch(
                                    FrontendUtils.AppStoreType.UserCenterAction(
                                      FrontendUtils.UserCenterStoreType.ImportApp(
                                        _generateAppId(item.account, item.appName),
                                        selectedExtensions,
                                        selectedContributes,
                                        selectedPackages,
                                      ),
                                    ),
                                  ),
                                packageIds =>
                                  dispatchApAssembleStore(
                                    FrontendUtils.ApAssembleStoreType.BatchStorePackagesInApp(
                                      packageIds,
                                    ),
                                  ),
                              ),
                            ),
                            _,
                          )
                        }}>
                        {React.string(`导入`)}
                      </Button>}
                </List.Item>}
            />
          </>}
    </Layout.Content>
    <Layout.Footer>
      {switch isLoaded {
      | true =>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={FrontendUtils.MarketUtils.getPageSize()}
          total={allPublishApps->Meta3dCommonlib.ArraySt.length}
          onChange
        />
      | false => React.null
      }}
    </Layout.Footer>
  </Layout>
}

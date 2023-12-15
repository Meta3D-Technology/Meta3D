open Antd
%%raw("import 'antd/dist/antd.css'")

@react.component
let make = (~service: FrontendType.service, ~account) => {
  let dispatch = AppStore.useDispatch()
  let dispatchForApAssembleStore = ReduxUtils.ApAssemble.useDispatch(
    ReactUtils.useDispatchForAssembleSpaceStore,
  )
  let dispatchForElementAssembleStore = ReduxUtils.ElementAssemble.useDispatch(
    ReactUtils.useDispatchForAssembleSpaceStore,
  )

  // let dispatchApAssembleStore = ReduxUtils.ApAssemble.useDispatch(() => {
  //   let dispatch = AppStore.useDispatch()

  //   assembleSpaceAction => {
  //     dispatch(AppStoreType.AssembleSpaceAction(assembleSpaceAction))
  //   }
  // })

  // let {account} = AppStore.useSelector(({userCenterState}: AppStoreType.state) => userCenterState)
  // let {importedAppIds} = AppStore.useSelector(({userCenterState}: AppStoreType.state) =>
  //   userCenterState
  // )

  let (refreshValue, refresh) = React.useState(_ => Js.Math.random())
  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (allPublishApps, setAllPublishApps) = React.useState(_ => [])
  let (page, setPage) = React.useState(_ => 1)
  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  let (isDownloadFinish, setIsDownloadFinish) = React.useState(_ => true)
  let (currentImportingKey, setCurrentImportingKey) = React.useState(_ => None)

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
    service.backend.findAllPublishApps(. MarketUtils.getLimitCount(), 0)
    ->Meta3dBsMostDefault.Most.observe(allPublishApps => {
      setAllPublishApps(_ => allPublishApps)
      setIsLoaded(_ => true)
    }, _)
    ->Js.Promise.catch(e => {
      setIsLoaded(_ => false)

      ErrorUtils.errorWithExn(e->Error.promiseErrorToExn, None)->Obj.magic
    }, _)
    ->ignore

    None
  }, [refreshValue])

  <Layout>
    <Layout.Header>
      <Nav currentKey="2" account={account} />
    </Layout.Header>
    <Layout.Content>
      {!isLoaded
        ? <p> {React.string(`loading...`)} </p>
        : <>
            <List
              itemLayout=#horizontal
              dataSource={MarketUtils.getCurrentPage(
                allPublishApps,
                page,
                MarketUtils.getPageSize(),
              )}
              renderItem={(item: BackendCloudbaseType.publishAppInfo) =>
                <List.Item>
                  <List.Item.Meta
                    key={PublishedAppUtils.buildKey(item.account, item.appName)}
                    title={<Typography.Title level=3>
                      {React.string(item.appName)}
                    </Typography.Title>}
                    description={UIDescriptionUtils.buildWithoutRepoLink(
                      item.account,
                      item.description,
                    )}
                  />
                  {!isDownloadFinish &&
                  currentImportingKey
                  ->Meta3dCommonlib.OptionSt.map(currentImportingKey =>
                    currentImportingKey == PublishedAppUtils.buildKey(item.account, item.appName)
                  )
                  ->Meta3dCommonlib.OptionSt.getWithDefault(false)
                    ? <p>
                        {React.string({
                          j`${downloadProgress->Js.Int.toString}% downloading...`
                        })}
                      </p>
                    : React.null}
                  <Button
                    onClick={_ => {
                      PublishedAppUtils.openLink(
                        PublishedAppUtils.buildURL(item.account, item.appName),
                      )
                    }}>
                    {React.string(`运行`)}
                  </Button>
                  // {MarketUtils.isSelect(
                  //   id => id,
                  //   _generateAppId(item.account, item.appName),
                  //   importedAppIds,
                  // )
                  //   ? <Button disabled=true> {React.string(`已导入`)} </Button>
                  //   :
                  <Button
                    onClick={_ => {
                      LoginUtils.judgeToJumpToLogin(() => {
                        setIsDownloadFinish(_ => false)
                        setCurrentImportingKey(_ =>
                          PublishedAppUtils.buildKey(item.account, item.appName)->Some
                        )

                        PublishedAppUtils.importApp(
                          service,
                          (dispatch, dispatchForApAssembleStore, dispatchForElementAssembleStore),
                          (
                            setDownloadProgress,
                            () => {
                              setIsDownloadFinish(_ => true)
                              setCurrentImportingKey(_ => None)
                            },
                          ),
                          item,
                        )
                      }, account)
                    }}>
                    {React.string(`导入`)}
                  </Button>
                  // }
                </List.Item>}
            />
          </>}
    </Layout.Content>
    <Layout.Footer>
      {switch isLoaded {
      | true =>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={MarketUtils.getPageSize()}
          total={allPublishApps->Meta3dCommonlib.ArraySt.length}
          showSizeChanger=false
          onChange
        />
      | false => React.null
      }}
    </Layout.Footer>
  </Layout>
}

open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

// TODO check login

@react.component
let make = (~service: FrontendUtils.FrontendType.service) => {
  let dispatch = AppStore.useDispatch()

  // let {account} = AppStore.useSelector(({userCenterState}: AppStore.state) => userCenterState)

  let (refreshValue, refresh) = React.useState(_ => Js.Math.random())
  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (allPublishApps, setAllPublishApps) = React.useState(_ => [])
  let (page, setPage) = React.useState(_ => 1)

  let _buildURL = (account: string, appName: string) =>
    j`EnterApp?account=${account}&appName=${appName}`

  let _openLink = url => {
    FrontendUtils.Window.\"open"(url, "_blank").focus()
  }

  // let _enterApp = (account: string, appName: string) => {
  //   dispatch(AppStore.EnterAppAction(EnterAppStore.EnterApp(account, appName)))

  //   RescriptReactRouter.push("/EnterApp")
  // }

  let onChange = (page, pageSize) => {
    setPage(_ => page)
  }

  let _getCurrentPageOfAllPublishApps = (allPublishApps, page, pageSize) => {
    allPublishApps->Meta3dCommonlib.ArraySt.slice((page - 1) * pageSize, page * pageSize)
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
        : <List
            itemLayout=#horizontal
            dataSource={_getCurrentPageOfAllPublishApps(
              allPublishApps,
              page,
              MarketUtils.getPageSize(),
            )}
            renderItem={(item: FrontendUtils.BackendCloudbaseType.publishAppInfo) =>
              <List.Item>
                <List.Item.Meta
                  key={j`${item.account}_${item.appName}`}
                  title={<Typography.Title
                    level=3
                    onClick={_ => {
                      _openLink(_buildURL(item.account, item.appName))
                    }}>
                    {React.string(item.appName)}
                  </Typography.Title>}
                  description={UIDescriptionUtils.buildWithoutRepoLink(
                    item.account,
                    item.description,
                  )}
                />
              </List.Item>}
          />}
    </Layout.Content>
    <Layout.Footer>
      {switch isLoaded {
      | true =>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={MarketUtils.getPageSize()}
          total={allPublishApps->Meta3dCommonlib.ArraySt.length}
          onChange
        />
      | false => React.null
      }}
    </Layout.Footer>
  </Layout>
}

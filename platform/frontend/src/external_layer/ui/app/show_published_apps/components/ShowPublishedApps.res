open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

// TODO check login

@react.component
let make = () => {
  let {username} = AppStore.useSelector(({userCenterState}: AppStore.state) => userCenterState)

  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (allPublishApps, setAllPublishApps) = React.useState(_ => [])

  let _buildURL = (username: string, appName: string) =>
    j`EnterApp?username=${username}&appName=${appName}`

  let _openLink = url => {
    Window.\"open"(url, "_blank").focus()
  }

  React.useEffect1(() => {
    BackendCloudbase.findAllPublishApps(. username->Meta3dCommonlib.OptionSt.getExn)
    ->Meta3dBsMost.Most.observe(allPublishApps => {
      setAllPublishApps(_ => allPublishApps)
      setIsLoaded(_ => true)
    }, _)
    ->Js.Promise.catch(e => {
      setIsLoaded(_ => false)

      FrontendUtils.ErrorUtils.error(e->Obj.magic, None)->Obj.magic
    }, _)
    ->ignore

    None
  }, [])

  <>
    <Nav />
    {!isLoaded
      ? <p> {React.string(`loading...`)} </p>
      : <List
          itemLayout=#horizontal
          dataSource={allPublishApps}
          renderItem={(item: FrontendUtils.BackendCloudbaseType.publishAppData) =>
            <List.Item>
              <List.Item.Meta
                key={j`${item.username}_${item.appName}`}
                title={<span
                  onClick={_ => {
                    _openLink(_buildURL(item.username, item.appName))
                  }}>
                  {React.string(item.appName)}
                </span>}
              />
            </List.Item>}
        />}
  </>
}

open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

@react.component
let make = () => {
  let {account} = AppStore.useSelector(({userCenterState}: FrontendUtils.AppStoreType.state) => userCenterState)

  let _isNotLogin = account => {
    !(account->Meta3dCommonlib.OptionSt.isSome)
  }

  React.useEffect0(() => {
    _isNotLogin(account)
      ? {
          RescriptReactRouter.push("/Login")
        }
      : ()

    None
  })

  <Layout>
    <Layout.Header>
      <Nav currentKey="1" />
    </Layout.Header>
    <Layout.Content>
      <Typography.Title>
        {React.string({
          j`欢迎使用Meta3D内测版 v${FrontendUtils.VersionConfig.getPlatformVersion()}`
        })}
      </Typography.Title>
      <Typography.Paragraph>
        <Typography.Text>
          {switch account {
          | Some(account) => React.string({j`Account：${account}`})
          | None => React.string(``)
          }}
        </Typography.Text>
      </Typography.Paragraph>
    </Layout.Content>
  </Layout>
}

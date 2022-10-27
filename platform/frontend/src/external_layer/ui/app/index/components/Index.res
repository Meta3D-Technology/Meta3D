@react.component
let make = () => {
  let {account} = AppStore.useSelector(({userCenterState}: AppStore.state) => userCenterState)

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

  <>
    <Nav />
    <h1>
      {React.string({
        j`欢迎使用Meta3D内测版 v${FrontendUtils.VersionConfig.getPlatformVersion()}`
      })}
    </h1>
    {switch account {
    | Some(account) => <span> {React.string({j`Account：${account}`})} </span>
    | None => React.null
    }}
  </>
}

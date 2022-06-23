@react.component
let make = () => {
  let {username} = AppStore.useSelector(({userCenterState}: AppStore.state) => userCenterState)

  let _isNotLogin = username => {
    !(username->Meta3dCommonlib.OptionSt.isSome)
  }

  React.useEffect0(() => {
    _isNotLogin(username)
      ? {
          RescriptReactRouter.push("/Login")
        }
      : ()

    None
  })

  <>
    <Nav />
    <h1> {React.string(`欢迎使用Meta3D内测版！`)} </h1>
    {switch username {
    | Some(username) => <span> {React.string({j`用户名：${username}`})} </span>
    | None => React.null
    }}

    // <span> {React.string({j`用户名：${username->Meta3dCommonlib.OptionSt.getExn}`})} </span>
  </>
}

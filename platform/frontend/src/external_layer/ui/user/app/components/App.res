@react.component
let make = () => {
  let url = RescriptReactRouter.useUrl()

  // let {username} = AppStore.useSelector(({userCenterState}: AppStore.state) => userCenterState)

  // let _isNotLogin = username => {
  //   !(username->Meta3dCommonlib.OptionSt.isSome)
  // }

  // React.useEffect0(() => {
  //   _isNotLogin(username)
  //     ? {
  //         RescriptReactRouter.push("/Login")
  //       }
  //     : ()

  //   None
  // })

  {
    switch url.path {
    | list{"Login"} => <Login />
    | list{"Register"} => <Register />
    | list{"ExtensionShop"} => <ExtensionShop />
    | list{}
    | _ =>
      <Index />
    }
  }
}

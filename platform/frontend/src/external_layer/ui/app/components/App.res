@react.component
let make = () => {
  let url = RescriptReactRouter.useUrl()

  let {selectedExtensions} = AppStore.useSelector(({userCenterState}: AppStore.state) =>
    userCenterState
  )

  {
    switch url.path {
    | list{"Login"} => <Login />
    | list{"Register"} => <Register />
    | list{"ExtensionShop"} => <ExtensionShop />
    | list{"ContributeShop"} => <ContributeShop />
    | list{"AssembleSpace"} => <>
        <Nav />
        <AssembleSpace.AssembleSpace service={BackendCloudbase.buildService()} selectedExtensions />
      </>
    | list{}
    | _ =>
      <Index />
    }
  }
}

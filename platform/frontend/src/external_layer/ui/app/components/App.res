@react.component
let make = () => {
  let url = RescriptReactRouter.useUrl()

  let {username, selectedExtensions, selectedContributes} = AppStore.useSelector((
    {userCenterState}: AppStore.state,
  ) => userCenterState)

  let _buildService = (): FrontendUtils.AssembleSpaceType.service => {
    backend: BackendCloudbase.buildService(),
    meta3d: {
      generateApp: (. (allExtensionFileData, allContributeFileData)) =>
        Meta3d.Main.generateApp((allExtensionFileData, allContributeFileData)),
      convertAllFileData: (. allExtensionFileData, allContributeFileData, data) =>
        Meta3d.Main.convertAllFileDataForApp(allExtensionFileData, allContributeFileData, data),
    },
    console: {
      error: (. errorMessage, durationOpt) => FrontendUtils.ErrorUtils.error(errorMessage, durationOpt),
    },
    react: {
      useState: func => {
        React.useState(func->Obj.magic)
      },
      useSelector: func => {
        AppStore.useSelector(({assembleSpaceState}: AppStore.state) => {
          func(assembleSpaceState)
        })
      },
      useDispatch: () => {
        let dispatch = AppStore.useDispatch()

        assembleSpaceAction => {
          dispatch(AppStore.AssembleSpaceAction(assembleSpaceAction))
        }
      },
      useEffectOnce: func => {
        React.useEffect1(() => {
          let (_, cleanUp) = func()

          cleanUp
        }, [])
      },
      useEffectOnceAsync: func => {
        React.useEffect1(() => {
          let (_, cleanUp) = func()

          cleanUp
        }, [])
      },
    },
  }

  {
    switch url.path {
    | list{"Login"} => <Login />
    | list{"Register"} => <Register />
    | list{"ExtensionShop"} => 

    <ExtensionShop />
    | list{"ContributeShop"} => <ContributeShop />
    | list{"AssembleSpace"} => <>
        <Nav />
        <AssembleSpace.AssembleSpace
          service={_buildService()}
          username
          selectedExtensionsFromShop=selectedExtensions
          selectedContributesFromShop=selectedContributes
        />
      </>
    | list{"ShowPublishedApps"} => <ShowPublishedApps />
    | list{"EnterApp"} => <EnterApp />
    | list{}
    | _ =>
      <Index />
    }
  }
}

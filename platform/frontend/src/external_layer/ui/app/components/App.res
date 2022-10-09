@react.component
let make = () => {
  let url = RescriptReactRouter.useUrl()

  let {username, selectedExtensions, selectedContributes} = AppStore.useSelector((
    {userCenterState}: AppStore.state,
  ) => userCenterState)

  let _buildService = (): FrontendUtils.AssembleSpaceType.service => {
    dom: {
      querySelector: str => {
        DomExtend.querySelector(DomExtend.document, "#ui-visual-run-canvas")
      },
    },
    url: {
      useUrl: () => {
        RescriptReactRouter.useUrl()
      },
    },
    tab: {
      openUrl: url => {
        FrontendUtils.Window.\"open"(url, "_blank").focus()
      },
    },
    storage: {
      getItem: name => {
        LocalStorageUtils.get(name)
      },
      setItem: (name, value) => {
        LocalStorageUtils.set(name, value)
      },
    },
    other: {
      random: Js.Math.random,
      requestAnimationFrame: RequestAnimationFrameExtend.requestAnimationFrame,
    },
    backend: BackendCloudbase.buildService(),
    meta3d: {
      generateContribute: (. packageData, fileStr) =>
        Meta3d.Main.generateContribute(packageData, fileStr),
      loadContribute: (. contributeBinaryFile) => Meta3d.Main.loadContribute(contributeBinaryFile),
      generateExtension: (. packageData, fileStr) =>
        Meta3d.Main.generateExtension(packageData, fileStr),
      loadExtension: (. extensionBinaryFile) => Meta3d.Main.loadExtension(extensionBinaryFile),
      initExtension: (. state, extensionName, data) =>
        Meta3d.Main.initExtension(state, extensionName, data),
      updateExtension: (. state, extensionName, data) =>
        Meta3d.Main.updateExtension(state, extensionName, data),
      generateApp: (. (allExtensionFileData, allContributeFileData)) =>
        Meta3d.Main.generateApp((allExtensionFileData, allContributeFileData)),
      convertAllFileData: (. allExtensionFileData, allContributeFileData, data) =>
        Meta3d.Main.convertAllFileDataForApp(allExtensionFileData, allContributeFileData, data),
      loadApp: (. appBinaryFile) => Meta3d.Main.loadApp(appBinaryFile),
      serializeUIControlProtocolConfigLib: (. protocolConfigStr) =>
        Meta3d.Main.serializeUIControlProtocolConfigLib(protocolConfigStr),
      generateUIControlName: (. configLib) => Meta3d.Main.generateUIControlName(configLib),
      generateUIControlDataStr: (. configLib, rect) =>
        Meta3d.Main.generateUIControlDataStr(configLib, rect),
      getUIControlSupportedEventNames: (. configLib) =>
        Meta3d.Main.getUIControlSupportedEventNames(configLib),
      generateHandleUIControlEventStr: (. configLib, actionNames) =>
        Meta3d.Main.generateHandleUIControlEventStr(configLib, actionNames),
      serializeActionProtocolConfigLib: (. protocolConfigStr) =>
        Meta3d.Main.serializeActionProtocolConfigLib(protocolConfigStr),
      getActions: (. configLib) => Meta3d.Main.getActions(configLib),
    },
    console: {
      error: (. errorMessage, durationOpt) =>
        FrontendUtils.ErrorUtils.error(errorMessage, durationOpt),
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
      useEffect1: (. func, param) => React.useEffect1(func, param),
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
    | list{"ExtensionShop"} => <ExtensionShop />
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
    | list{"RunUIVisual"} => <AssembleSpace.RunUIVisual service={_buildService()} />
    | list{}
    | _ =>
      <Index />
    }
  }
}

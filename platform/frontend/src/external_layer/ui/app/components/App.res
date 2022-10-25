@react.component
let make = (~service: FrontendUtils.FrontendType.service, ~env: FrontendUtils.EnvType.env) => {
  let url = RescriptReactRouter.useUrl()

  let {account, selectedExtensions, selectedContributes} = AppStore.useSelector((
    {userCenterState}: AppStore.state,
  ) => userCenterState)

  let _buildAssembleSpaceService = (): FrontendUtils.AssembleSpaceType.service => {
    dom: {
      querySelector: str => {
        DomExtend.querySelector(DomExtend.document, str)
      },
    },
    url: {
      useUrl: () => {
        RescriptReactRouter.useUrl()
      },
    },
    tab: {
      openUrl: (. url) => {
        FrontendUtils.Window.\"open"(url, "_blank").focus()
      },
    },
    storage: {
      initForElementVisualApp: () => {
        IndexdDBUtils.initForElementVisualApp()
      },
      getElementVisualApp: (. stream) => {
        IndexdDBUtils.getElementVisualApp(stream)
      },
      setElementVisualApp: (. stream, appBinaryFile) => {
        IndexdDBUtils.setElementVisualApp(stream, appBinaryFile)
      },
    },
    other: {
      random: Js.Math.random,
      requestAnimationFrame: RequestAnimationFrameExtend.requestAnimationFrame,
    },
    backend: switch env {
    | #local => BackendCloudbase2.buildAssembleSpaceService()
    | #production => Backend4everland.buildAssembleSpaceService()
    },
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
      generateApp: (. (allExtensionFileData, allContributeFileData), startConfigData) =>
        Meta3d.Main.generateApp((allExtensionFileData, allContributeFileData), startConfigData),
      convertAllFileData: (. allExtensionFileData, allContributeFileData, data) =>
        Meta3d.Main.convertAllFileDataForApp(allExtensionFileData, allContributeFileData, data),
      loadApp: (. appBinaryFile) => Meta3d.Main.loadApp(appBinaryFile),
      execGetContributeFunc: (. contributeFuncData) =>
        Meta3d.Main.execGetContributeFunc(contributeFuncData),
      serializeUIControlProtocolConfigLib: (. protocolConfigStr) =>
        Meta3d.Main.serializeUIControlProtocolConfigLib(protocolConfigStr),
      getSkinProtocolData: (. configLib) => Meta3d.Main.getSkinProtocolData(configLib),
      generateUIControlDataStr: (. configLib, rect, skin) =>
        Meta3d.Main.generateUIControlDataStr(configLib, rect, skin),
      getUIControlSupportedEventNames: (. configLib) =>
        Meta3d.Main.getUIControlSupportedEventNames(configLib),
      generateHandleUIControlEventStr: (. configLib, actionNames) =>
        Meta3d.Main.generateHandleUIControlEventStr(configLib, actionNames),
      serializeActionProtocolConfigLib: (. protocolConfigStr) =>
        Meta3d.Main.serializeActionProtocolConfigLib(protocolConfigStr),
      getActions: (. configLib) => Meta3d.Main.getActions(configLib),
      serializeStartExtensionProtocolConfigLib: (. protocolConfigStr) =>
        Meta3d.Main.serializeStartExtensionProtocolConfigLib(protocolConfigStr),
      getNeedConfigData: (. configLib) => Meta3d.Main.getNeedConfigData(configLib),
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
    | list{"Login"} => <Login service />
    // | list{"Register"} => <Register />
    | list{"ExtensionShop"} => <ExtensionShop service />
    | list{"ContributeShop"} => <ContributeShop service />
    | list{"AssembleSpace"} => <>
        <Nav />
        <AssembleSpace.AssembleSpace
          service={_buildAssembleSpaceService()}
          account
          selectedExtensionsFromShop=selectedExtensions
          selectedContributesFromShop=selectedContributes
        />
      </>
    | list{"ShowPublishedApps"} => <ShowPublishedApps service />
    | list{"EnterApp"} => <EnterApp service />
    | list{"RunElementVisual"} =>
      <AssembleSpace.RunElementVisual service={_buildAssembleSpaceService()} />
    | list{}
    | _ =>
      <Index />
    }
  }
}

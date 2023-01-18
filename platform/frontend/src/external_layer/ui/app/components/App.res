@react.component
let make = (~service: FrontendUtils.FrontendType.service, ~env: FrontendUtils.EnvType.env) => {
  let url = RescriptReactRouter.useUrl()

  let {account, selectedExtensions, selectedContributes, selectedPackages} = AppStore.useSelector((
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
        FrontendUtils.Window.\"open"(url, "_self").focus()
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
      requestAnimationFirstFrame: RequestAnimationFrameExtend.requestAnimationFrame,
      requestAnimationOtherFrame: RequestAnimationFrameExtend.requestAnimationFrame,
    },
    backend: switch env {
    | #local => BackendCloudbase.buildAssembleSpaceService()
    | #production =>
      // TODO restore 4everland
      // Backend4everland.buildAssembleSpaceService()

      BackendCloudbase.buildAssembleSpaceService()
    },
    meta3d: {
      getExtensionState: (. meta3dState, name) =>
        Meta3d.Main.getExtensionState->Obj.magic(meta3dState, name),
      setExtensionState: (. meta3dState, name, extensionState) =>
        Meta3d.Main.setExtensionState->Obj.magic(meta3dState, name, extensionState),
      getExtensionService: (. meta3dState, name) =>
        Meta3d.Main.getExtensionService->Obj.magic(meta3dState, name),
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
      generatePackage: (. (allExtensionFileData, allContributeFileData), allPackageBinaryFiles) =>
        Meta3d.Main.generatePackage(
          (allExtensionFileData, allContributeFileData),
          allPackageBinaryFiles,
        ),
      generateApp: (.
        (allExtensionFileData, allContributeFileData),
        allPackageBinaryFiles,
        startConfigData,
      ) =>
        Meta3d.Main.generateApp(
          (allExtensionFileData, allContributeFileData),
          allPackageBinaryFiles,
          startConfigData,
        ),
      convertAllFileDataForPackage: (. allExtensionFileData, allContributeFileData, data) =>
        Meta3d.Main.convertAllFileDataForPackage(allExtensionFileData, allContributeFileData, data),
      convertAllFileDataForApp: (.
        allExtensionFileData,
        allContributeFileData,
        allPackageEntryExtensionProtocolData,
        data,
      ) =>
        Meta3d.Main.convertAllFileDataForApp(
          allExtensionFileData,
          allContributeFileData,
          allPackageEntryExtensionProtocolData,
          data,
        ),
      loadApp: (. appBinaryFile) => Meta3d.Main.loadApp(appBinaryFile),
      execGetContributeFunc: (.
        contributeFuncData,
        dependentExtensionProtocolNameMap,
        dependentContributeProtocolNameMap,
      ) =>
        Meta3d.Main.execGetContributeFunc(
          ~contributeFuncData,
          ~dependentExtensionProtocolNameMap,
          ~dependentContributeProtocolNameMap,
          (),
        ),
      serializeUIControlProtocolConfigLib: (. protocolConfigStr) =>
        Meta3d.Main.serializeUIControlProtocolConfigLib(protocolConfigStr),
      generateUIControlCommonDataStr: (. configLib, rect) =>
        Meta3d.Main.generateUIControlCommonDataStr(configLib, rect),
      getUIControlSpecificDataFields: (. configLib) =>
        Meta3d.Main.getUIControlSpecificDataFields(configLib),
      hasChildren: (. configLib) => Meta3d.Main.hasChildren(configLib),
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
      errorWithExn: (. error, durationOpt) =>
        FrontendUtils.ErrorUtils.errorWithExn(error, durationOpt),
    },
    react: {
      useCallback1: (. func, param) => {
        React.useCallback1(func->Obj.magic, param)
      },
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
    | list{"ExtensionShop"} => <ExtensionShop service />
    | list{"ContributeShop"} => <ContributeShop service />
    | list{"PackageShop"} => <PackageShop service />
    | list{"AssembleSpace"} =>
      <>
        <Nav />
        <AssembleSpace.AssembleSpace
          service={_buildAssembleSpaceService()}
          account
          selectedExtensionsFromShop=selectedExtensions
          selectedContributesFromShop=selectedContributes
          selectedPackagesFromShop=selectedPackages
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

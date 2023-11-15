open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

module Method = {
  let judgeToJumpToLogin = (buildUI, account, service) => {
    switch account {
    | Some(_) => buildUI()
    | None => <Login service />
    }
  }
}

@react.component
let make = (~service: FrontendUtils.FrontendType.service, ~env: FrontendUtils.EnvType.env) => {
  let url = RescriptReactRouter.useUrl()

  let {account, selectedExtensions, selectedContributes, selectedPackages} = AppStore.useSelector((
    {userCenterState}: FrontendUtils.AppStoreType.state,
  ) => userCenterState)

  let _buildAssembleSpaceService = (): FrontendUtils.AssembleSpaceType.service => {
    ui: {
      buildTitle: (. ~level, ~children, ()) => {
        <Typography.Title level> {children} </Typography.Title>
      },
      buildText: (. ~children, ~_type, ()) => {
        <Typography.Text _type> {children} </Typography.Text>
      },
    },
    dom: {
      querySelector: str => {
        DomExtend.querySelector(DomExtend.document, str)
      },
    },
    url: {
      getUrlParam: paramName => {
        FrontendUtils.UrlSearchUtils.get(RescriptReactRouter.useUrl().search, paramName)
        ->Js.Json.parseExn
        ->Obj.magic
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
      requestAnimationFirstFrame: RequestAnimationFrameExtend.requestAnimationFrame,
      requestAnimationOtherFrame: RequestAnimationFrameExtend.requestAnimationFrame,
      cancelAnimationFrame: RequestAnimationFrameExtend.cancelAnimationFrame,
    },
    backend: switch env {
    | #local => BackendCloudbase.buildAssembleSpaceService()
    | #production =>
      // TODO restore 4everland
      // Backend4everland.buildAssembleSpaceService()

      BackendCloudbase.buildAssembleSpaceService()
    },
    meta3d: {
      getPackageService: (. meta3dState, packageProtocolName) =>
        Meta3d.Main.getPackageService->Obj.magic(meta3dState, packageProtocolName),
      generateContribute: (. packageData, fileStr) =>
        Meta3d.Main.generateContribute(packageData, fileStr),
      loadContribute: (. contributeBinaryFile) => Meta3d.Main.loadContribute(contributeBinaryFile),
      generateExtension: (. packageData, fileStr) =>
        Meta3d.Main.generateExtension(packageData, fileStr),
      loadExtension: (. extensionBinaryFile) => Meta3d.Main.loadExtension(extensionBinaryFile),
      initExtension: (. state, extensionProtocolName, data) =>
        Meta3d.Main.initExtension(state, extensionProtocolName, data),
      updateExtension: (. state, extensionProtocolName, data) =>
        Meta3d.Main.updateExtension(state, extensionProtocolName, data),
      generatePackage: (.
        (allExtensionFileData, allContributeFileData),
        allPackageBinaryFiles,
        packageData,
      ) =>
        Meta3d.Main.generatePackage(
          (allExtensionFileData, allContributeFileData),
          allPackageBinaryFiles,
          packageData,
        ),
      generateApp: (.
        allContributeFileData,
        allPackageBinaryFiles,
        allPackagesStoredInApp,
        startConfigData,
        startPackageProtocolName,
      ) =>
        Meta3d.Main.generateApp(
          allContributeFileData,
          allPackageBinaryFiles,
          allPackagesStoredInApp,
          startConfigData,
          startPackageProtocolName,
        ),
      convertAllFileDataForPackage: (. allExtensionFileData, allContributeFileData, data) =>
        Meta3d.Main.convertAllFileDataForPackage(allExtensionFileData, allContributeFileData, data),
      convertAllFileDataForApp: (. allContributeFileData) =>
        Meta3d.Main.convertAllFileDataForApp(allContributeFileData),
      loadApp: (. appBinaryFile) => Meta3d.Main.loadApp(appBinaryFile),
      getExtensionFuncDataStr: (. extensionFuncData) =>
        Meta3d.Main.getExtensionFuncDataStr(extensionFuncData),
      getExtensionFuncData: (. extensionFuncDataStr) =>
        Meta3d.Main.getExtensionFuncData(extensionFuncDataStr),
      getContributeFuncDataStr: (. contributeFuncData) =>
        Meta3d.Main.getContributeFuncDataStr(contributeFuncData),
      getContributeFuncData: (. contributeFuncDataStr) =>
        Meta3d.Main.getContributeFuncData(contributeFuncDataStr),
      getAllDataOfPackage: (. packageBinaryFile) =>
        Meta3d.Main.getAllDataOfPackage(packageBinaryFile),
      execGetContributeFunc: (. contributeFuncData) =>
        Meta3d.Main.execGetContributeFunc(~contributeFuncData, ()),
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
      // serializeActionProtocolConfigLib: (. protocolConfigStr) =>
      //   Meta3d.Main.serializeActionProtocolConfigLib(protocolConfigStr),
      // getActions: (. configLib) => Meta3d.Main.getActions(configLib),
      serializeStartPackageProtocolConfigLib: (. protocolConfigStr) =>
        Meta3d.Main.serializeStartPackageProtocolConfigLib(protocolConfigStr),
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
      useRef: value => {
        React.useRef(value->Obj.magic)
      },
      useSelector: (. func) => {
        AppStore.useSelector(({assembleSpaceState}: FrontendUtils.AppStoreType.state) => {
          func(assembleSpaceState)
        })
      },
      // useDispatch: () => {
      //   let dispatch = AppStore.useDispatch()

      //   assembleSpaceAction => {
      //     dispatch(FrontendUtils.AppStoreType.AssembleSpaceAction(assembleSpaceAction))
      //   }
      // },
      useDispatch: ReactUtils.useDispatchForAssembleSpaceStore,
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
    app: {
      useDispatch: () => {
        AppStore.useDispatch()
      },
      dispatchUpdateSelectedPackagesAndExtensionsAndContributesAction: (.
        dispatchForAppStore,
        dispatchForApAssembleStore,
        dispatchForPackageAssembleStore,
        (
          selectedPackagesForAppStore,
          selectedExtensionsForAppStore,
          selectedContributesForAppStore,
        ),
        (
          selectedPackagesForApAssembleStore,
          selectedExtensionsForApAssembleStore,
          selectedContributesForApAssembleStore,
        ),
        (
          selectedPackagesForPackageAssembleStore,
          selectedExtensionsForPackageAssembleStore,
          selectedContributesForPackageAssembleStore,
        ),
      ) => {
        dispatchForAppStore(
          FrontendUtils.AppStoreType.UserCenterAction(
            FrontendUtils.UserCenterStoreType.UpdateSelectedPackagesAndExtensionsAndContributes(
              selectedPackagesForAppStore,
              selectedExtensionsForAppStore,
              selectedContributesForAppStore,
            ),
          ),
        )
        dispatchForApAssembleStore(
          FrontendUtils.ApAssembleStoreType.UpdateSelectedPackagesAndExtensionsAndContributes(
            selectedPackagesForApAssembleStore,
            selectedExtensionsForApAssembleStore,
            selectedContributesForApAssembleStore,
          ),
        )
        dispatchForPackageAssembleStore(
          FrontendUtils.PackageAssembleStoreType.UpdateSelectedPackagesAndExtensionsAndContributes(
            selectedPackagesForPackageAssembleStore,
            selectedExtensionsForPackageAssembleStore,
            selectedContributesForPackageAssembleStore,
          ),
        )
      },
      // dispatchStorePackageInApp: (. dispatchForAppStore, id) => {
      //   dispatchForAppStore(
      //     FrontendUtils.AppStoreType.UserCenterAction(
      //       FrontendUtils.UserCenterStoreType.StorePackageInApp(id),
      //     ),
      //   )
      // },
      // dispatchUnStorePackageInApp: (. dispatchForAppStore, id) => {
      //   dispatchForAppStore(
      //     FrontendUtils.AppStoreType.UserCenterAction(
      //       FrontendUtils.UserCenterStoreType.UnStorePackageInApp(id),
      //     ),
      //   )
      // },
    },
  }

  {
    switch url.path {
    | list{"Login"} => <Login service />
    | list{"Register"} => <Register service />
    | list{"ExtensionMarket"} =>
      Method.judgeToJumpToLogin(() => <ExtensionMarket service />, account, service)
    | list{"ContributeMarket"} =>
      Method.judgeToJumpToLogin(() => <ContributeMarket service />, account, service)

    | list{"PackageMarket"} =>
      Method.judgeToJumpToLogin(() => <PackageMarket service />, account, service)

    | list{"AssembleSpace"} => Method.judgeToJumpToLogin(() =>
        <Layout>
          <Layout.Header>
            <Nav currentKey="6" />
          </Layout.Header>
          <Layout.Content>
            <AssembleSpace.AssembleSpace
              service={_buildAssembleSpaceService()}
              account
              selectedExtensionsFromMarket=selectedExtensions
              selectedContributesFromMarket=selectedContributes
              selectedPackagesFromMarket=selectedPackages
            />
          </Layout.Content>
        </Layout>
      , account, service)
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

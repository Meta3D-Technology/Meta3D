open Antd
%%raw("import 'antd/dist/reset.css'")

module Method = {
  let judgeToJumpToLogin = (buildUI, account, service) => {
    switch account {
    | Some(_) => buildUI()
    | None =>
      RescriptReactRouter.push("/Login")
      <Login service />
    }
  }
}

@react.component
let make = (~service: FrontendType.service, ~env: EnvType.env) => {
  let (messageApi, contextHolder) = Antd.Message.useMessage()

  Antd.Message.setMessageAPI(messageApi)

  let dispatch = AppStore.useDispatch()

  let url = RescriptReactRouter.useUrl()

  let {
    account,
    selectedExtensions,
    selectedContributes,
    selectedPackages,
    selectedElements,
    currentAppName,
    // customInputs,
    // customActions,
  } = AppStore.useSelector(({userCenterState}: AppStoreType.state) => userCenterState)

  let assembleSpaceNavTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())

  let _buildAssembleSpaceService = (): AssembleSpaceType.service => {
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
        UrlSearchUtils.get(RescriptReactRouter.useUrl().search, paramName)
        ->Js.Json.parseExn
        ->Obj.magic
      },
    },
    tab: {
      openUrl: (. url) => {
        Window.\"open"(url, "_blank").focus()
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
        selectedElements,
        // customData,
        startConfigData,
        startPackageProtocolName,
      ) =>
        Meta3d.Main.generateApp(
          allContributeFileData,
          allPackageBinaryFiles,
          allPackagesStoredInApp,
          selectedElements->Obj.magic,
          // customData->Obj.magic,
          startConfigData,
          startPackageProtocolName,
        ),
      convertAllFileDataForPackage: (. allExtensionFileData, allContributeFileData, data) =>
        Meta3d.Main.convertAllFileDataForPackage(allExtensionFileData, allContributeFileData, data),
      convertAllFileDataForApp: (. allContributeFileData) =>
        Meta3d.Main.convertAllFileDataForApp(allContributeFileData),
      loadApp: (. addGeneratedContributeFunc, appBinaryFile) =>
        Meta3d.Main.loadApp(addGeneratedContributeFunc, appBinaryFile),
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
      error: (. errorMessage, durationOpt) => ErrorUtils.error(errorMessage, durationOpt),
      errorWithExn: (. error, durationOpt) => ErrorUtils.errorWithExn(error, durationOpt),
    },
    react: {
      useCallback1: (. func, param) => {
        React.useCallback1(func->Obj.magic, param)
      },
      // useStore: func => {
      //   React.useStore(func->Obj.magic)
      // },
      useState: func => {
        React.useState(func->Obj.magic)
      },
      useRef: value => {
        React.useRef(value->Obj.magic)
      },
      useSelector: (. func) => {
        AppStore.useSelector(({assembleSpaceState}: AppStoreType.state) => {
          func(assembleSpaceState)
        })
      },
      // useDispatch: () => {
      //   let dispatch = AppStore.useDispatch()

      //   assembleSpaceAction => {
      //     dispatch(AppStoreType.AssembleSpaceAction(assembleSpaceAction))
      //   }
      // },
      useDispatch: ReactUtils.useDispatchForAssembleSpaceStore,
      useEffect: (. func) => React.useEffect(func),
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
          // selectedElementsForAppStore,
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
          AppStoreType.UserCenterAction(
            UserCenterStoreType.UpdateSelectedPackagesAndExtensionsAndContributes(
              selectedPackagesForAppStore,
              selectedExtensionsForAppStore,
              selectedContributesForAppStore,
              // selectedElementsForAppStore,
            ),
          ),
        )
        dispatchForApAssembleStore(
          ApAssembleStoreType.UpdateSelectedPackagesAndExtensionsAndContributes(
            selectedPackagesForApAssembleStore,
            selectedExtensionsForApAssembleStore,
            selectedContributesForApAssembleStore,
          ),
        )
        dispatchForPackageAssembleStore(
          PackageAssembleStoreType.UpdateSelectedPackagesAndExtensionsAndContributes(
            selectedPackagesForPackageAssembleStore,
            selectedExtensionsForPackageAssembleStore,
            selectedContributesForPackageAssembleStore,
          ),
        )
      },
      // dispatchStorePackageInApp: (. dispatchForAppStore, id) => {
      //   dispatchForAppStore(
      //     AppStoreType.UserCenterAction(
      //       UserCenterStoreType.StorePackageInApp(id),
      //     ),
      //   )
      // },
      // dispatchUnStorePackageInApp: (. dispatchForAppStore, id) => {
      //   dispatchForAppStore(
      //     AppStoreType.UserCenterAction(
      //       UserCenterStoreType.UnStorePackageInApp(id),
      //     ),
      //   )
      // },
    },
  }

  <>
    {contextHolder}
    {switch url.path {
    | list{"Login"} => <Login service />
    | list{"Register"} => <Register service />
    | list{"ExtensionMarket"} =>
      Method.judgeToJumpToLogin(() => <ExtensionMarket service account />, account, service)
    | list{"ContributeMarket"} =>
      Method.judgeToJumpToLogin(() => <ContributeMarket service account />, account, service)

    | list{"PackageMarket"} =>
      Method.judgeToJumpToLogin(() => <PackageMarket service account />, account, service)

    | list{"AssembleSpace"} => Method.judgeToJumpToLogin(() => {
        switch currentAppName {
        | None =>
          RescriptReactRouter.push("/UserCenter")
          React.null
        | Some(currentAppName) =>
          <Layout>
            <Layout.Header>
              <AssembleSpaceNav
                service={_buildAssembleSpaceService()}
                currentKey="2"
                appName={currentAppName}
                assembleSpaceNavTarget
              />
            </Layout.Header>
            <Layout.Content>
              <AssembleSpace
                service={_buildAssembleSpaceService()}
                account
                selectedExtensionsFromMarket=selectedExtensions
                selectedContributesFromMarket=selectedContributes
                selectedPackagesFromMarket=selectedPackages
                selectedElementsFromMarket=selectedElements
                // customInputsFromMarket=customInputs
                // customActionsFromMarket=customActions
                assembleSpaceNavTarget
              />
            </Layout.Content>
          </Layout>
        }
      }, account, service)
    | list{"ShowPublishedApps"} => Method.judgeToJumpToLogin(() => {
        <ShowPublishedApps service account />
      }, account, service)

    // | list{"ShowPublishedElements"} =>
    //   Method.judgeToJumpToLogin(() => <ShowPublishedElements service />, account, service)
    | list{"EnterApp"} => <EnterApp service />
    | list{"RunElementVisual"} => <RunElementVisual service={_buildAssembleSpaceService()} />
    | list{}
    | _ =>
      Method.judgeToJumpToLogin(() => <UserCenter service />, account, service)
    }}
  </>
}

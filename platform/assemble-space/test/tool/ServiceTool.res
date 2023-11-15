open FrontendUtils.AssembleSpaceType

open Sinon

let build = (
  ~sandbox,
  ~querySelector=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~requestAnimationFirstFrame=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~requestAnimationOtherFrame=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~cancelAnimationFrame=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getUrlParam=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~openUrl=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~initForElementVisualApp=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getElementVisualApp=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setElementVisualApp=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~random=Js.Math.random,
  ~dispatch=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useCallback1=React.useCallback1->Obj.magic,
  // ~useState=React.useState->Obj.magic,
  ~useState=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns([], _)->Obj.magic,
  ~useRef=React.useRef->Obj.magic,
  ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useEffect1=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useEffectOnce=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useEffectOnceAsync=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~error=Js.Console.error,
  ~errorWithExn=Js.Console.error,
  // ~getAllPublishPackageEntryExtensionProtocols=createEmptyStub(
  //   refJsObjToSandbox(sandbox.contents),
  // )->Obj.magic,
  ~getAllPublishExtensionProtocols=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~getAllPublishContributeProtocols=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMostDefault.Most.just([]), _)
  ->Obj.magic,
  ~getAllPublishContributeProtocolConfigs=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMostDefault.Most.just([]), _)
  ->Obj.magic,
  ~getAllPublishExtensionProtocolConfigs=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMostDefault.Most.just([]), _)
  ->Obj.magic,
  ~getAllPublishExtensions=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMostDefault.Most.just([]), _)
  ->Obj.magic,
  ~getAllPublishNewestExtensions=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMostDefault.Most.just([]), _)
  ->Obj.magic,
  ~publishPackage=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~publishApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~findPublishApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMostDefault.Most.just(Js.Nullable.null), _)
  ->Obj.magic,
  // ~findPublishPackage=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  // ->returns(Meta3dBsMostDefault.Most.just(Js.Nullable.null), _)
  // ->Obj.magic,
  // ~findAllPublishAppsByAccount=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  // ->returns(Meta3dBsMostDefault.Most.just([]), _)
  // ->Obj.magic,
  ~findAllPublishApps=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMostDefault.Most.just([]), _)
  ->Obj.magic,
  ~publishElementContribute=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMostDefault.Most.empty(), _)
  ->Obj.magic,
  ~publishElementAssembleData=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMostDefault.Most.empty(), _)
  ->Obj.magic,
  ~getElementAssembleData=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMostDefault.Most.empty(), _)
  ->Obj.magic,
  ~findNewestPublishPackage=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMostDefault.Most.empty(), _)
  ->Obj.magic,
  ~findNewestPublishExtension=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMostDefault.Most.empty(), _)
  ->Obj.magic,
  ~findNewestPublishContribute=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMostDefault.Most.empty(), _)
  ->Obj.magic,
  ~generateContribute=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~getPackageService=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~loadContribute=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~generateExtension=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~loadExtension=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~initExtension=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~updateExtension=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~generatePackage=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Js.Typed_array.ArrayBuffer.make(0), _)
  ->Obj.magic,
  ~generateApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Js.Typed_array.ArrayBuffer.make(0), _)
  ->Obj.magic,
  ~convertAllFileDataForApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns([], _)
  ->Obj.magic,
  ~convertAllFileDataForPackage=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(([], []), _)
  ->Obj.magic,
  ~loadApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~getExtensionFuncDataStr=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns("", _)
  ->Obj.magic,
  ~getExtensionFuncData=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~getContributeFuncDataStr=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns("", _)
  ->Obj.magic,
  ~getContributeFuncData=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~getAllDataOfPackage=createEmptyStub(
    refJsObjToSandbox(sandbox.contents),
  )->Obj.magic,
  ~execGetContributeFunc=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns({"uiControlName": ""}, _)
  ->Obj.magic,
  ~hasChildren=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~serializeUIControlProtocolConfigLib=createEmptyStub(
    refJsObjToSandbox(sandbox.contents),
  )->Obj.magic,
  ~generateUIControlCommonDataStr=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~getUIControlSpecificDataFields=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~getUIControlSupportedEventNames=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns([], _)
  ->Obj.magic,
  ~generateHandleUIControlEventStr=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~serializeActionProtocolConfigLib=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~getActions=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~serializeStartPackageProtocolConfigLib=createEmptyStub(
    refJsObjToSandbox(sandbox.contents),
  )->Obj.magic,
  ~getNeedConfigData=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns([], _)
  ->Obj.magic,
  // ~buildTitle=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  // ->returns(React.null, _)
  // ->Obj.magic,

  ~buildTitle=(. ~children, ~level, ()) => {
    <h1> {children} </h1>
  },
  ~buildText=(. ~children) => {
    <span> {children} </span>
  },
  ~dispatchUpdateSelectedPackagesAndExtensionsAndContributesAction=createEmptyStub(
    refJsObjToSandbox(sandbox.contents),
  )->Obj.magic,
  // ~dispatchStorePackageInApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  // ~dispatchUnStorePackageInApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  (),
) => {
  react: {
    useCallback1: useCallback1->Obj.magic,
    useState: useState->Obj.magic,
    useRef: useRef->Obj.magic,
    useDispatch: () => dispatch,
    useSelector: useSelector->Obj.magic,
    useEffect1: useEffect1->Obj.magic,
    useEffectOnce,
    useEffectOnceAsync,
  },
  console: {
    error: error->Obj.magic,
    errorWithExn: errorWithExn->Obj.magic,
  },
  backend: {
    // getAllPublishPackageEntryExtensionProtocols: getAllPublishPackageEntryExtensionProtocols->Obj.magic,
    getAllPublishExtensionProtocols: getAllPublishExtensionProtocols->Obj.magic,
    getAllPublishContributeProtocols: getAllPublishContributeProtocols->Obj.magic,
    getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs->Obj.magic,
    getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs->Obj.magic,
    getAllPublishNewestExtensions: getAllPublishNewestExtensions->Obj.magic,
    publishPackage,
    publishApp,
    findPublishApp,
    // findPublishPackage,
    // findAllPublishAppsByAccount,
    findAllPublishApps,
    publishElementContribute,
    publishElementAssembleData,
    getElementAssembleData,
    findNewestPublishPackage,
    findNewestPublishExtension,
    findNewestPublishContribute,
  },
  meta3d: {
    generateContribute,
    getPackageService: getPackageService->Obj.magic,
    loadContribute,
    generateExtension,
    loadExtension,
    initExtension,
    updateExtension,
    generatePackage,
    generateApp,
    convertAllFileDataForPackage,
    convertAllFileDataForApp,
    loadApp,
    getExtensionFuncDataStr,
    getExtensionFuncData,
    getContributeFuncDataStr,
    getContributeFuncData,
    getAllDataOfPackage,
    execGetContributeFunc,
    hasChildren,
    serializeUIControlProtocolConfigLib,
    generateUIControlCommonDataStr,
    getUIControlSpecificDataFields,
    getUIControlSupportedEventNames,
    generateHandleUIControlEventStr,
    // serializeActionProtocolConfigLib,
    // getActions,
    serializeStartPackageProtocolConfigLib,
    getNeedConfigData,
  },
  other: {
    random,
    requestAnimationFirstFrame,
    requestAnimationOtherFrame,
    cancelAnimationFrame,
  },
  tab: {
    openUrl: openUrl,
  },
  storage: {
    initForElementVisualApp,
    getElementVisualApp,
    setElementVisualApp,
  },
  url: {
    getUrlParam: getUrlParam,
  },
  dom: {
    querySelector: querySelector,
  },
  ui: {
    buildTitle: buildTitle->Obj.magic,
    buildText: buildText->Obj.magic,
  },
  app: {
    useDispatch: () => Obj.magic(1),
    dispatchUpdateSelectedPackagesAndExtensionsAndContributesAction: dispatchUpdateSelectedPackagesAndExtensionsAndContributesAction->Obj.magic,
    // dispatchStorePackageInApp: dispatchStorePackageInApp->Obj.magic,
    // dispatchUnStorePackageInApp: dispatchUnStorePackageInApp->Obj.magic,
  },
}

let getUseEffectOncePromise = ((promise, _)) => {
  promise
}

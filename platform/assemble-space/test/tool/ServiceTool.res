open FrontendUtils.AssembleSpaceType

open Sinon

let build = (
  ~sandbox,
  ~querySelector=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~requestAnimationFirstFrame=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~requestAnimationOtherFrame=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~cancelAnimationFrame=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useUrl=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~openUrl=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~initForElementVisualApp=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getElementVisualApp=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setElementVisualApp=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~random=Js.Math.random,
  ~dispatch=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useCallback1=React.useCallback1->Obj.magic,
  ~useState=React.useState->Obj.magic,
  ~useRef=React.useRef->Obj.magic,
  ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useEffect1=React.useEffect1,
  ~useEffectOnce=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useEffectOnceAsync=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~error=Js.Console.error,
  ~errorWithExn=Js.Console.error,
  // ~getAllPublishPackageEntryExtensionProtocols=createEmptyStub(
  //   refJsObjToSandbox(sandbox.contents),
  // )->Obj.magic,
  ~getAllPublishExtensionProtocols=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~getAllPublishContributeProtocols=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.just([]), _)
  ->Obj.magic,
  ~getAllPublishContributeProtocolConfigs=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.just([]), _)
  ->Obj.magic,
  ~getAllPublishExtensionProtocolConfigs=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.just([]), _)
  ->Obj.magic,
  ~getAllPublishExtensions=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.just([]), _)
  ->Obj.magic,
  ~getAllPublishNewestExtensions=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.just([]), _)
  ->Obj.magic,
  ~publishPackage=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~publishApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~findPublishApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.just(Js.Nullable.null), _)
  ->Obj.magic,
  // ~findPublishPackage=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  // ->returns(Meta3dBsMost.Most.just(Js.Nullable.null), _)
  // ->Obj.magic,
  ~findAllPublishApps=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.just([]), _)
  ->Obj.magic,
  ~publishElementContribute=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.empty(), _)
  ->Obj.magic,
  ~publishElementAssembleData=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.empty(), _)
  ->Obj.magic,
  ~getElementAssembleData=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.empty(), _)
  ->Obj.magic,
  ~generateContribute=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~getExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~getExtensionService=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~setExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
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
  ->returns(([], []), _)
  ->Obj.magic,
  ~convertAllFileDataForPackage=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(([], []), _)
  ->Obj.magic,
  ~loadApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
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
  ~serializeStartExtensionProtocolConfigLib=createEmptyStub(
    refJsObjToSandbox(sandbox.contents),
  )->Obj.magic,
  ~getNeedConfigData=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns([], _)
  ->Obj.magic,
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
    findAllPublishApps,
    publishElementContribute,
    publishElementAssembleData,
    getElementAssembleData,
  },
  meta3d: {
    generateContribute,
    getExtensionState: getExtensionState->Obj.magic,
    getExtensionService: getExtensionService->Obj.magic,
    setExtensionState: setExtensionState->Obj.magic,
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
    execGetContributeFunc,
    hasChildren,
    serializeUIControlProtocolConfigLib,
    generateUIControlCommonDataStr,
    getUIControlSpecificDataFields,
    getUIControlSupportedEventNames,
    generateHandleUIControlEventStr,
    serializeActionProtocolConfigLib,
    getActions,
    serializeStartExtensionProtocolConfigLib,
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
    useUrl: useUrl,
  },
  dom: {
    querySelector: querySelector,
  },
}

let getUseEffectOncePromise = ((promise, _)) => {
  promise
}

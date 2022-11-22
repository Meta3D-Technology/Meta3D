open FrontendUtils.AssembleSpaceType

open Sinon

let build = (
  ~sandbox,
  ~querySelector=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~requestAnimationFirstFrame=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~requestAnimationOtherFrame=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useUrl=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~openUrl=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~initForElementVisualApp=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getElementVisualApp=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setElementVisualApp=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~random=Js.Math.random,
  ~dispatch=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useCallback1=React.useCallback1->Obj.magic,
  ~useState=React.useState->Obj.magic,
  ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useEffect1=React.useEffect1,
  ~useEffectOnce=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useEffectOnceAsync=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~error=Js.Console.error,
  ~errorWithExn=Js.Console.error,
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
  ~publishApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~findPublishApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.just(Js.Nullable.null), _)
  ->Obj.magic,
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
  ~generateApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Js.Typed_array.ArrayBuffer.make(0), _)
  ->Obj.magic,
  ~convertAllFileData=createEmptyStub(refJsObjToSandbox(sandbox.contents))
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
    useDispatch: () => dispatch,
    useSelector: useSelector->Obj.magic,
    useEffect1: useEffect1->Obj.magic,
    useEffectOnce: useEffectOnce,
    useEffectOnceAsync: useEffectOnceAsync,
  },
  console: {
    error: error->Obj.magic,
    errorWithExn: errorWithExn->Obj.magic,
  },
  backend: {
    getAllPublishExtensionProtocols: getAllPublishExtensionProtocols->Obj.magic,
    getAllPublishContributeProtocols: getAllPublishContributeProtocols->Obj.magic,
    getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs->Obj.magic,
    getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs->Obj.magic,
    getAllPublishNewestExtensions: getAllPublishNewestExtensions->Obj.magic,
    publishApp: publishApp,
    findPublishApp: findPublishApp,
    findAllPublishApps: findAllPublishApps,
    publishElementContribute: publishElementContribute,
    publishElementAssembleData: publishElementAssembleData,
    getElementAssembleData: getElementAssembleData,
  },
  meta3d: {
    generateContribute: generateContribute,
    getExtensionState: getExtensionState->Obj.magic,
    getExtensionService: getExtensionService->Obj.magic,
    setExtensionState: setExtensionState->Obj.magic,
    loadContribute: loadContribute,
    generateExtension: generateExtension,
    loadExtension: loadExtension,
    initExtension: initExtension,
    updateExtension: updateExtension,
    generateApp: generateApp,
    convertAllFileData: convertAllFileData,
    loadApp: loadApp,
    execGetContributeFunc: execGetContributeFunc,
    hasChildren: hasChildren,
    serializeUIControlProtocolConfigLib: serializeUIControlProtocolConfigLib,
    generateUIControlCommonDataStr: generateUIControlCommonDataStr,
    getUIControlSpecificDataFields: getUIControlSpecificDataFields,
    getUIControlSupportedEventNames: getUIControlSupportedEventNames,
    generateHandleUIControlEventStr: generateHandleUIControlEventStr,
    serializeActionProtocolConfigLib: serializeActionProtocolConfigLib,
    getActions: getActions,
    serializeStartExtensionProtocolConfigLib: serializeStartExtensionProtocolConfigLib,
    getNeedConfigData: getNeedConfigData,
  },
  other: {
    random: random,
    requestAnimationFirstFrame: requestAnimationFirstFrame,
    requestAnimationOtherFrame: requestAnimationOtherFrame,
  },
  tab: {
    openUrl: openUrl,
  },
  storage: {
    initForElementVisualApp: initForElementVisualApp,
    getElementVisualApp: getElementVisualApp,
    setElementVisualApp: setElementVisualApp,
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

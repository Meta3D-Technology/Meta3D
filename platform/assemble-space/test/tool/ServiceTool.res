open FrontendUtils.AssembleSpaceType

open Sinon

let build = (
  ~sandbox,
  ~querySelector=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~requestAnimationFrame=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useUrl=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~openUrl=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getItem=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setItem=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~random=Js.Math.random,
  ~dispatch=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useState=React.useState->Obj.magic,
  ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useEffect1=React.useEffect1,
  ~useEffectOnce=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useEffectOnceAsync=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~error=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getAllPublishExtensionProtocols=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~getAllPublishContributeProtocols=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.just([]), _)
  ->Obj.magic,
  ~getAllPublishContributeProtocolConfigs=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.just([]), _)
  ->Obj.magic,
  ~getAllPublishExtensions=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.just([]), _)
  ->Obj.magic,
  ~publishApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~findPublishApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.just(Js.Nullable.null), _)
  ->Obj.magic,
  ~findAllPublishApps=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.just([]), _)
  ->Obj.magic,
  ~generateContribute=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
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
  ~serializeUIControlProtocolConfigLib=createEmptyStub(
    refJsObjToSandbox(sandbox.contents),
  )->Obj.magic,
  ~generateUIControlDataStr=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~generateUIControlName=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~getUIControlSupportedEventNames=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~generateHandleUIControlEventStr=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~serializeActionProtocolConfigLib=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  ~getActions=createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
  (),
) => {
  react: {
    useState: useState->Obj.magic,
    useDispatch: () => dispatch,
    useSelector: useSelector->Obj.magic,
    useEffect1: useEffect1->Obj.magic,
    useEffectOnce: useEffectOnce,
    useEffectOnceAsync: useEffectOnceAsync,
  },
  console: {
    error: error->Obj.magic,
  },
  backend: {
    getAllPublishExtensionProtocols: getAllPublishExtensionProtocols->Obj.magic,
    getAllPublishContributeProtocols: getAllPublishContributeProtocols->Obj.magic,
    getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs->Obj.magic,
    getAllPublishExtensions: getAllPublishExtensions->Obj.magic,
    publishApp: publishApp,
    findPublishApp: findPublishApp,
    findAllPublishApps: findAllPublishApps,
  },
  meta3d: {
    generateContribute: generateContribute,
    loadContribute: loadContribute,
    generateExtension: generateExtension,
    loadExtension: loadExtension,
    initExtension: initExtension,
    updateExtension: updateExtension,
    generateApp: generateApp,
    convertAllFileData: convertAllFileData,
    loadApp: loadApp,
    serializeUIControlProtocolConfigLib: serializeUIControlProtocolConfigLib,
    generateUIControlDataStr: generateUIControlDataStr,
    generateUIControlName: generateUIControlName,
    getUIControlSupportedEventNames: getUIControlSupportedEventNames,
    generateHandleUIControlEventStr: generateHandleUIControlEventStr,
    serializeActionProtocolConfigLib: serializeActionProtocolConfigLib,
    getActions: getActions,
  },
  other: {
    random: random,
    requestAnimationFrame: requestAnimationFrame,
  },
  tab: {
    openUrl: openUrl,
  },
  storage: {
    getItem: getItem,
    setItem: setItem,
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

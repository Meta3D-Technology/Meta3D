open FrontendUtils.AssembleSpaceType

open Sinon

let build = (
  ~sandbox,
  ~dispatch=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useEffectOnce=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~useEffectOnceAsync=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~error=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getAllPublishExtensionProtocols=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.just([]), _)
  ->Obj.magic,
  ~getAllPublishContributeProtocols=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.just([]), _)
  ->Obj.magic,
  (),
) => {
  react: {
    useDispatch: () => dispatch,
    useSelector: useSelector->Obj.magic,
    useEffectOnce: useEffectOnce,
    useEffectOnceAsync: useEffectOnceAsync,
  },
  console: {
    error: error->Obj.magic,
  },
  backend: {
    getAllPublishExtensionProtocols: getAllPublishExtensionProtocols->Obj.magic,
    getAllPublishContributeProtocols: getAllPublishContributeProtocols->Obj.magic,
  },
}

let getUseEffectOncePromise = ((promise, _)) => {
  promise
}

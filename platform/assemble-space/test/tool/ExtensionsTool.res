open Sinon

let buildExtensions = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedExtensionsFromShop=list{},
  (),
) => {
  <Extensions service selectedExtensionsFromShop />
}

let useEffectOnce = (
  ~sandbox,
  // ~dispatch=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setIsLoaded=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensions=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedExtensionsFromShop=list{},
  (),
) => {
  Extensions.Method.useEffectOnce((setIsLoaded, setExtensions), service, selectedExtensionsFromShop)
}

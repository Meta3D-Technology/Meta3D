open Sinon

let buildUI = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedExtensionsFromShop=list{},
  (),
) => {
  <PackageExtensions service selectedExtensionsFromShop />
}

let useEffectOnceAsync = (
  ~sandbox,
  // ~dispatch=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setIsLoaded=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensions=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedExtensionsFromShop=list{},
  (),
) => {
  ExtensionsUtils.Method.useEffectOnceAsync(
    (setIsLoaded, setExtensions),
    service,
    selectedExtensionsFromShop,
  )
}

let selectExtension = (
  // ~sandbox,
  ~iconBase64,
  ~extension,
  ~protocolConfigStr,
  // ~dispatch=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~dispatch,
) => {
  PackageExtensions.Method.selectExtension(dispatch, iconBase64, protocolConfigStr, extension)
}

let getProtocolConfigStr = ExtensionsUtils.Method._getProtocolConfigStr

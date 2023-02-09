open Sinon

let buildUI = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedExtensionsFromMarket=list{},
  (),
) => {
  <PackageExtensions service selectedExtensionsFromMarket />
}

let useEffectOnceAsync = (
  ~sandbox,
  // ~dispatch=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setIsLoaded=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensions=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedExtensionsFromMarket=list{},
  (),
) => {
  ExtensionsUtils.Method.useEffectOnceAsync(
    (setIsLoaded, setExtensions),
    service,
    selectedExtensionsFromMarket,
  )
}

let selectExtension = (
  // ~sandbox,
  ~iconBase64,
  ~extension,
  ~protocolConfigStr,
  // ~dispatch=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~dispatch,
  ~protocolDisplayName="d1",
  ~protocolRepoLink="",
  ~protocolDescription="dp1",
  (),
) => {
  PackageExtensions.Method.selectExtension(
    dispatch,
    iconBase64,
    protocolDisplayName,
    protocolRepoLink,
    protocolDescription,
    protocolConfigStr,
    extension,
  )
}

let getProtocolConfigStr = ExtensionsUtils.Method._getProtocolConfigStr

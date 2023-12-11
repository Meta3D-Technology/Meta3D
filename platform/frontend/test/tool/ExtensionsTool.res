open Sinon

let buildUI = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedExtensionsFromMarket=list{},
  (),
) => {
  <Extensions service selectedExtensionsFromMarket />
}

// let useEffectOnceAsync = (
//   ~sandbox,
//   // ~dispatch=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
//   ~setIsLoaded=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
//   ~setExtensions=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
//   ~service=ServiceTool.build(~sandbox, ()),
//   ~selectedExtensionsFromMarket=list{},
//   (),
// ) => {
//   ExtensionsUtils.Method.useEffectOnceAsync(
//     (setIsLoaded, setExtensions),
//     service,
//     selectedExtensionsFromMarket,
//   )
// }

let selectExtension = (
  // ~sandbox,
  ~extension,
  ~protocolConfigStr,
  // ~dispatch=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~dispatch,
  ~iconBase64="i1",
  ~protocolDisplayName="d1",
  ~protocolRepoLink="l1",
  ~protocolDescription="dp1",
  (),
) => {
  Extensions.Method.selectExtension(
    dispatch,
    iconBase64,
    protocolDisplayName,
    protocolRepoLink,
    protocolDescription,
    protocolConfigStr,
    extension,
  )
}

let getProtocolConfigStr = ExtensionsContributesUtils.getProtocolConfigStr

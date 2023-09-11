open Sinon

let buildUI = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedContributesFromMarket=list{},
  (),
) => {
  <PackageContributes service selectedContributesFromMarket />
}

let useEffectOnceAsync = (
  ~sandbox,
  ~setIsLoaded=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setContributes=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedContributesFromMarket=list{},
  (),
) => {
  ContributesUtils.Method.useEffectOnceAsync(
    (setIsLoaded, setContributes),
    service,
    selectedContributesFromMarket,
  )
}

let selectContribute = (~iconBase64, ~protocolConfigStr, ~contribute, ~dispatch) => {
  PackageContributes.Method.selectContribute(dispatch, iconBase64, protocolConfigStr, contribute)
}

let getProtocolConfigStr = ExtensionsContributesUtils.getProtocolConfigStr

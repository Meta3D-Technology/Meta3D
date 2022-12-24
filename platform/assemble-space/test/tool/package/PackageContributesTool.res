open Sinon

let buildUI = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedContributesFromShop=list{},
  (),
) => {
  <PackageContributes service selectedContributesFromShop />
}

let useEffectOnceAsync = (
  ~sandbox,
  ~setIsLoaded=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setContributes=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedContributesFromShop=list{},
  (),
) => {
  ContributesUtils.Method.useEffectOnceAsync(
    (setIsLoaded, setContributes),
    service,
    selectedContributesFromShop,
  )
}

let selectContribute = (~iconBase64, ~protocolConfigStr, ~contribute, ~dispatch) => {
  PackageContributes.Method.selectContribute(dispatch, iconBase64, protocolConfigStr, contribute)
}

let getProtocolConfigStr = ContributesUtils.Method._getProtocolConfigStr

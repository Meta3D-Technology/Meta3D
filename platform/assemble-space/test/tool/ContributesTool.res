open Sinon

let buildUI = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedContributesFromShop=list{},
  (),
) => {
  <Contributes service selectedContributesFromShop />
}

let useEffectOnceAsync = (
  ~sandbox,
  ~setIsLoaded=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setContributes=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedContributesFromShop=list{},
  (),
) => {
  Contributes.Method.useEffectOnceAsync(
    (setIsLoaded, setContributes),
    service,
    selectedContributesFromShop,
  )
}

let selectContribute = (~iconBase64, ~protocolConfigStr, ~contribute, ~dispatch) => {
  Contributes.Method.selectContribute(dispatch, iconBase64,protocolConfigStr, contribute)
}

let getProtocolConfigStr = Contributes.Method._getProtocolConfigStr
open Sinon

let buildUI = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedContributesFromMarket=list{},
  (),
) => {
  <Contributes service selectedContributesFromMarket />
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
  Contributes.Method.selectContribute(dispatch, iconBase64, protocolConfigStr, contribute)
}

let getProtocolConfigStr = ContributesUtils.Method._getProtocolConfigStr

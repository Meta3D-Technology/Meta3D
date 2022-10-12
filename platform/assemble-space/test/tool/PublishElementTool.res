open Sinon

let buildUI = (~sandbox, ~username=None, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <PublishElement service username />
}

let publish = (
  ~sandbox,
  ~service,
  ~setVisible=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~username=None,
  ~elementContributeData=None,
  ~elementInspectorData=ElementInspectorTool.buildElementInspectorData(
    list{},
    ReducerTool.buildReducers(),
  ),
  ~selectedUIControlInspectorData=list{},
  ~values={
    "elementName": "n1",
    "elementVersion": "0.0.1",
  },
  (),
) => {
  PublishElement.Method.onFinish(
    service,
    setVisible,
    (username, (elementContributeData, elementInspectorData, selectedUIControlInspectorData)),
    values,
  )
}

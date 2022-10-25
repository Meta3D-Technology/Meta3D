open Sinon

let buildUI = (~sandbox, ~account=None, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <Publish service account />
}

let publish = (
  ~sandbox,
  ~service,
  ~setVisible=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~account=None,
  ~selectedExtensions=list{},
  ~selectedContributes=list{},
  ~canvasData=CanvasControllerTool.buildCanvasData(),
  ~values={
    "appName": "n1",
  },
  (),
) => {
  Publish.Method.onFinish(
    service,
    setVisible,
    (account, selectedExtensions, selectedContributes, canvasData),
    values,
  )
}
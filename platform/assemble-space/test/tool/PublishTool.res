open Sinon

let buildUI = (~sandbox, ~account=None, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <Publish service account />
}

let publish = (
  ~sandbox,
  ~service,
  ~setVisible=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setIsUploadBegin=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setUploadProgress=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~account=None,
  ~selectedExtensions=list{},
  ~selectedContributes=list{},
  ~canvasData=CanvasControllerTool.buildCanvasData(),
  ~apInspectorData=ApInspectorTool.buildApInspectorData(),
  ~values={
    "appName": "n1",
  },
  (),
) => {
  Publish.Method.onFinish(
    service,
    (setUploadProgress, setIsUploadBegin, setVisible),
    (account, selectedExtensions, selectedContributes, canvasData, apInspectorData),
    values,
  )
}

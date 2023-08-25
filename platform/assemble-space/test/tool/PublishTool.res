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
  ~selectedPackages=list{},
  ~selectedExtensions=list{},
  ~selectedContributes=list{},
  ~storedPackageIdsInApp=list{},
  ~canvasData=CanvasControllerTool.buildCanvasData(),
  ~apInspectorData=ApInspectorTool.buildApInspectorData(),
  ~values={
    "appName": "n1",
    "appDescription": "dp1",
  },
  (),
) => {
  Publish.Method.onFinish(
    service,
    (setUploadProgress, setIsUploadBegin, setVisible),
    (
      account,
      selectedPackages,
      selectedExtensions,
      selectedContributes,
      canvasData,
      apInspectorData,
      storedPackageIdsInApp,
    ),
    values,
  )
}

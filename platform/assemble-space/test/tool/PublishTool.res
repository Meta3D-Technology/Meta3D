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
  ~account="u1"->Some,
  ~selectedPackages=list{},
  ~selectedContributes=list{},
  // ~selectedElements=list{},
  ~selectedUIControls=list{},
  ~selectedUIControlInspectorData=list{},
  ~storedPackageIdsInApp=list{},
  ~isChangeSelectedPackagesByDebug=false,
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
      selectedContributes,
      // selectedElements,
      canvasData,
      apInspectorData,
      storedPackageIdsInApp,
      isChangeSelectedPackagesByDebug,
      selectedUIControls,
      selectedUIControlInspectorData,
    ),
    values,
  )
}

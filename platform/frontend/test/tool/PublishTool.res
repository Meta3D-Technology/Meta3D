open Sinon

let buildUI = (
  ~sandbox,
  ~account=None,
  // ~selectedElementsFromMarket=list{},
  ~service=ServiceTool.build(~sandbox, ()),
  (),
) => {
  <Publish service account />
}

let publish = (
  ~sandbox,
  ~service,
  ~dispatchForAppStore=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setVisible=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setIsUploadBegin=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setUploadProgress=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~account="u1"->Some,
  ~selectedPackages=list{},
  ~selectedContributes=list{},
  // ~selectedElementsFromMarket=list{},
  ~customInputs=list{},
  ~customActions=list{},
  ~selectedUIControls=list{},
  ~selectedUIControlInspectorData=list{},
  ~storedPackageIdsInApp=list{},
  ~isChangeSelectedPackagesByDebug=false,
  ~canvasData=CanvasControllerTool.buildCanvasData(),
  ~apInspectorData=ApInspectorTool.buildApInspectorData(),
  ~previewBase64=None,
  ~values={
    "appName": "n1",
    "appDescription": "dp1",
  },
  (),
) => {
  Publish.Method.onFinish(
    service,
    dispatchForAppStore,
    (setUploadProgress, setIsUploadBegin, setVisible),
    (
      account,
      selectedPackages,
      selectedContributes,
      // selectedElementsFromMarket,
      canvasData,
      apInspectorData,
      storedPackageIdsInApp,
      isChangeSelectedPackagesByDebug,
      selectedUIControls,
      selectedUIControlInspectorData,
      customInputs,
      customActions,
    ),
    previewBase64,
    values,
  )
}

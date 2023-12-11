let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <ApInspector service />
}

let buildApInspectorData = (
  ~isDebug=true,
  ~clearColor=(1., 1., 1., 1.),
  ~skinName=None,
  (),
): ApAssembleStoreType.apInspectorData => {
  isDebug: isDebug,
  clearColor: clearColor,
  skinName: skinName,
}

let setIsDebug = ApInspector.Method.setIsDebug

let setClearColorR = ApInspector.Method.setClearColorR

let setSkinName = ApInspector.Method.setSkinName

let setIsDebug = ApInspector.Method.setIsDebug

let setIsDebug = ApInspector.Method.setIsDebug

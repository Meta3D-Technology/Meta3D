let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <CanvasController service />
}

let addCanvasData = CanvasController.Method.addCanvasData

let setWidth = CanvasController.Method.setWidth

let setHeight = CanvasController.Method.setHeight

// let setZIndex = CanvasController.Method.setZIndex

let buildCanvasData = (
  ~id=IdUtils.generateId(Js.Math.random),
  ~width=0,
  ~height=0,
  // ~zIndex=0,
  (),
): FrontendUtils.ApViewStoreType.canvasData => {
  id: id,
  width: width,
  height: height,
  // zIndex: zIndex,
}

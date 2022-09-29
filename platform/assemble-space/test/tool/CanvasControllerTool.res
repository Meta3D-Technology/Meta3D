let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <CanvasController service />
}

let setWidth = CanvasController.Method.setWidth

let setHeight = CanvasController.Method.setHeight

// let setZIndex = CanvasController.Method.setZIndex

let buildCanvasData = (
  ~width=0,
  ~height=0,
  // ~zIndex=0,
  (),
): FrontendUtils.UIViewStoreType.canvasData => {
  width: width,
  height: height,
  // zIndex: zIndex,
}

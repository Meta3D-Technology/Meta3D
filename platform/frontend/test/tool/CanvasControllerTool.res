let buildUI = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  ~canvasWidthInputTarget=Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic,
  ~canvasHeightInputTarget=Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic,
  (),
) => {
  <CanvasController service canvasWidthInputTarget canvasHeightInputTarget />
}

let setWidth = CanvasController.Method.setWidth

let setHeight = CanvasController.Method.setHeight

// let setZIndex = CanvasController.Method.setZIndex

let buildCanvasData = (
  ~width=0,
  ~height=0,
  // ~zIndex=0,
  (),
): ElementAssembleStoreType.canvasData => {
  width,
  height,
  // zIndex: zIndex,
}

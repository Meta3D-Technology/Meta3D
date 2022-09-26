let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <CanvasController service />
}

let addCanvasData = CanvasController.Method.addCanvasData

let setWidth = CanvasController.Method.setWidth

let setHeight = CanvasController.Method.setHeight

let setZIndex = CanvasController.Method.setZIndex

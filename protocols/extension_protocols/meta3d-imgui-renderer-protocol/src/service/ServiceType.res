type rect = {
  x: float,
  y: float,
  width: float,
  height: float,
}

type color = (float, float, float)

type clearColor = (float, float, float, float)

type service = {
  init: (. StateType.state, Meta3dType.Index.state, bool, Dom.htmlCanvasElement) => StateType.state,
  render: (. StateType.state, Meta3dType.Index.state) => StateType.state,
  clear: (. StateType.state, Meta3dType.Index.state, clearColor) => unit,
  drawBox: (. rect, color, StateType.state) => StateType.state,
}

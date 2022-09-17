type rect = {
  x: float,
  y: float,
  width: float,
  height: float,
}

type color = string

type service = {
  init: (StateType.state, Meta3dType.Index.state, bool, Dom.htmlCanvasElement) => StateType.state,
  render: (StateType.state, Meta3dType.Index.state) => StateType.state,
  drawBox: (rect, color,  StateType.state) => StateType.state,
}

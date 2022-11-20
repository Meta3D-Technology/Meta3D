type rect = {
  x: float,
  y: float,
  width: float,
  height: float,
}

type time = float

type color = (float, float, float)

type clearColor = (float, float, float, float)

type label = string

type size = (int, int)

type pos = (int, int)

// @genType
type service = {
  init: (. StateType.state, bool, bool, Dom.htmlCanvasElement) => Js.Promise.t<StateType.state>,
  render: (. StateType.state) => StateType.state,
  beforeExec: (. StateType.state, time) => StateType.state,
  afterExec: (. StateType.state) => StateType.state,
  clear: (. StateType.state, clearColor) => unit,
  beginWindow: (. label, StateType.state) => StateType.state,
  endWindow: (. StateType.state) => StateType.state,
  setNextWindowRect: (. rect, StateType.state) => StateType.state,
  button: (. label, size, StateType.state) => (StateType.state, bool),
  setCursorPos: (. pos, StateType.state) => StateType.state,
}

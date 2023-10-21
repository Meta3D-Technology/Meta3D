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

type style = string

type texture = Meta3dWebgl1Protocol.ServiceType.texture

type context = Meta3dWebgl1Protocol.ServiceType.webgl1Context

type base64 = string

type imguiImplTexture

// @genType
type service = {
  init: (. StateType.state, bool, bool, Dom.htmlCanvasElement) => Js.Promise.t<StateType.state>,
  render: unit => unit,
  setStyle: (. StateType.state, style) => StateType.state,
  beforeExec: (. StateType.state, time) => StateType.state,
  afterExec: unit => unit,
  clear: (. clearColor) => unit,
  beginWindow: (. label) => unit,
  endWindow: unit => unit,
  setNextWindowRect: (. rect) => unit,
  addFBOTexture: (. Js.Null.t<texture>, rect) => unit,
  getWindowBarHeight: unit => float,
  button: (. label, size) => bool,
  setCursorPos: (. pos) => unit,
  loadBase64Image: (. base64) => imguiImplTexture,
  asset: (
    . {"loadGlbTexture": imguiImplTexture, "glbTexture": imguiImplTexture},
    array<(string, string)>,
    label,
    rect,
  ) => bool,
  handleDragDropTarget: 'data. (. string) => Js.Nullable.t<'data>,
  getContext: unit => context,
}

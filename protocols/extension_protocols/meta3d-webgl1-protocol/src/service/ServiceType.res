open Js.Typed_array

type webgl1Context

type program

type buffer

type attributeLocation = int

type uniformLocation

type shader

type extension

type vaoExtension

type hex

type contextConfigJsObj = {
  "alpha": bool,
  "depth": bool,
  "stencil": bool,
  "antialias": bool,
  "premultipliedAlpha": bool,
  "preserveDrawingBuffer": bool,
}

type canvas = Dom.htmlCanvasElement

type service = {
  getContext: (canvas, contextConfigJsObj) => webgl1Context,
  createProgram: webgl1Context => program,
  linkProgram: (program, webgl1Context) => unit,
  useProgram: (program, webgl1Context) => unit,
  uniformMatrix4fv: (uniformLocation, Float32Array.t, webgl1Context) => unit,
  uniform1i: (uniformLocation, int, webgl1Context) => unit,
  uniform1f: (uniformLocation, float, webgl1Context) => unit,
  uniform3f: (uniformLocation, float, float, float, webgl1Context) => unit,
  getAttribLocation: (program, string, webgl1Context) => attributeLocation,
  getUniformLocation: (program, string, webgl1Context) => uniformLocation,
  shaderSource: (shader, string, webgl1Context) => unit,
  compileShader: (shader, webgl1Context) => unit,
  createShader: (int, webgl1Context) => shader,
  getParameter: (int, webgl1Context) => int,
  getLinkStatus: webgl1Context => int,
  getShaderParameter: (shader, int, webgl1Context) => bool,
  getProgramParameter: (program, int, webgl1Context) => bool,
  getShaderInfoLog: (shader, webgl1Context) => string,
  getProgramInfoLog: (program, webgl1Context) => string,
  attachShader: (program, shader, webgl1Context) => unit,
  deleteShader: (shader, webgl1Context) => unit,
  bindAttribLocation: (program, int, string, webgl1Context) => unit,
  getCompileStatus: webgl1Context => int,
  getVertexShader: webgl1Context => int,
  getFragmentShader: webgl1Context => int,
  createBuffer: webgl1Context => buffer,
  bindBuffer: (int, buffer, webgl1Context) => unit,
  bufferFloat32Data: (int, Float32Array.t, int, webgl1Context) => unit,
  bufferUint16Data: (int, Uint16Array.t, int, webgl1Context) => unit,
  bufferUint32Data: (int, Uint32Array.t, int, webgl1Context) => unit,
  getArrayBuffer: webgl1Context => int,
  getElementArrayBuffer: webgl1Context => int,
  getStaticDraw: webgl1Context => int,
  getDynamicDraw: webgl1Context => int,
  disableVertexAttribArray: (int, webgl1Context) => unit,
  vertexAttribPointer: (attributeLocation, int, int, bool, int, int, webgl1Context) => unit,
  enableVertexAttribArray: (attributeLocation, webgl1Context) => unit,
  getExtension: (string, webgl1Context) => Js.Nullable.t<extension>,
  drawElements: (int, int, int, int, webgl1Context) => unit,
  clearColor: (float, float, float, float, webgl1Context) => unit,
  clear: (int, webgl1Context) => unit,
  enable: (int, webgl1Context) => unit,
  disable: (int, webgl1Context) => unit,
  getFloat: webgl1Context => int,
  getDepthTest: webgl1Context => int,
  getStencilTest: webgl1Context => int,
  getBlend: webgl1Context => int,
  getCullFace: webgl1Context => int,
  getFrontAndBack: webgl1Context => int,
  getBack: webgl1Context => int,
  getFront: webgl1Context => int,
  getCurrentProgram: webgl1Context => int,
  getBindingElementArrayBuffer: webgl1Context => int,
  getBindingArrayBuffer: webgl1Context => int,
  getSrcAlpha: webgl1Context => int,
  getOneMinusSrcAlpha: webgl1Context => int,
  isEnabled: (int, webgl1Context) => bool,
  bindVertexArrayOES: (Js.Nullable.t<buffer>, webgl1Context) => unit,
  blendFunc: (int, int, webgl1Context) => unit,
  getTriangles: webgl1Context => int,
  getTriangleFan: webgl1Context => int,
  getUnsignedInt: webgl1Context => int,
  getUnsignedShort: webgl1Context => int,
}

external parameterIntToNullableProgram: int => Js.Nullable.t<program> = "%identity"

external parameterIntToBuffer: int => buffer = "%identity"

// external parameterIntToNullableTexture : int => Js.Nullable.t<texture> =
//   "%identity"

// external intToHex : int => hex = "%identity"

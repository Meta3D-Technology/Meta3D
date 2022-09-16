open Js.Typed_array

type webgl1Context

type program

type buffer

type attributeLocation = int

type uniformLocation

type shader

type contextConfigJsObj = {
    .
    "alpha": bool,
    "depth": bool,
    "stencil": bool,
    "antialias": bool,
    "premultipliedAlpha": bool,
    "preserveDrawingBuffer": bool
  }

type canvas = Dom.htmlCanvasElement

type service = {
  getContext: (canvas, contextConfigJsObj) => webgl1Context ,
  createProgram: (webgl1Context) => program,
  linkProgram: ( program, webgl1Context) => unit,
  useProgram: ( program, webgl1Context) => unit,
  uniformMatrix4fv: ( uniformLocation, Float32Array.t, webgl1Context) => unit,
  getAttribLocation: ( program, string, webgl1Context) => attributeLocation,
  getUniformLocation: ( program, string, webgl1Context) => uniformLocation,
  shaderSource: ( shader, string, webgl1Context) => unit,
  compileShader: ( shader, webgl1Context) => unit,
  createShader: ( int, webgl1Context) => shader,
  getLinkStatus: (  webgl1Context) => int,
  getShaderParameter: ( shader, int, webgl1Context) => bool,
  getProgramParameter: ( program, int, webgl1Context) => bool,
  getShaderInfoLog: ( shader, webgl1Context) => string,
  getProgramInfoLog: ( program, webgl1Context) => string,
  attachShader: ( program, shader, webgl1Context) => unit,
  deleteShader: ( shader, webgl1Context) => unit,
  bindAttribLocation: ( program, int, string, webgl1Context) => unit,
  disableVertexAttribArray: (  int, webgl1Context) => unit,
  getCompileStatus: (webgl1Context) => int,
  getVertexShader: ( webgl1Context ) => int,
  getFragmentShader: (webgl1Context)=>int,
  createBuffer: (webgl1Context) => buffer,
  bindBuffer: ( int, buffer, webgl1Context) => unit,
  bufferFloat32Data: ( int, Float32Array.t,int,  webgl1Context) => unit,
  bufferUint16Data: ( int, Uint16Array.t,int,  webgl1Context) => unit,
  bufferUint32Data: ( int, Uint32Array.t,int,  webgl1Context) => unit,
  getArrayBuffer: (webgl1Context) => int,
  getElementArrayBuffer: (webgl1Context) => int,
  getDynamicDraw: (webgl1Context) => int
}
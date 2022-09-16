let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dWebgl1Protocol.DependentMapType.dependentExtensionNameMap,
  Meta3dWebgl1Protocol.DependentMapType.dependentContributeNameMap,
  Meta3dWebgl1Protocol.ServiceType.service,
> = (api, _) => {
  getContext: (canvas, contextConfigJsObj) =>{
    ( canvas-> Obj.magic )["getContext"](. "webgl", contextConfigJsObj)
  },
  createProgram: (gl) => {
( gl-> Obj.magic )["createProgram"]()
  },
  linkProgram: ( program, gl) => {
( gl-> Obj.magic )["linkProgram"](. program)
  },
  useProgram: ( program, gl) => {
( gl-> Obj.magic )["useProgram"](. program)
  },
  uniformMatrix4fv: ( location,  value, gl) => {
( gl-> Obj.magic )["uniformMatrix4fv"](. location, false, value)
  },
  getAttribLocation: ( program, name, gl) => {
( gl-> Obj.magic )["getAttribLocation"](. program, name)
  },
  getUniformLocation: ( program, name, gl) => {
( gl-> Obj.magic )["getUniformLocation"](. program, name)

  },
  shaderSource: ( shader, shaderSource, gl) => {
( gl-> Obj.magic )["shaderSource"](. shader, shaderSource)

  },
  compileShader: ( shader, gl) => {
( gl-> Obj.magic )["compileShader"](. shader)

  },
  createShader: ( shaderType, gl) => {
( gl-> Obj.magic )["createShader"](. shaderType)

  },
  getCompileStatus: (gl) => {
( gl-> Obj.magic )["COMPILE_STATUS"]
  },
  getLinkStatus: (gl) => {
( gl-> Obj.magic )["LINK_STATUS"]
  },
  getShaderParameter: ( shader, parameterName, gl) => {
( gl-> Obj.magic )["getShaderParameter"](. shader, parameterName)

  },
  getProgramParameter: ( program, parameterName, gl) => {
( gl-> Obj.magic )["getProgramParameter"](. program, parameterName)

  },
  getShaderInfoLog: ( shader, gl) => {
 ( gl-> Obj.magic )["getShaderInfoLog"](. shader) -> Meta3dCommonlib.NullableSt.getWithDefault("")
  },
  getProgramInfoLog: ( program, gl) => {
( gl-> Obj.magic )["getProgramInfoLog"](. program)-> Meta3dCommonlib.NullableSt.getWithDefault("")
  },
  bindAttribLocation: ( program, index, name, gl) => {
( gl-> Obj.magic )["bindAttribLocation"](. program, index, name)
  },
  disableVertexAttribArray: ( index, gl) => {
( gl-> Obj.magic )["disableVertexAttribArray"](. index)
  },
  attachShader: ( program, shader, gl) => {
( gl-> Obj.magic )["attachShader"](. program, shader)
  },
  deleteShader: ( shader, gl) => {
( gl-> Obj.magic )["deleteShader"](. shader)

  },
  getVertexShader: (gl) => {
( gl-> Obj.magic )["VERTEX_SHADER"]
  },
  getFragmentShader: (  gl) => {
( gl-> Obj.magic )["FRAGMENT_SHADER"]

  },
  createBuffer: (gl) => {
( gl-> Obj.magic )["createBuffer"]()
  },
  bindBuffer: ( arrayBufferType, buffer, gl) => {
( gl-> Obj.magic )["bindBuffer"](. arrayBufferType, buffer)
  },
  bufferFloat32Data: ( arrayBufferType,  bufferData,arrayBufferUpdateType,  gl) => {
( gl-> Obj.magic )["bufferData"](. arrayBufferType, bufferData, arrayBufferUpdateType)
  },
  bufferUint16Data: ( arrayBufferType,  bufferData,arrayBufferUpdateType,  gl) => {
( gl-> Obj.magic )["bufferData"](. arrayBufferType, bufferData, arrayBufferUpdateType)
  },
  bufferUint32Data: ( arrayBufferType,  bufferData,arrayBufferUpdateType,  gl) => {
( gl-> Obj.magic )["bufferData"](. arrayBufferType, bufferData, arrayBufferUpdateType)
  },
  getArrayBuffer: (gl) => {
( gl-> Obj.magic )["ARRAY_BUFFER"]
  },
  getElementArrayBuffer: (gl) => {

( gl-> Obj.magic )["ELEMENT_ARRAY_BUFFER"]
  },
  getDynamicDraw: (gl) => {
( gl-> Obj.magic )["DYNAMIC_DRAW"]
  },
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dWebgl1Protocol.StateType.state,
> = () => {
  ()
}

let getExtensionLife: Meta3dType.Index.getExtensionLife<
  Meta3dWebgl1Protocol.ServiceType.service,
> = (_, _) => {
  {
    onRegister: Js.Nullable.null,
    onStart: Js.Nullable.null,
  }
}

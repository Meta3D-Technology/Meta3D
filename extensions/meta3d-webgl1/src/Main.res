let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dWebgl1Protocol.DependentMapType.dependentExtensionNameMap,
  Meta3dWebgl1Protocol.DependentMapType.dependentContributeNameMap,
  Meta3dWebgl1Protocol.ServiceType.service,
> = (api, _) => {
  getContext: (. canvas, contextConfigJsObj) => {
    (canvas->Obj.magic)["getContext"](. "webgl", contextConfigJsObj)
  },
  createProgram: (. gl) => {
    (gl->Obj.magic)["createProgram"]()
  },
  linkProgram: (. program, gl) => {
    (gl->Obj.magic)["linkProgram"](. program)
  },
  useProgram: (. program, gl) => {
    (gl->Obj.magic)["useProgram"](. program)
  },
  uniformMatrix4fv: (. location, value, gl) => {
    (gl->Obj.magic)["uniformMatrix4fv"](. location, false, value)
  },
  uniform1i: (. location, value, gl) => {
    (gl->Obj.magic)["uniform1i"](. location, value)
  },
  uniform1f: (. location, value, gl) => {
    (gl->Obj.magic)["uniform1f"](. location, value)
  },
  uniform3f: (. location, value1, value2, value3, gl) => {
    (gl->Obj.magic)["uniform3f"](. location, value1, value2, value3)
  },
  getAttribLocation: (. program, name, gl) => {
    (gl->Obj.magic)["getAttribLocation"](. program, name)
  },
  getUniformLocation: (. program, name, gl) => {
    (gl->Obj.magic)["getUniformLocation"](. program, name)
  },
  shaderSource: (. shader, shaderSource, gl) => {
    (gl->Obj.magic)["shaderSource"](. shader, shaderSource)
  },
  compileShader: (. shader, gl) => {
    (gl->Obj.magic)["compileShader"](. shader)
  },
  createShader: (. shaderType, gl) => {
    (gl->Obj.magic)["createShader"](. shaderType)
  },
  getParameter: (. pname, gl) => {
    (gl->Obj.magic)["getParameter"](. pname)
  },
  getCompileStatus: (. gl) => {
    (gl->Obj.magic)["COMPILE_STATUS"]
  },
  getLinkStatus: (. gl) => {
    (gl->Obj.magic)["LINK_STATUS"]
  },
  getShaderParameter: (. shader, parameterName, gl) => {
    (gl->Obj.magic)["getShaderParameter"](. shader, parameterName)
  },
  getProgramParameter: (. program, parameterName, gl) => {
    (gl->Obj.magic)["getProgramParameter"](. program, parameterName)
  },
  getShaderInfoLog: (. shader, gl) => {
    (gl->Obj.magic)["getShaderInfoLog"](. shader)->Meta3dCommonlib.NullableSt.getWithDefault("")
  },
  getProgramInfoLog: (. program, gl) => {
    (gl->Obj.magic)["getProgramInfoLog"](. program)->Meta3dCommonlib.NullableSt.getWithDefault("")
  },
  bindAttribLocation: (. program, index, name, gl) => {
    (gl->Obj.magic)["bindAttribLocation"](. program, index, name)
  },
  attachShader: (. program, shader, gl) => {
    (gl->Obj.magic)["attachShader"](. program, shader)
  },
  deleteShader: (. shader, gl) => {
    (gl->Obj.magic)["deleteShader"](. shader)
  },
  getVertexShader: (. gl) => {
    (gl->Obj.magic)["VERTEX_SHADER"]
  },
  getFragmentShader: (. gl) => {
    (gl->Obj.magic)["FRAGMENT_SHADER"]
  },
  createBuffer: (. gl) => {
    (gl->Obj.magic)["createBuffer"]()
  },
  bindBuffer: (. arrayBufferType, buffer, gl) => {
    (gl->Obj.magic)["bindBuffer"](. arrayBufferType, buffer)
  },
  bufferFloat32Data: (. arrayBufferType, bufferData, arrayBufferUpdateType, gl) => {
    (gl->Obj.magic)["bufferData"](. arrayBufferType, bufferData, arrayBufferUpdateType)
  },
  bufferUint16Data: (. arrayBufferType, bufferData, arrayBufferUpdateType, gl) => {
    (gl->Obj.magic)["bufferData"](. arrayBufferType, bufferData, arrayBufferUpdateType)
  },
  bufferUint32Data: (. arrayBufferType, bufferData, arrayBufferUpdateType, gl) => {
    (gl->Obj.magic)["bufferData"](. arrayBufferType, bufferData, arrayBufferUpdateType)
  },
  getArrayBuffer: (. gl) => {
    (gl->Obj.magic)["ARRAY_BUFFER"]
  },
  getElementArrayBuffer: (. gl) => {
    (gl->Obj.magic)["ELEMENT_ARRAY_BUFFER"]
  },
  getStaticDraw: (. gl) => {
    (gl->Obj.magic)["STATIC_DRAW"]
  },
  getDynamicDraw: (. gl) => {
    (gl->Obj.magic)["DYNAMIC_DRAW"]
  },
  disableVertexAttribArray: (. index, gl) => {
    (gl->Obj.magic)["disableVertexAttribArray"](. index)
  },
  vertexAttribPointer: (. attributeLocation, size, _type, normalized, stride, offset, gl) => {
    (gl->Obj.magic)["vertexAttribPointer"](.
      attributeLocation,
      size,
      _type,
      normalized,
      stride,
      offset,
    )
  },
  enableVertexAttribArray: (. attributeLocation, gl) => {
    (gl->Obj.magic)["enableVertexAttribArray"](. attributeLocation)
  },
  getExtension: (. name, gl) => {
    (gl->Obj.magic)["getExtension"](. name)
  },
  drawElements: (. mode, count, _type, offset, gl) => {
    (gl->Obj.magic)["drawElements"](. mode, count, _type, offset)
  },
  clearColor: (. red, green, blue, alpha, gl) => {
    (gl->Obj.magic)["clearColor"](. red, green, blue, alpha)
  },
  clear: (. mask, gl) => {
    (gl->Obj.magic)["clear"](. mask)
  },
  enable: (. capability, gl) => {
    (gl->Obj.magic)["enable"](. capability)
  },
  disable: (. capability, gl) => {
    (gl->Obj.magic)["disable"](. capability)
  },
  getFloat: (. gl) => {
    (gl->Obj.magic)["FLOAT"]
  },
  getDepthTest: (. gl) => {
    (gl->Obj.magic)["DEPTH_TEST"]
  },
  getStencilTest: (. gl) => {
    (gl->Obj.magic)["STENCIL_TEST"]
  },
  getBlend: (. gl) => {
    (gl->Obj.magic)["BLEND"]
  },
  getCullFace: (. gl) => {
    (gl->Obj.magic)["CULL_FACE"]
  },
  getFrontAndBack: (. gl) => {
    (gl->Obj.magic)["FRONT_AND_BACK"]
  },
  getBack: (. gl) => {
    (gl->Obj.magic)["BACK"]
  },
  getFront: (. gl) => {
    (gl->Obj.magic)["FRONT"]
  },
  getCurrentProgram: (. gl) => {
    (gl->Obj.magic)["CURRENT_PROGRAM"]
  },
  getBindingElementArrayBuffer: (. gl) => {
    (gl->Obj.magic)["ELEMENT_ARRAY_BUFFER_BINDING"]
  },
  getBindingArrayBuffer: (. gl) => {
    (gl->Obj.magic)["ARRAY_BUFFER_BINDING"]
  },
  getSrcAlpha: (. gl) => {
    (gl->Obj.magic)["SRC_ALPHA"]
  },
  getOneMinusSrcAlpha: (. gl) => {
    (gl->Obj.magic)["ONE_MINUS_SRC_ALPHA"]
  },
  isEnabled: (. capability, gl) => {
    (gl->Obj.magic)["isEnabled"](. capability)
  },
  bindVertexArrayOES: (. arrayObject, gl) => {
    (gl->Obj.magic)["bindVertexArrayOES"](. arrayObject)
  },
  blendFunc: (. sfactor, dfactor, gl) => {
    (gl->Obj.magic)["blendFunc"](. sfactor, dfactor)
  },
  getTriangles: (. gl) => {
    (gl->Obj.magic)["TRIANGLES"]
  },
  getTriangleFan: (. gl) => {
    (gl->Obj.magic)["TRIANGLE_FAN"]
  },
  getUnsignedInt: (. gl) => {
    (gl->Obj.magic)["UNSIGNED_INT"]
  },
  getUnsignedShort: (. gl) => {
    (gl->Obj.magic)["UNSIGNED_SHORT"]
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

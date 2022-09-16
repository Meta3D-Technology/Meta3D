open Meta3dWebgl1Protocol.ServiceType

open Js.Typed_array

let _createArrayBuffer = (
  {createBuffer, bindBuffer, getArrayBuffer, bufferFloat32Data, getDynamicDraw},
  gl,
) => {
  let buffer = gl->createBuffer

  bindBuffer(getArrayBuffer(gl), buffer, gl)

  bufferFloat32Data(getArrayBuffer(gl), Float32Array.make([]), getDynamicDraw(gl), gl)

  buffer
}

let _createElementArrayBuffer = (
  {createBuffer, bindBuffer, getElementArrayBuffer, bufferUint16Data, getDynamicDraw},
  gl,
) => {
  let buffer = gl->createBuffer

  bindBuffer(getElementArrayBuffer(gl), buffer, gl)

  bufferUint16Data(getElementArrayBuffer(gl), Uint16Array.make([]), getDynamicDraw(gl), gl)

  buffer
}

let _buildOrthoProjectionMat4TypeArr = ((canvasWidth, canvasHeight)) =>
  Matrix4Service.ortho(
    0.,
    canvasWidth->NumberType.intToFloat,
    canvasHeight->NumberType.intToFloat,
    0.,
    -1.,
    1.,
    Matrix4Service.createIdentityMatrix4(),
  )

let _sendUniformProjectionMatData = (
  {getUniformLocation, uniformMatrix4fv},
  gl,
  program,
  canvasSize,
) =>
  uniformMatrix4fv(
    getUniformLocation(program, "u_projectionMat", gl),
    _buildOrthoProjectionMat4TypeArr(canvasSize),
    gl,
  )

let _sendNoTextureProgramUniformData = ({useProgram} as webgl1Service, gl, program, canvasSize) => {
  useProgram(program, gl)

  _sendUniformProjectionMatData(webgl1Service, gl, program, canvasSize)

  ()
}

let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dImguiRendererProtocol.DependentMapType.dependentExtensionNameMap,
  Meta3dImguiRendererProtocol.DependentMapType.dependentContributeNameMap,
  Meta3dImguiRendererProtocol.ServiceType.service,
> = (api, (dependentExtensionNameMap, _)) => {
  let {meta3dWebGL1ExtensionName} = dependentExtensionNameMap

  {
    init: (state, meta3dState, isDebug, canvas) => {
      let {
        getContext,
        createProgram,
        getAttribLocation,
      }: Meta3dWebgl1Protocol.ServiceType.service as webgl1Service = api.getExtensionService(.
        meta3dState,
        meta3dWebGL1ExtensionName,
      )

      let gl = getContext(
        canvas,
        {
          "alpha": true,
          "depth": true,
          "stencil": false,
          "antialias": true,
          "premultipliedAlpha": true,
          "preserveDrawingBuffer": false,
        },
      )

      let noTextureProgram =
        gl
        ->createProgram
        ->ProgramService.initShader(
          webgl1Service,
          ShaderData.vs_noTexture,
          ShaderData.fs_noTexture,
          gl,
          isDebug,
          _,
        )

      let canvasSize = ((canvas->Obj.magic)["width"], (canvas->Obj.magic)["height"])

      _sendNoTextureProgramUniformData(webgl1Service, gl, noTextureProgram, canvasSize)

      //   webglData: Some({
      //     customTextureShaderData: {
      //       program: customTextureProgram,
      //       aPositonLocation: gl |> getAttribLocation(customTextureProgram, "a_position"),
      //       aColorLocation: gl |> getAttribLocation(customTextureProgram, "a_color"),
      //       aTexCoordLocation: gl |> getAttribLocation(customTextureProgram, "a_texCoord"),
      //       positionBuffer: _createArrayBuffer(gl),
      //       colorBuffer: _createArrayBuffer(gl),
      //       texCoordBuffer: _createArrayBuffer(gl),
      //       indexBuffer: _createElementArrayBuffer(gl),
      //     },
      //     fontTextureShaderData: {
      //       program: fontTextureProgram,
      //       aPositonLocation: gl |> getAttribLocation(fontTextureProgram, "a_position"),
      //       aColorLocation: gl |> getAttribLocation(fontTextureProgram, "a_color"),
      //       aTexCoordLocation: gl |> getAttribLocation(fontTextureProgram, "a_texCoord"),
      //       positionBuffer: _createArrayBuffer(gl),
      //       colorBuffer: _createArrayBuffer(gl),
      //       texCoordBuffer: _createArrayBuffer(gl),
      //       indexBuffer: _createElementArrayBuffer(gl),
      //     },
      //     noTextureShaderData: {
      //       program: noTextureProgram,
      //       aPositonLocation: gl |> getAttribLocation(noTextureProgram, "a_position"),
      //       aColorLocation: gl |> getAttribLocation(noTextureProgram, "a_color"),
      //       positionBuffer: _createArrayBuffer(gl),
      //       colorBuffer: _createArrayBuffer(gl),
      //       indexBuffer: _createElementArrayBuffer(gl),
      //     },
      //     fontTexture: fontTexture,
      //     lastWebglData: None,
      //   }),

      (
        {
          ...state->StateType.protocolStateToState,
          isDebug: isDebug,
          gl: gl->Some,
          noTextureShaderData: {
            program: noTextureProgram,
            aPositonLocation: gl->getAttribLocation(noTextureProgram, "a_position", _),
            aColorLocation: gl->getAttribLocation(noTextureProgram, "a_color", _),
            positionBuffer: _createArrayBuffer(webgl1Service, gl),
            colorBuffer: _createArrayBuffer(webgl1Service, gl),
            indexBuffer: _createElementArrayBuffer(webgl1Service, gl),
          }->Some,
        }: StateType.state
      )->StateType.stateToProtocolState
    },
  }
}

let createExtensionState: Meta3dType.Index.createExtensionState<StateType.state> = () => {
  isDebug: false,
  gl: None,
  noTextureShaderData: None,
  lastWebglData: None,
}

let getExtensionLife: Meta3dType.Index.getExtensionLife<
  Meta3dImguiRendererProtocol.ServiceType.service,
> = (_, _) => {
  {
    onRegister: Js.Nullable.null,
    onStart: Js.Nullable.null,
  }
}

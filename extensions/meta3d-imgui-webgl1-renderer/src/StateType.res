open Meta3dWebgl1Protocol.ServiceType

type lastWebglData = {
  lastProgram: option<program>,
  lastElementArrayBuffer: buffer,
  lastArrayBuffer: buffer,
  // lastTexture: option<texture>,
  lastIsEnableDepthTest: bool,
  lastIsEnableBlend: bool,
}

type noTextureShaderData = {
  program: program,
  aPositonLocation: attributeLocation,
  aColorLocation: attributeLocation,
  positionBuffer: buffer,
  colorBuffer: buffer,
  indexBuffer: buffer,
}

type state = {
  isDebug:bool,
  gl: option<webgl1Context>,
//   customTextureShaderData: customTextureShaderData,
//   fontTextureShaderData: fontTextureShaderData,
  noTextureShaderData: option<noTextureShaderData>,
//   fontTexture: texture,
  lastWebglData: option<lastWebglData>,
}

external protocolStateToState: Meta3dImguiRendererProtocol.StateType.state  => state = "%identity"

external stateToProtocolState: state => Meta3dImguiRendererProtocol.StateType.state = "%identity"

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

type drawData = {
  noTextureDrawData: DrawDataType.noTextureDrawData,
  //   customTextureDrawData: DrawDataType.customTextureDrawData,
  //   fontTextureDrawData: DrawDataType.fontTextureDrawData,
  //   customTextureDrawDataMap: WonderCommonlib.MutableHashMapService.t<
  //     DrawDataType.customTextureDrawData,
  //   >,
}

type state = {
  isDebug: bool,
  drawData: option<drawData>,
  gl: option<webgl1Context>,
  //   customTextureShaderData: customTextureShaderData,
  //   fontTextureShaderData: fontTextureShaderData,
  noTextureShaderData: option<noTextureShaderData>,
  //   fontTexture: texture,
  lastWebglData: option<lastWebglData>,
}

external protocolStateToState: Meta3dImguiRendererProtocol.StateType.state => state = "%identity"

external stateToProtocolState: state => Meta3dImguiRendererProtocol.StateType.state = "%identity"

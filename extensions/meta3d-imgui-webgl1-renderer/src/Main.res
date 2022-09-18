open Meta3dWebgl1Protocol.ServiceType

open Js.Typed_array

let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dImguiRendererProtocol.DependentMapType.dependentExtensionNameMap,
  Meta3dImguiRendererProtocol.DependentMapType.dependentContributeNameMap,
  Meta3dImguiRendererProtocol.ServiceType.service,
> = (api, (dependentExtensionNameMap, _)) => {
  let {meta3dWebGL1ExtensionName} = dependentExtensionNameMap

  {
    init: (. state, meta3dState, isDebug, canvas) => {
      let webgl1Service: Meta3dWebgl1Protocol.ServiceType.service = api.getExtensionService(.
        meta3dState,
        meta3dWebGL1ExtensionName,
      )

InitService.init(state,
    webgl1Service, isDebug, canvas)
    },
    render: (. state, meta3dState) => {
      let webgl1Service: Meta3dWebgl1Protocol.ServiceType.service = api.getExtensionService(.
        meta3dState,
        meta3dWebGL1ExtensionName,
      )

      RenderService.render(
        state->StateType.protocolStateToState,
        meta3dState,
        webgl1Service,
      )->StateType.stateToProtocolState
    },
    drawBox:(. rect, color, state) => DrawBoxIMGUIService.draw(rect, color, state -> StateType.protocolStateToState) -> StateType.stateToProtocolState
  }
}

let createExtensionState: Meta3dType.Index.createExtensionState<StateType.state> = () => {
  isDebug: false,
  drawData: RenderService.createEmptyDrawData()->Some,
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

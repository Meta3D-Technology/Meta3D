let createState = () => {
  Main.createExtensionState()
}

let init = (
  ~sandbox,
  ~webgl1Service=WebGL1ServiceTool.buildService(~sandbox, ()),
  ~state=createState(),
  ~isDebug=false,
  ~canvas=10->Obj.magic,
  (),
) => {
  InitService.init(
    state->StateType.stateToProtocolState,
    webgl1Service,
    isDebug,
    canvas,
  )->StateType.protocolStateToState
}

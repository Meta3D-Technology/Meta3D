let getState = (
  states: Meta3dWorkPluginRootProtocol.StateType.states,
): Meta3dWorkPluginRootProtocol.StateType.state => {
  (states->Obj.magic)[Meta3dWorkPluginRootProtocol.StateType.workPluginName->Obj.magic]
}

let getState = (
  states: Meta3dWorkPluginRootProtocol.Index.states,
): Meta3dWorkPluginRootProtocol.Index.state => {
  (states->Obj.magic)[Meta3dWorkPluginRootProtocol.Index.workPluginName->Obj.magic]
}

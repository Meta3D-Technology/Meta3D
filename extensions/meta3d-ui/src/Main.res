let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dUiProtocol.DependentExtensionType.dependentExtensionNameMap,
  Meta3dUiProtocol.ServiceType.service,
> = (api, _) => {
  register: UIManager.register->Obj.magic,
  markRender: UIManager.markRender,
  markNotRender: UIManager.markNotRender,
  getExecState: UIManager.getExecState,
  drawButton: UIManager.drawButton,
  render: UIManager.render(api)->Obj.magic,
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dUiProtocol.StateType.state,
> = () => {
  {
    execFuncMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    execStateMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    isRenderMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  }
}

let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dUiProtocol.DependentExtensionType.dependentExtensionNameMap,
  Meta3dUiProtocol.ServiceType.service,
> = (api, _) => {
  register: UIManager.register->Obj.magic,
  hide: UIManager.hide,
  show: UIManager.show,
  getExecState: UIManager.getExecState->Obj.magic,
  drawButton: UIManager.drawButton,
  render: UIManager.render(api)->Obj.magic,
  combineReducers: UIManager.combineReducers->Obj.magic,
  dispatch: UIManager.dispatch,
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dUiProtocol.StateType.state,
> = () => {
  {
    execFuncMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    execStateMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    isShowMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    isStateChangeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    reducers: [],
  }
}

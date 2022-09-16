let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dUiProtocol.DependentMapType.dependentExtensionNameMap,
  Meta3dUiProtocol.DependentMapType.dependentContributeNameMap,
  Meta3dUiProtocol.ServiceType.service,
> = (api, (dependentExtensionNameMap, _)) => {
let {meta3dImguiRendererExtensionName} = dependentExtensionNameMap

{   registerElement: UIManager.registerElement->Obj.magic,
  registerSkin: UIManager.registerSkin,
  registerCustomControl: UIManager.registerCustomControl,
  getSkin: UIManager.getSkinExn->Obj.magic,
  getCustomControl: UIManager.getCustomControlExn->Obj.magic,
  hide: UIManager.hide,
  show: UIManager.show,
  isStateChange: UIManager.isStateChange,
  getElementState: UIManager.getElementState->Obj.magic,
  drawBox: UIManager.drawBox,
  drawText: UIManager.drawText,
  getIOData: UIManager.getIODataExn,
  render: UIManager.render(api)->Obj.magic,
  combineReducers: UIManager.combineReducers->Obj.magic,
  dispatch: UIManager.dispatch,
  init: UIManager.init
   }
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dUiProtocol.StateType.state,
> = () => {
  {
    elementFuncMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    elementStateMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    elementExecOrderMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    isShowMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    isStateChangeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    skinContributeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    customControlContributeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    ioData: None,
    reducers: [],
    imguiData: ManageIMGUIService.createData()
  }
}

let getExtensionLife: Meta3dType.Index.getExtensionLife<
  Meta3dUiProtocol.ServiceType.service,
> = (_, _) => {
  {
    onRegister: Js.Nullable.null,
    onStart: Js.Nullable.null,
  }
}

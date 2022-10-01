let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dEventProtocol.DependentMapType.dependentExtensionNameMap,
  Meta3dEventProtocol.DependentMapType.dependentContributeNameMap,
  Meta3dEventProtocol.ServiceType.service,
> = (api, _) => {
  trigger: EventManager.trigger(api)->Obj.magic,
  registerAction: EventManager.registerAction->Obj.magic,
  onPointEvent: EventManager.onPointEvent(api),
  initEvent: EventManager.initEvent(api),
  setBrowser: EventManager.setBrowser(api),
  setCanvas: EventManager.setCanvas(api),
  setBody: EventManager.setBody(api),
  getBrowserChromeType: EventManager.getBrowserChromeType,
  getBrowserFirefoxType: EventManager.getBrowserFirefoxType,
  getBrowserAndroidType: EventManager.getBrowserAndroidType,
  getBrowserIOSType: EventManager.getBrowserIOSType,
  getBrowserUnknownType: EventManager.getBrowserUnknownType,
  getPointDownEventName: EventManager.getPointDownEventName,
  getPointUpEventName: EventManager.getPointUpEventName,
  getPointTapEventName: EventManager.getPointTapEventName,
  getPointMoveEventName: EventManager.getPointMoveEventName,
  getPointScaleEventName: EventManager.getPointScaleEventName,
  getPointDragStartEventName: EventManager.getPointDragStartEventName,
  getPointDragOverEventName: EventManager.getPointDragOverEventName,
}

let createExtensionState: Meta3dType.Index.createExtensionState<StateType.state> = () => {
  EventManager.createExtensionState()
}

let getExtensionLife: Meta3dType.Index.getExtensionLife<Meta3dEventProtocol.ServiceType.service> = (
  _,
  _,
) => {
  {
    onRegister: Js.Nullable.null,
    onStart: Js.Nullable.null,
    onInit: Js.Nullable.null,
    onUpdate: Js.Nullable.null,
  }
}

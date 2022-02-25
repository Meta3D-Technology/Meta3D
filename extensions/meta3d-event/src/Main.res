let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dEventProtocol.DependentExtensionType.dependentExtensionNameMap,
  Meta3dEventProtocol.ServiceType.service,
> = (api, _) => {
  trigger: EventManager.trigger(api)->Obj.magic,
  onCustomEvent: EventManager.onCustomEvent->Obj.magic,
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dEventProtocol.StateType.state,
> = () => {
  EventManager.createExtensionState()
}

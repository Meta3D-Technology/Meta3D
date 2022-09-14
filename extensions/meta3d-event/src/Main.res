let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dEventProtocol.DependentMapType.dependentExtensionNameMap,
  Meta3dEventProtocol.DependentMapType.dependentContributeNameMap,
  Meta3dEventProtocol.ServiceType.service,
> = (api, _) => {
  trigger: EventManager.trigger(api)->Obj.magic,
  registerEvent: EventManager.registerEvent->Obj.magic,
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dEventProtocol.StateType.state,
> = () => {
  EventManager.createExtensionState()
}

let getExtensionLife: Meta3dType.Index.getExtensionLife< 
  Meta3dEventProtocol.ServiceType.service,
> = (_, _) => {
  {
    onRegister: Js.Nullable.null,
    onStart: Js.Nullable.null,
  }
}

let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dCoreProtocol.ServiceType.service,
> = api => {
  engineBasic: meta3dState =>
    api.getExtensionService(. meta3dState, "meta3d-engine-basic-protocol")->Obj.magic,
  engineCore: meta3dState => api.getExtensionService(. meta3dState, "meta3d-engine-core-protocol"),
  most: meta3dState => api.getExtensionService(. meta3dState, "meta3d-bs-most-protocol"),
  // immutable: meta3dState =>
  //   api.getExtensionService(. meta3dState, "meta3d-immutable-protocol")->Obj.magic,
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dCoreProtocol.StateType.state,
> = (. _, _) => Js.Nullable.null->Obj.magic

let getExtensionLife: Meta3dType.Index.getExtensionLife<Meta3dCoreProtocol.ServiceType.service> = (
  api,
  extensionProtocolName,
) => {
  {
    onRegister: Js.Nullable.null,
    onRestore: Js.Nullable.null,
    onDeepCopy: Js.Nullable.null,
    onStart: Js.Nullable.null,
    onInit: Js.Nullable.null,
    onUpdate: Js.Nullable.null,
  }
}

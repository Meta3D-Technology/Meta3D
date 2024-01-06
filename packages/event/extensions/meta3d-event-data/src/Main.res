let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dEventDataProtocol.ServiceType.service,
> = api => {
  parseEventData: ParseEventData.parse,
  generateEventDataBuffer: ExportEventData.generateEventDataBuffer,
  exportEventData: ExportEventData.export,
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dEventDataProtocol.StateType.state,
> = (. _, _) => {}

let getExtensionLife: Meta3dType.Index.getExtensionLife<
  Meta3dEventDataProtocol.ServiceType.service,
> = (api, extensionProtocolName) => {
  {
    onRegister: Js.Nullable.null,
    onRestore: Js.Nullable.null,
    onDeepCopy: Js.Nullable.null,
    onStart: Js.Nullable.null,
    onInit: Js.Nullable.null,
    onUpdate: Js.Nullable.null,
  }
}

type service = {
  ui: Meta3dType.Index.state => Meta3dUiProtocol.ServiceType.service,
  event: Meta3dType.Index.state => Meta3dEventProtocol.ServiceType.service,
}

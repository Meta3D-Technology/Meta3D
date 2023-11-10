type service = {
  engineCore: (Meta3dType.Index.state) => Meta3dEngineCoreProtocol.ServiceType.service,
  most: (Meta3dType.Index.state) =>Meta3dBsMostProtocol.ServiceType.service,
}

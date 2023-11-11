type engineBasicService

type service = {
  engineBasic: Meta3dType.Index.state => engineBasicService,
  engineCore: Meta3dType.Index.state => Meta3dEngineCoreProtocol.ServiceType.service,
  most: Meta3dType.Index.state => Meta3dBsMostProtocol.ServiceType.service,
  // prepare: (Meta3dType.Index.state, bool) => Meta3dType.Index.state,
}

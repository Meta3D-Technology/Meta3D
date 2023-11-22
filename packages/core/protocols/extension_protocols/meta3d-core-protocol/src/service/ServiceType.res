type engineBasicService

type immutableService

type service = {
  engineBasic: Meta3dType.Index.state => engineBasicService,
  engineCore: Meta3dType.Index.state => Meta3dEngineCoreProtocol.ServiceType.service,
  most: Meta3dType.Index.state => Meta3dBsMostProtocol.ServiceType.service,
  immutable: Meta3dType.Index.state => immutableService,
  // prepare: (Meta3dType.Index.state, bool) => Meta3dType.Index.state,
}

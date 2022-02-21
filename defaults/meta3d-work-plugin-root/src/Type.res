type state = {mostService: Meta3dBsMostProtocol.ServiceType.service}

type config = Meta3dBsMostProtocol.ServiceType.service

type states = {"meta3d-work-plugin-root": state}

type execFunc = Meta3dEngineCoreProtocol.IWorkForJs.execFunc<states>

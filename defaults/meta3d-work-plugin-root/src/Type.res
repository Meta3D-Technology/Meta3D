type state = {mostService: Meta3dBsMostType.ServiceType.service}

type config = Meta3dBsMostType.ServiceType.service

type states = {"meta3d-work-plugin-root": state}

type execFunc = Meta3dEngineCoreType.IWorkForJs.execFunc<states>

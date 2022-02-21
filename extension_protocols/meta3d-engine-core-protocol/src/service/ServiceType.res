type dependentExtensionNameMap = {meta3dBsMostExtensionName: string}

type service = {
  prepare: unit => unit,
  init: StateType.state => StateType.state,
  registerWorkPlugin: (
    ~state: StateType.state,
    ~data: WorkManagerType.workPluginContribute,
    ~jobOrders: RegisterWorkPluginVOType.jobOrders=?,
    unit,
  ) => StateType.state,
  unregisterWorkPlugin: (StateType.state, string) => StateType.state,
  runPipeline: (
    StateType.state,
    (
      Meta3dType.Index.state,
      Meta3dType.Index.api,
      dependentExtensionNameMap,
    ),
    PipelineType.pipelineName,
  ) => Meta3dBsMostProtocol.ServiceType.stream<StateType.state>,
}

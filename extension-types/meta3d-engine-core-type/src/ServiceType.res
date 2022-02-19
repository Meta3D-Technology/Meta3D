type dependentExtensionNameMap = {meta3dBsMostExtensionName: string}

type service = {
  prepare: unit => unit,
  init: StateType.state => StateType.state,
  registerWorkPlugin: (
    ~state: StateType.state,
    ~data: WorkManagerType.registeredWorkPlugin,
    ~jobOrders: RegisterWorkPluginVOType.jobOrders=?,
    unit,
  ) => StateType.state,
  unregisterWorkPlugin: (StateType.state, string) => StateType.state,
  runPipeline: (
    StateType.state,
    (
      Meta3dType.ExtensionManagerType.state,
      Meta3dType.ExtensionManagerType.api,
      dependentExtensionNameMap,
    ),
    PipelineType.pipelineName,
  ) => Meta3dBsMostType.ServiceType.stream<StateType.state>,
}

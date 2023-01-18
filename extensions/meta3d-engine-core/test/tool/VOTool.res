let convertJobOrdersDOToVO = jobOrders => {
  jobOrders->Meta3dCommonlib.ArraySt.map((
    {
      pipelineName,
      insertElementName,
      insertAction,
    } as jobOrder: Meta3dEngineCoreProtocol.RegisterPipelineType.jobOrder,
  ): Meta3dEngineCoreProtocol.RegisterPipelineVOType.jobOrder => {
    pipelineName: pipelineName,
    insertElementName: insertElementName,
    insertAction: switch insertAction {
    | Meta3dEngineCoreProtocol.RegisterPipelineType.Before => #before
    | Meta3dEngineCoreProtocol.RegisterPipelineType.After => #after
    },
  })
}

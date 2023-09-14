let convertJobOrdersDOToVO = jobOrders => {
  jobOrders->Meta3dCommonlib.ArraySt.map((
    {
      pipelineName,
      insertElementName,
      insertAction,
    } as jobOrder: Meta3dEngineCoreSceneviewProtocol.RegisterPipelineType.jobOrder,
  ): Meta3dEngineCoreSceneviewProtocol.RegisterPipelineVOType.jobOrder => {
    pipelineName: pipelineName,
    insertElementName: insertElementName,
    insertAction: switch insertAction {
    | Meta3dEngineCoreSceneviewProtocol.RegisterPipelineType.Before => #before
    | Meta3dEngineCoreSceneviewProtocol.RegisterPipelineType.After => #after
    },
  })
}

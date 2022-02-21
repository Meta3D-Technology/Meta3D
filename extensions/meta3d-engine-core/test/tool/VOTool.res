let convertJobOrdersDOToVO = jobOrders => {
  jobOrders->Meta3dCommonlib.ArraySt.map((
    {
      pipelineName,
      insertElementName,
      insertAction,
    } as jobOrder: Meta3dEngineCoreProtocol.RegisterWorkPluginType.jobOrder,
  ): Meta3dEngineCoreProtocol.RegisterWorkPluginVOType.jobOrder => {
    pipelineName: pipelineName,
    insertElementName: insertElementName,
    insertAction: switch insertAction {
    | Meta3dEngineCoreProtocol.RegisterWorkPluginType.Before => #before
    | Meta3dEngineCoreProtocol.RegisterWorkPluginType.After => #after
    },
  })
}

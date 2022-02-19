let convertJobOrdersDOToVO = jobOrders => {
  jobOrders->Meta3dCommonlib.ArraySt.map((
    {
      pipelineName,
      insertElementName,
      insertAction,
    } as jobOrder: Meta3dEngineCoreType.RegisterWorkPluginType.jobOrder,
  ): Meta3dEngineCoreType.RegisterWorkPluginVOType.jobOrder => {
    pipelineName: pipelineName,
    insertElementName: insertElementName,
    insertAction: switch insertAction {
    | Meta3dEngineCoreType.RegisterWorkPluginType.Before => #before
    | Meta3dEngineCoreType.RegisterWorkPluginType.After => #after
    },
  })
}

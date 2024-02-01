let createState = (
  ~contribute: Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
    StateType.state,
    Meta3dComponentScriptProtocol.Index.config,
    
    Meta3dComponentScriptProtocol.Index.needDisposedComponents,
    Meta3dComponentScriptProtocol.Index.batchDisposeData,
    Meta3dComponentScriptProtocol.Index.cloneConfig,
    Meta3dComponentScriptProtocol.Index.script,
  >,
  ~isDebug=false,
  (),
) => {
  contribute.createStateFunc(. {
    isDebug: isDebug,
  })
}

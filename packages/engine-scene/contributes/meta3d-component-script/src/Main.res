let getContribute: Meta3dType.Index.getContribute<
  Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
    StateType.state,
    Meta3dComponentScriptProtocol.Index.config,
    Meta3dComponentScriptProtocol.Index.needDisposedComponents,
    Meta3dComponentScriptProtocol.Index.batchDisposeData,
    Meta3dComponentScriptProtocol.Index.cloneConfig,
    Meta3dComponentScriptProtocol.Index.script,
  >,
> = _ => {
  componentName: Meta3dComponentScriptProtocol.Index.componentName,
  createStateFunc: (. {isDebug}) => CreateStateUtils.createState(isDebug),
  createComponentFunc: (. state) => CreateScriptUtils.create(state),
  addComponentFunc: (. state, gameObject, script) => {
    AddScriptUtils.add(state, gameObject, script)
  },
  removeComponentFunc: (. state, gameObject, script) => {
    RemoveScriptUtils.remove(state, gameObject, script)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasScriptUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetScriptUtils.get(state, gameObject)
  },
  getNeedDisposedComponentsFunc: (. state) => {
    GetNeedDisposedScriptsUtils.get(state)
  },
  getGameObjectsFunc: (. state, script) => {
    GetGameObjectsUtils.get(state, script)
  },
  getComponentDataFunc: (. state, script, dataName) => {
    GetScriptDataUtils.getData(. state, script, dataName)
  },
  setComponentDataFunc: (. state, script, dataName, dataValue) => {
    SetScriptDataUtils.setData(. state, script, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllScriptsUtils.getAll(state)
  },
  deferDisposeComponentFunc: (. state, scriptData) => {
    DisposeScriptUtils.deferDisposeComponent(state, scriptData)
  },
  disposeComponentsFunc: (. state, scripts) => {
    DisposeScriptUtils.disposeComponents(state, scripts)
  },
  cloneComponentFunc: (. state, countRange, _, sourceScript) => {
    CloneScriptUtils.clone(state, countRange, sourceScript)
  },
  restore: (. currentState, targetState) => {
    targetState
  },
  deepCopy: (. state) => {
    let {
      attributeMap,
      allAssetDataMap,
      gameObjectMap,
      gameObjectScriptMap,
      needDisposedScripts,
      disposedScripts,
    } = state

    {
      ...state,
      attributeMap: attributeMap->Meta3dCommonlib.MutableSparseMap.copy,
      allAssetDataMap: allAssetDataMap->Meta3dCommonlib.MutableSparseMap.copy,
      gameObjectMap: gameObjectMap->Meta3dCommonlib.MutableSparseMap.copy,
      gameObjectScriptMap: gameObjectScriptMap->Meta3dCommonlib.MutableSparseMap.copy,
      needDisposedScripts: needDisposedScripts->Meta3dCommonlib.ArraySt.copy,
      disposedScripts: disposedScripts->Meta3dCommonlib.ArraySt.copy,
    }
  },
}

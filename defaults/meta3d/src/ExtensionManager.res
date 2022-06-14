open Meta3dType.Index

let getExtensionServiceExn = (state, name: extensionName) => {
  state.extensionServiceMap->Meta3dCommonlib.ImmutableHashMap.getExn(name)
}

let setExtensionState = (state, name: extensionName, extensionState: extensionState) => {
  {
    ...state,
    extensionStateMap: state.extensionStateMap->Meta3dCommonlib.ImmutableHashMap.set(
      name,
      extensionState,
    ),
  }
}

let getExtensionStateExn = (state, name: extensionName) => {
  state.extensionStateMap->Meta3dCommonlib.ImmutableHashMap.getExn(name)
}

let getContributeExn = (state, name: contributeName) => {
  state.contributeMap->Meta3dCommonlib.ImmutableHashMap.getExn(name)
}

let _getExtensionLifeExn = (state, name: extensionName) => {
  state.extensionLifeMap->Meta3dCommonlib.ImmutableHashMap.getExn(name)
}

let _invokeLifeHander = (state, extensionName, handlerNullable) => {
  handlerNullable
  ->Meta3dCommonlib.NullableSt.map((. handler) => {
    handler(state, getExtensionServiceExn(state, extensionName))
  })
  ->Meta3dCommonlib.NullableSt.getWithDefault(state)
}

let startExtensions = (state, extensionNames) => {
  extensionNames->Meta3dCommonlib.ArraySt.reduceOneParam((. state, extensionName) => {
    _getExtensionLifeExn(state, extensionName).onStart->_invokeLifeHander(state, extensionName, _)
  }, state)
}

let rec registerExtension = (
  state,
  name: extensionName,
  getServiceFunc: getExtensionService<
    dependentExtensionNameMap,
    dependentContributeNameMap,
    extensionService,
  >,
  getLifeFunc: getExtensionLife<extensionService>,
  (dependentExtensionNameMap: dependentExtensionNameMap, dependentContributeNameMap),
  extensionState: extensionState,
) => {
  let state = {
    ...state,
    extensionServiceMap: state.extensionServiceMap->Meta3dCommonlib.ImmutableHashMap.set(
      name,
      getServiceFunc(buildAPI(), (dependentExtensionNameMap, dependentContributeNameMap)),
    ),
    extensionLifeMap: state.extensionLifeMap->Meta3dCommonlib.ImmutableHashMap.set(
      name,
      getLifeFunc(buildAPI(), name),
    ),
  }->setExtensionState(name, extensionState)

  _getExtensionLifeExn(state, name).onRegister->_invokeLifeHander(state, name, _)
}
and registerContribute = (
  state,
  name: contributeName,
  getContributeFunc: getContribute<
    dependentExtensionNameMap,
    dependentContributeNameMap,
    contribute,
  >,
  (dependentExtensionNameMap: dependentExtensionNameMap, dependentContributeNameMap),
) => {
  {
    ...state,
    contributeMap: state.contributeMap->Meta3dCommonlib.ImmutableHashMap.set(
      name,
      getContributeFunc(buildAPI(), (dependentExtensionNameMap, dependentContributeNameMap)),
    ),
  }
}
and buildAPI = (): api => {
  registerExtension: (
    (.
      state,
      extensionName,
      getExtensionService,
      getExtensionLife,
      (dependentExtensionNameMap, dependentContributeNameMap),
      extensionState,
    ) =>
      registerExtension(
        state,
        extensionName,
        getExtensionService,
        getExtensionLife,
        (dependentExtensionNameMap, dependentContributeNameMap),
        extensionState,
      )
  )->Obj.magic,
  getExtensionService: (. state, name: extensionName) =>
    getExtensionServiceExn(state, (name: extensionName)),
  getExtensionState: (. state, name) => getExtensionStateExn(state, name),
  // TODO remove magic
  setExtensionState: (
    (. state, name, extensionState) => setExtensionState(state, name, extensionState)
  )->Obj.magic,
  registerContribute: (
    (.
      state,
      contributeName,
      getContribute,
      (dependentExtensionNameMap, dependentContributeNameMap),
    ) =>
      registerContribute(
        state,
        contributeName,
        getContribute,
        (dependentExtensionNameMap, dependentContributeNameMap),
      )
  )->Obj.magic,
  getContribute: (. state, name: contributeName) => getContributeExn(state, (name: contributeName)),
}

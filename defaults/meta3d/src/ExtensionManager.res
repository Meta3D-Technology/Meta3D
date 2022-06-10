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

let rec registerExtension = (
  state,
  name: extensionName,
  getServiceFunc: getExtensionService<
    dependentExtensionNameMap,
    dependentContributeNameMap,
    extensionService,
  >,
  (dependentExtensionNameMap: dependentExtensionNameMap, dependentContributeNameMap),
  extensionState: extensionState,
) => {
  {
    ...state,
    extensionServiceMap: state.extensionServiceMap->Meta3dCommonlib.ImmutableHashMap.set(
      name,
      getServiceFunc(buildAPI(), (dependentExtensionNameMap, dependentContributeNameMap)),
    ),
  }->setExtensionState(name, extensionState)
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
      (dependentExtensionNameMap, dependentContributeNameMap),
      extensionState,
    ) =>
      registerExtension(
        state,
        extensionName,
        getExtensionService,
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

let prepare = () => {
  {
    extensionServiceMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    extensionStateMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    contributeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  }
}

open Meta3dType.Index

let getServiceExn = (state, name: extensionName) => {
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

let register = (
  state,
  name: extensionName,
  getServiceFunc: getExtensionService<dependentExtensionNameMap, extensionService>,
  dependentExtensionNameMap: dependentExtensionNameMap,
  extensionState: extensionState,
) => {
  {
    ...state,
    extensionServiceMap: state.extensionServiceMap->Meta3dCommonlib.ImmutableHashMap.set(
      name,
      getServiceFunc(buildAPI(), dependentExtensionNameMap),
    ),
  }->setExtensionState(name, extensionState)
}

let buildAPI = (): api => {
  registerExtension: (.
    state,
    extensionName,
    getExtensionService,
    dependentExtensionNameMap,
    extensionState,
  ) =>
    register(state, extensionName, getExtensionService, dependentExtensionNameMap, extensionState),
  getServiceExn: (. state, name: extensionName) => getServiceExn(state, (name: extensionName)),
  getExtensionStateExn: (. state, name) => getExtensionStateExn(state, name),
  // TODO remove magic
  setExtensionState: (
    (. state, name, extensionState) => setExtensionState(state, name, extensionState)
  )->Obj.magic,
}

let prepare = () => {
  {
    extensionServiceMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    extensionStateMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  }
}

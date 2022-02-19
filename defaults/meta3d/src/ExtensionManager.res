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

let _buildAPI = (): api => {
  getServiceExn: getServiceExn,
  getExtensionStateExn: getExtensionStateExn,
  // TODO remove magic
  setExtensionState: setExtensionState->Obj.magic,
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
      getServiceFunc(_buildAPI(), dependentExtensionNameMap),
    ),
  }->setExtensionState(name, extensionState)
}

let prepare = () => {
  {
    extensionServiceMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    extensionStateMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  }
}

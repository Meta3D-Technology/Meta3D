open Meta3dType.ExtensionManagerType

let register = (state, name: extensionName, service: extensionService) => {
  {
    ...state,
    extensionServiceMap: state.extensionServiceMap->Meta3dCommonlib.ImmutableHashMap.set(
      name,
      service,
    ),
  }
}

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

let init = () => {
  {
    extensionServiceMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    extensionStateMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  }
}

// let buildAPI = (): Type.extensionManagerAPI => {
//   getServiceExn: getServiceExn->Obj.magic,
//   getExtensionStateExn: getExtensionStateExn->Obj.magic,
//   setExtensionState: setExtensionState->Obj.magic,
// }

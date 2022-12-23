open Meta3dType.Index

let getExtensionServiceExn = (state, protocolName: extensionProtocolName) => {
  state.extensionServiceMap->Meta3dCommonlib.ImmutableHashMap.getExn(protocolName)
}

let setExtensionState = (
  state,
  protocolName: extensionProtocolName,
  extensionState: extensionState,
) => {
  {
    ...state,
    extensionStateMap: state.extensionStateMap->Meta3dCommonlib.ImmutableHashMap.set(
      protocolName,
      extensionState,
    ),
  }
}

let getExtensionStateExn = (state, protocolName: extensionProtocolName) => {
  state.extensionStateMap->Meta3dCommonlib.ImmutableHashMap.getExn(protocolName)
}

let getContributeExn = (state, protocolName: contributeProtocolName) => {
  state.contributeMap
  ->Meta3dCommonlib.ImmutableHashMap.getExn(protocolName)
  ->Meta3dCommonlib.Tuple2.getLast
}

let getAllContributesByType = (state, contributeType) => {
  state.contributeMap
  ->Meta3dCommonlib.ImmutableHashMap.getValidValues
  ->Meta3dCommonlib.ArraySt.filter(((type_, _)) => {
    type_ == contributeType
  })
  ->Meta3dCommonlib.ArraySt.map(Meta3dCommonlib.Tuple2.getLast)
}

let _getExtensionLifeExn = (state, protocolName: extensionProtocolName) => {
  state.extensionLifeMap->Meta3dCommonlib.ImmutableHashMap.getExn(protocolName)
}

let _invokeLifeOnStartHander = (state, extensionProtocolName, configData, handlerNullable) => {
  let handler = handlerNullable->Meta3dCommonlib.NullableSt.getExn

  handler(state, getExtensionServiceExn(state, extensionProtocolName), configData)
}

let _invokeSyncLifeOtherHander = (state, extensionProtocolName, handlerNullable) => {
  handlerNullable
  ->Meta3dCommonlib.NullableSt.map((. handler) => {
    handler(state, getExtensionServiceExn(state, extensionProtocolName))
  })
  ->Meta3dCommonlib.NullableSt.getWithDefault(state)
}

let _invokeAsyncLifeOtherHander = (state, extensionProtocolName, data, handlerNullable) => {
  handlerNullable
  ->Meta3dCommonlib.NullableSt.map((. handler) => {
    handler(state, getExtensionServiceExn(state, extensionProtocolName), data)
  })
  ->Meta3dCommonlib.NullableSt.getWithDefault(
    Js.Promise.make((~resolve, ~reject) => resolve(. state)),
  )
}

let startExtension = (state, extensionProtocolName, configData) => {
  _getExtensionLifeExn(state, extensionProtocolName).onStart->_invokeLifeOnStartHander(
    state,
    extensionProtocolName,
    configData,
    _,
  )
}

let updateExtension = (state, extensionProtocolName, data) => {
  _getExtensionLifeExn(state, extensionProtocolName).onUpdate->_invokeAsyncLifeOtherHander(
    state,
    extensionProtocolName,
    data,
    _,
  )
}

let initExtension = (state, extensionProtocolName, data) => {
  _getExtensionLifeExn(state, extensionProtocolName).onInit->_invokeAsyncLifeOtherHander(
    state,
    extensionProtocolName,
    data,
    _,
  )
}

let _decideContributeType = (contribute: contribute) => {
  open Meta3dType.ContributeType

  let contribute = contribute->Obj.magic

  !(contribute["actionName"]->Js.Nullable.isNullable) &&
  !(contribute["handler"]->Js.Nullable.isNullable)
    ? {
        Action
      }
    : !(contribute["componentName"]->Js.Nullable.isNullable) &&
    !(contribute["createComponentFunc"]->Js.Nullable.isNullable)
    ? Component
    : !(contribute["elementName"]->Js.Nullable.isNullable) &&
    !(contribute["execOrder"]->Js.Nullable.isNullable)
    ? Element
    : !(contribute["createGameObjectFunc"]->Js.Nullable.isNullable) &&
    !(contribute["getAllGameObjectsFunc"]->Js.Nullable.isNullable)
    ? GameObject
    : !(contribute["uiControlName"]->Js.Nullable.isNullable) &&
    !(contribute["func"]->Js.Nullable.isNullable)
    ? UIControl
    : !(contribute["skinName"]->Js.Nullable.isNullable) &&
    !(contribute["skin"]->Js.Nullable.isNullable)
    ? Skin
    : !(contribute["workPluginName"]->Js.Nullable.isNullable) &&
    !(contribute["allPipelineData"]->Js.Nullable.isNullable)
    ? WorkPlugin
    : Unknown
}

let rec registerExtension = (
  state,
  protocolName: extensionProtocolName,
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
      protocolName,
      getServiceFunc(buildAPI(), (dependentExtensionNameMap, dependentContributeNameMap)),
    ),
    extensionLifeMap: state.extensionLifeMap->Meta3dCommonlib.ImmutableHashMap.set(
      protocolName,
      getLifeFunc(buildAPI(), protocolName),
    ),
  }->setExtensionState(protocolName, extensionState)

  _getExtensionLifeExn(state, protocolName).onRegister->_invokeSyncLifeOtherHander(
    state,
    protocolName,
    _,
  )
}
and registerContribute = (
  state,
  protocolName: contributeProtocolName,
  getContributeFunc: getContribute<
    dependentExtensionNameMap,
    dependentContributeNameMap,
    contribute,
  >,
  (dependentExtensionNameMap: dependentExtensionNameMap, dependentContributeNameMap),
) => {
  let contribute = getContributeFunc(
    buildAPI(),
    (dependentExtensionNameMap, dependentContributeNameMap),
  )

  {
    ...state,
    contributeMap: state.contributeMap->Meta3dCommonlib.ImmutableHashMap.set(
      protocolName,
      (_decideContributeType(contribute), contribute),
    ),
  }
}
and buildAPI = (): api => {
  registerExtension: (
    (.
      state,
      extensionProtocolName,
      getExtensionService,
      getExtensionLife,
      (dependentExtensionNameMap, dependentContributeNameMap),
      extensionState,
    ) =>
      registerExtension(
        state,
        extensionProtocolName,
        getExtensionService,
        getExtensionLife,
        (dependentExtensionNameMap, dependentContributeNameMap),
        extensionState,
      )
  )->Obj.magic,
  getExtensionService: (. state, protocolName: extensionProtocolName) =>
    getExtensionServiceExn(state, (protocolName: extensionProtocolName))->Obj.magic,
  getExtensionState: (. state, protocolName) =>
    getExtensionStateExn(state, protocolName)->Obj.magic,
  // TODO remove magic
  setExtensionState: (
    (. state, protocolName, extensionState) =>
      setExtensionState(state, protocolName, extensionState)
  )->Obj.magic,
  registerContribute: (
    (.
      state,
      contributeProtocolName,
      getContribute,
      (dependentExtensionNameMap, dependentContributeNameMap),
    ) =>
      registerContribute(
        state,
        contributeProtocolName,
        getContribute,
        (dependentExtensionNameMap, dependentContributeNameMap),
      )
  )->Obj.magic,
  getContribute: (. state, protocolName: contributeProtocolName) =>
    getContributeExn(state, (protocolName: contributeProtocolName))->Obj.magic,
  getAllContributesByType: (. state, contributeType: Meta3dType.ContributeType.contributeType) =>
    getAllContributesByType(state, contributeType)->Obj.magic,
}

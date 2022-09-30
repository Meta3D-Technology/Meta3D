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
  state.contributeMap->Meta3dCommonlib.ImmutableHashMap.getExn(name)->Meta3dCommonlib.Tuple2.getLast
}

let getAllContributesByType = (state, contributeType) => {
  state.contributeMap
  ->Meta3dCommonlib.ImmutableHashMap.getValidValues
  ->Meta3dCommonlib.ArraySt.filter(((type_, _)) => {
    type_ == contributeType
  })
  ->Meta3dCommonlib.ArraySt.map(Meta3dCommonlib.Tuple2.getLast)
}

let _getExtensionLifeExn = (state, name: extensionName) => {
  state.extensionLifeMap->Meta3dCommonlib.ImmutableHashMap.getExn(name)
}

let _invokeLifeOnStartHander = (state, extensionName, handlerNullable) => {
  let handler = handlerNullable->Meta3dCommonlib.NullableSt.getExn

  handler(state, getExtensionServiceExn(state, extensionName))
}

let _invokeSyncLifeOtherHander = (state, extensionName, handlerNullable) => {
  handlerNullable
  ->Meta3dCommonlib.NullableSt.map((. handler) => {
    handler(state, getExtensionServiceExn(state, extensionName))
  })
  ->Meta3dCommonlib.NullableSt.getWithDefault(state)
}

let _invokeAsyncLifeOtherHander = (state, extensionName, data, handlerNullable) => {
  handlerNullable
  ->Meta3dCommonlib.NullableSt.map((. handler) => {
    handler(state, getExtensionServiceExn(state, extensionName), data)
  })
  ->Meta3dCommonlib.NullableSt.getWithDefault(
Js.Promise.make((~resolve, ~reject) => resolve(. state))
  )
}


let startExtension = (state, extensionName) => {
  _getExtensionLifeExn(state, extensionName).onStart->_invokeLifeOnStartHander(
    state,
    extensionName,
    _,
  )
}

let updateExtension = (state, extensionName, data) => {
  _getExtensionLifeExn(state, extensionName).onUpdate->_invokeAsyncLifeOtherHander(
    state,
    extensionName,
    data,
    _,
  )
}

let initExtension = (state, extensionName, data) => {
  _getExtensionLifeExn(state, extensionName).onInit->_invokeAsyncLifeOtherHander(state, extensionName, data, _)
}

let _decideContributeType = (contribute: contribute) => {
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
    : !(contribute["workPluginName"]->Js.Nullable.isNullable) &&
    !(contribute["allPipelineData"]->Js.Nullable.isNullable)
    ? WorkPlugin
    : Unknown
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

  _getExtensionLifeExn(state, name).onRegister->_invokeSyncLifeOtherHander(state, name, _)
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
  let contribute = getContributeFunc(
    buildAPI(),
    (dependentExtensionNameMap, dependentContributeNameMap),
  )

  {
    ...state,
    contributeMap: state.contributeMap->Meta3dCommonlib.ImmutableHashMap.set(
      name,
      (_decideContributeType(contribute), contribute),
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
    getExtensionServiceExn(state, (name: extensionName))->Obj.magic,
  getExtensionState: (. state, name) => getExtensionStateExn(state, name)->Obj.magic,
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
  getContribute: (. state, name: contributeName) =>
    getContributeExn(state, (name: contributeName))->Obj.magic,
  getAllContributesByType: (. state, contributeType: contributeType) =>
    getAllContributesByType(state, contributeType)->Obj.magic,
}

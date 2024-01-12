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

let _isInput = (protocolName: string) => {
  switch protocolName {
  | name if name->Js.String.includes("-input-", _) => true
  | _ => false
  }
}

let getContributeExn = (state, protocolName: contributeProtocolName) => {
  _isInput(protocolName)
    ? Meta3dCommonlib.Exception.throwErr(
        Meta3dCommonlib.Exception.buildErr(
          Meta3dCommonlib.Log.buildErrorMessage(
            ~title={j`shouldn't get input whose protocol is: ${protocolName}!`},
            ~description={
              j``
            },
            ~reason="",
            ~solution=j``,
            ~params=j``,
          ),
        ),
      )
    : state.contributeExceptInputMap
      ->Meta3dCommonlib.ImmutableHashMap.getExn(protocolName)
      ->Meta3dCommonlib.Tuple2.getLast
}

let getAllContributesByType = (state, contributeType) => {
  open Meta3dType.ContributeType

  switch contributeType {
  | Input =>
    state.inputMap
    ->Meta3dCommonlib.ImmutableHashMap.getValidValues
    ->Meta3dCommonlib.ArraySt.reduceOneParam((. result, arr) => {
      Js.Array.concat(arr, result)
    }, [])
  | _ =>
    state.contributeExceptInputMap
    ->Meta3dCommonlib.ImmutableHashMap.getValidValues
    ->Meta3dCommonlib.ArraySt.filter(((type_, _)) => {
      type_ == contributeType
    })
    ->Meta3dCommonlib.ArraySt.map(Meta3dCommonlib.Tuple2.getLast)
  }
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

let getPackageService = (state, protocolName: packageProtocolName) => {
  state.extensionServiceMap
  ->Meta3dCommonlib.ImmutableHashMap.get(protocolName)
  ->Meta3dCommonlib.OptionSt.toNullable
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
    : !(contribute["inputName"]->Js.Nullable.isNullable) &&
    !(contribute["func"]->Js.Nullable.isNullable)
    ? Input
    : !(contribute["skinName"]->Js.Nullable.isNullable) &&
    !(contribute["skin"]->Js.Nullable.isNullable)
    ? Skin
    : !(contribute["pipelineName"]->Js.Nullable.isNullable) &&
    !(contribute["allPipelineData"]->Js.Nullable.isNullable)
    ? Pipeline
    : Unknown
}

let _checkIsRegister = (protocolName: string, isRegister) => {
  isRegister
    ? Meta3dCommonlib.Exception.throwErr(
        Meta3dCommonlib.Exception.buildErr(
          Meta3dCommonlib.Log.buildErrorMessage(
            ~title={j`already register extension or contribute of protocol: ${protocolName}`},
            ~description={
              j``
            },
            ~reason="",
            ~solution=j``,
            ~params=j``,
          ),
        ),
      )
    : ()
}

let restore = (currentState, targetState) => {
  targetState.extensionLifeMap
  ->Meta3dCommonlib.ImmutableHashMap.entries
  ->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. targetState, (extensionProtocolName, {onRestore})) => {
      onRestore
      ->Meta3dCommonlib.NullableSt.map((. handler) => {
        handler(currentState, targetState)
      })
      ->Meta3dCommonlib.NullableSt.getWithDefault(targetState)
    },
    targetState,
  )
}

let deepCopy = state => {
  state.extensionLifeMap
  ->Meta3dCommonlib.ImmutableHashMap.entries
  ->Meta3dCommonlib.ArraySt.reduceOneParam((. state, (extensionProtocolName, {onDeepCopy})) => {
    onDeepCopy
    ->Meta3dCommonlib.NullableSt.map((. handler) => {
      handler(state)
    })
    ->Meta3dCommonlib.NullableSt.getWithDefault(state)
  }, state)
}

let _buildNullableAPI = (): Meta3dType.Index.nullableAPI => {
  getExn: (. data) => Meta3dCommonlib.NullableSt.getExn(data),
  isNullable: (. data) => Meta3dCommonlib.NullableSt.isNullable(data),
  return: (. data) => Meta3dCommonlib.NullableSt.return(data),
  getWithDefault: (. nullableData, default) =>
    Meta3dCommonlib.NullableSt.getWithDefault(nullableData, default),
  map: (. func, data) => Meta3dCommonlib.NullableSt.map(data, func),
  bind: (. func, data) => Meta3dCommonlib.NullableSt.bind(data, func),
  getEmpty: Meta3dCommonlib.NullableSt.getEmpty,
}

let _buildBackendAPI = (): Meta3dType.Index.backendAPI => {
  init: (. env) => BackendCloudbase.init(. env)->Meta3dBsMostDefault.Most.drain,
  publishFinalApp: (.
    onUploadProgressFunc,
    sceneGLB,
    appName,
    account,
    description,
    previewBase64,
    isRecommend,
  ) =>
    BackendCloudbase.publishFinalApp(.
      onUploadProgressFunc,
      sceneGLB,
      appName,
      account,
      description,
      previewBase64,
      isRecommend,
    )->Meta3dBsMostDefault.Most.drain,
  // init:  BackendCloudbase.init,
  // publishFinalApp: BackendCloudbase.publishFinalApp,
}

let _buildImmutableAPI = (): Meta3dType.Index.immutableAPI => {
  // createList: %raw(`
  // function (state){
  //   let { createList } = nullableAPI.getExn(getPackageService(state, "meta3d-editor-whole-protocol")).core(state).immutable(state)

  //   return createList()
  // }
  // `),
  // createListOfData: %raw(`
  // function (state, data){
  //   let { createListOfData } = nullableAPI.getExn(getPackageService(state, "meta3d-editor-whole-protocol")).core(state).immutable(state)

  //   return createListOfData(data)
  // }
  // `),
  // createMap: %raw(`
  // function (state){
  //   let { createMap } = nullableAPI.getExn(getPackageService(state, "meta3d-editor-whole-protocol")).core(state).immutable(state)

  //   return createMap()
  // }
  // `),
  // createMapOfData: %raw(`
  // function (state, data){
  //   let { createMapOfData } = nullableAPI.getExn(getPackageService(state, "meta3d-editor-whole-protocol")).core(state).immutable(state)

  //   return createMapOfData(data)
  // }
  // `),
  createList: Immutable.createList,
  createListOfData: (. arrayData) => Immutable.createListOfData(arrayData),
  createMap: Immutable.createMap,
  createMapOfData: (. dictData) => Immutable.createMapOfData(dictData),
}

let _buildActionAPI = (
  nullableAPI: Meta3dType.Index.nullableAPI,
  getPackageService,
): Meta3dType.Index.actionAPI => {
  getActionState: %raw(`
  function (state, actionName){
    let { getCurrentElementState } = nullableAPI.getExn(getPackageService(state, "meta3d-editor-whole-protocol")).ui(state)

    return nullableAPI.bind(currentElementState => {
      return currentElementState[actionName]
    }, getCurrentElementState(state))
  }
  `),
  setActionState: %raw(`
  function (state, actionName, actionState){
    let { updateElementState } = nullableAPI. getExn(getPackageService(state, "meta3d-editor-whole-protocol")).ui(state)

    state = updateElementState(state,
      (elementState) => {
        return Object.assign({}, elementState, {
            [actionName]: actionState
        })
      }
    )

    return state
  }
  `),
}

let _buildUIControlAPI = (
  nullableAPI: Meta3dType.Index.nullableAPI,
  getPackageService,
): Meta3dType.Index.uiControlAPI => {
  getUIControlState: %raw(`
  function (state, uiControlName){
    let { getUIControlState } = nullableAPI.getExn(getPackageService(state, "meta3d-editor-whole-protocol")).ui(state)

    return getUIControlState(state, uiControlName)
  }
  `),
  setUIControlState: %raw(`
  function (state, uiControlName, uiControlState){
    let { setUIControlState } = nullableAPI. getExn(getPackageService(state, "meta3d-editor-whole-protocol")).ui(state)

    state = setUIControlState(state, uiControlName, uiControlState)

    return state
  }
  `),
}

let _buildMessageAPI = (): Meta3dType.Index.messageAPI => {
  success: %raw(`
  function (message){
    console.log(message)

    alert("成功：" + message)
  }
  `),
  warn: %raw(`
  function (message){
    console.warn(message)

    alert("警告："+message)
  }
  `),
  error: %raw(`
  function (message){
    console.error(message)

    alert("错误：" +message)
  }
  `),
}

let rec registerExtension = (
  state,
  protocolName: extensionProtocolName,
  getServiceFunc: getExtensionService<extensionService>,
  getLifeFunc: getExtensionLife<extensionService>,
  extensionState: extensionState,
) => {
  _checkIsRegister(
    protocolName,
    state.extensionServiceMap->Meta3dCommonlib.ImmutableHashMap.has(protocolName),
  )

  let state = {
    ...state,
    extensionServiceMap: state.extensionServiceMap->Meta3dCommonlib.ImmutableHashMap.set(
      protocolName,
      getServiceFunc(buildAPI()),
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
  getContributeFunc: getContribute<contribute>,
) => {
  open Meta3dType.ContributeType

  let contribute = getContributeFunc(buildAPI())

  let contributeType = _decideContributeType(contribute)

  switch contributeType {
  | Input => {
      ...state,
      inputMap: switch state.inputMap->Meta3dCommonlib.ImmutableHashMap.get(protocolName) {
      | Some(inputs) =>
        state.inputMap->Meta3dCommonlib.ImmutableHashMap.set(
          protocolName,
          inputs->Meta3dCommonlib.ArraySt.push(contribute),
        )
      | None => state.inputMap->Meta3dCommonlib.ImmutableHashMap.set(protocolName, [contribute])
      },
    }
  | _ =>
    _checkIsRegister(
      protocolName,
      state.contributeExceptInputMap->Meta3dCommonlib.ImmutableHashMap.has(protocolName),
    )

    {
      ...state,
      contributeExceptInputMap: state.contributeExceptInputMap->Meta3dCommonlib.ImmutableHashMap.set(
        protocolName,
        (contributeType, contribute),
      ),
    }
  }
}
and buildAPI = (): api => {
  registerExtension: (
    (. state, extensionProtocolName, getExtensionService, getExtensionLife, extensionState) =>
      registerExtension(
        state,
        extensionProtocolName,
        getExtensionService,
        getExtensionLife,
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
  getPackageService: (. state, protocolName: packageProtocolName) =>
    getPackageService(state, (protocolName: packageProtocolName))->Obj.magic,
  registerContribute: (
    (. state, contributeProtocolName, getContribute) =>
      registerContribute(state, contributeProtocolName, getContribute)
  )->Obj.magic,
  getContribute: (. state, protocolName: contributeProtocolName) =>
    getContributeExn(state, (protocolName: contributeProtocolName))->Obj.magic,
  getAllContributesByType: (. state, contributeType: Meta3dType.ContributeType.contributeType) =>
    getAllContributesByType(state, contributeType)->Obj.magic,
  getPackage: (. state, packageProtocolName: Meta3dType.Index.packageProtocolName) =>
    state.packageStoreInAppMap->Meta3dCommonlib.ImmutableHashMap.getNullable(packageProtocolName),
  restore: (. currentExtensionState, targetExtensionState) =>
    restore(currentExtensionState, targetExtensionState),
  deepCopy: (. extensionState) => deepCopy(extensionState),
  nullable: _buildNullableAPI(),
  backend: _buildBackendAPI(),
  immutable: _buildImmutableAPI(),
  action: _buildActionAPI(_buildNullableAPI(), (. state, protocolName) =>
    getPackageService(state, protocolName)->Obj.magic
  ),
  uiControl: _buildUIControlAPI(_buildNullableAPI(), (. state, protocolName) =>
    getPackageService(state, protocolName)->Obj.magic
  ),
  message: _buildMessageAPI(),
}

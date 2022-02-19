let registerComponent = (
  {componentData} as state: StateType.state,
  data: RegisterComponentType.registeredComponent,
): Meta3dCommonlib.Result.t2<StateType.state> => {
  Meta3dCommonlib.ContractResult.requireCheck(() => {
    open Meta3dCommonlib.ContractResult
    open Operators
    test(
      Meta3dCommonlib.Log.buildAssertMessage(~expect=j`not register before`, ~actual=j`not`),
      () => {
        componentData.allRegisteredComponentData
        ->Meta3dCommonlib.ImmutableHashMap.has(data.componentName)
        ->assertFalse
      },
    )
  }, PluginDataManager.getIsDebug())->Meta3dCommonlib.Result.mapSuccess(() => {
    {
      ...state,
      componentData: {
        ...componentData,
        allRegisteredComponentData: componentData.allRegisteredComponentData->Meta3dCommonlib.ImmutableHashMap.set(
          data.componentName,
          data,
        ),
      },
    }
  })
}

let unregisterComponent = (
  {componentData} as state: StateType.state,
  componentName: Meta3dEngineCoreType.IComponentForJs.componentName,
): StateType.state => {
  {
    ...state,
    componentData: {
      ...componentData,
      allRegisteredComponentData: componentData.allRegisteredComponentData->Meta3dCommonlib.ImmutableHashMap.deleteVal(
        componentName,
      ),
    },
  }
}

let unsafeGetUsedComponentData = (
  {componentData}: StateType.state,
  componentName: Meta3dEngineCoreType.IComponentForJs.componentName,
): RegisterComponentType.usedComponentData => {
  componentData.allUsedComponentData->Meta3dCommonlib.MutableHashMap.unsafeGet(componentName)
}

let setRelatedComponentData = (
  poState: StateType.state,
  data: RegisterComponentType.usedComponentData,
  componentName: Meta3dEngineCoreType.IComponentForJs.componentName,
): StateType.state => {
  poState.componentData.allUsedComponentData
  ->Meta3dCommonlib.MutableHashMap.set(componentName, data)
  ->ignore

  poState
}

let createAndSetComponentState = (
  state: StateType.state,
  componentName: Meta3dEngineCoreType.IComponentForJs.componentName,
  config: RegisterComponentType.config,
): StateType.state => {
  let {
    createStateFunc,
    getGameObjectsFunc,
    createComponentFunc,
    addComponentFunc,
    hasComponentFunc,
    getComponentFunc,
    getAllComponentsFunc,
    getComponentDataFunc,
    setComponentDataFunc,
  } =
    state.componentData.allRegisteredComponentData->Meta3dCommonlib.ImmutableHashMap.unsafeGet(
      componentName,
    )

  {
    ...state,
    componentData: {
      ...state.componentData,
      allUsedComponentData: state.componentData.allUsedComponentData->Meta3dCommonlib.ImmutableHashMap.set(
        componentName,
        {
          componentName: componentName,
          state: createStateFunc(. config),
          createComponentFunc: createComponentFunc,
          getGameObjectsFunc: getGameObjectsFunc,
          addComponentFunc: addComponentFunc,
          hasComponentFunc: hasComponentFunc,
          getComponentFunc: getComponentFunc,
          getAllComponentsFunc: getAllComponentsFunc,
          getComponentDataFunc: getComponentDataFunc,
          setComponentDataFunc: setComponentDataFunc,
        },
      ),
    },
  }
}

let _setComponentStateToData = (
  componentState: RegisterComponentType.state,
  data: RegisterComponentType.usedComponentData,
): RegisterComponentType.usedComponentData => {
  data.state = componentState

  data
}

let createComponent = (data: RegisterComponentType.usedComponentData): (
  RegisterComponentType.usedComponentData,
  RegisterComponentType.component,
) => {
  let (componentState, component) = data.createComponentFunc(. data.state)

  (_setComponentStateToData(componentState, data), component)
}

let setComponentData = (
  data: RegisterComponentType.usedComponentData,
  component: RegisterComponentType.component,
  dataName: RegisterComponentType.dataName,
  dataValue: Meta3dEngineCoreType.IComponentForJs.dataValue,
): RegisterComponentType.usedComponentData => {
  // let data = state->unsafeGetUsedComponentData(componentName)

  data.setComponentDataFunc(. data.state, component, dataName, dataValue)->_setComponentStateToData(
    data,
  )

  // ->_setComponentStateToData(state, data, componentName, _)

  // state
}

let addComponent = (
  data: RegisterComponentType.usedComponentData,
  gameObject: Meta3dEngineCoreType.IGameObjectForJs.gameObject,
  component: RegisterComponentType.component,
): RegisterComponentType.usedComponentData => {
  data.addComponentFunc(. data.state, gameObject, component)->_setComponentStateToData(data)
}

let hasComponent = (
  data: RegisterComponentType.usedComponentData,
  gameObject: Meta3dEngineCoreType.IGameObjectForJs.gameObject,
): bool => {
  data.hasComponentFunc(. data.state, gameObject)
}

let getComponent = (
  data: RegisterComponentType.usedComponentData,
  gameObject: Meta3dEngineCoreType.IGameObjectForJs.gameObject,
): Js.Nullable.t<RegisterComponentType.component> => {
  data.getComponentFunc(. data.state, gameObject)
}

let getAllComponents = (data: RegisterComponentType.usedComponentData): array<
  RegisterComponentType.component,
> => {
  data.getAllComponentsFunc(. data.state)
}

let getComponentData = (
  data: RegisterComponentType.usedComponentData,
  component: RegisterComponentType.component,
  dataName: RegisterComponentType.dataName,
): Js.Nullable.t<Meta3dEngineCoreType.IComponentForJs.dataValue> => {
  data.getComponentDataFunc(. data.state, component, dataName)
}

let getComponentGameObjects = (
  data: RegisterComponentType.usedComponentData,
  component: RegisterComponentType.component,
): array<Meta3dEngineCoreType.IGameObjectForJs.gameObject> => {
  data.getGameObjectsFunc(. data.state, component)
}

let getState = (state: StateType.state, componentName: Meta3dEngineCoreType.IComponentForJs.componentName) => {
  state.componentData.allUsedComponentData
  ->Meta3dCommonlib.MutableHashMap.get(componentName)
  ->Meta3dCommonlib.OptionSt.map(({state}) => state)
}

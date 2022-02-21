let registerComponent = (
  {componentData} as state: Meta3dEngineCoreProtocol.StateType.state,
  data: Meta3dEngineCoreProtocol.RegisterComponentType.componentContribute,
): Meta3dCommonlib.Result.t2<Meta3dEngineCoreProtocol.StateType.state> => {
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
  {componentData} as state: Meta3dEngineCoreProtocol.StateType.state,
  componentName: Meta3dEngineCoreProtocol.IComponentForJs.componentName,
): Meta3dEngineCoreProtocol.StateType.state => {
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
  {componentData}: Meta3dEngineCoreProtocol.StateType.state,
  componentName: Meta3dEngineCoreProtocol.IComponentForJs.componentName,
): Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentData => {
  componentData.allUsedComponentData->Meta3dCommonlib.MutableHashMap.unsafeGet(componentName)
}

let setRelatedComponentData = (
  poState: Meta3dEngineCoreProtocol.StateType.state,
  data: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentData,
  componentName: Meta3dEngineCoreProtocol.IComponentForJs.componentName,
): Meta3dEngineCoreProtocol.StateType.state => {
  poState.componentData.allUsedComponentData
  ->Meta3dCommonlib.MutableHashMap.set(componentName, data)
  ->ignore

  poState
}

let createAndSetComponentState = (
  state: Meta3dEngineCoreProtocol.StateType.state,
  componentName: Meta3dEngineCoreProtocol.IComponentForJs.componentName,
  config: Meta3dEngineCoreProtocol.RegisterComponentType.config,
): Meta3dEngineCoreProtocol.StateType.state => {
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
  componentState: Meta3dEngineCoreProtocol.RegisterComponentType.state,
  data: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentData,
): Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentData => {
  data.state = componentState

  data
}

let createComponent = (data: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentData): (
  Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentData,
  Meta3dEngineCoreProtocol.RegisterComponentType.component,
) => {
  let (componentState, component) = data.createComponentFunc(. data.state)

  (_setComponentStateToData(componentState, data), component)
}

let setComponentData = (
  data: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentData,
  component: Meta3dEngineCoreProtocol.RegisterComponentType.component,
  dataName: Meta3dEngineCoreProtocol.RegisterComponentType.dataName,
  dataValue: Meta3dEngineCoreProtocol.IComponentForJs.dataValue,
): Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentData => {
  // let data = state->unsafeGetUsedComponentData(componentName)

  data.setComponentDataFunc(. data.state, component, dataName, dataValue)->_setComponentStateToData(
    data,
  )

  // ->_setComponentStateToData(state, data, componentName, _)

  // state
}

let addComponent = (
  data: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentData,
  gameObject: Meta3dEngineCoreProtocol.IGameObjectForJs.gameObject,
  component: Meta3dEngineCoreProtocol.RegisterComponentType.component,
): Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentData => {
  data.addComponentFunc(. data.state, gameObject, component)->_setComponentStateToData(data)
}

let hasComponent = (
  data: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentData,
  gameObject: Meta3dEngineCoreProtocol.IGameObjectForJs.gameObject,
): bool => {
  data.hasComponentFunc(. data.state, gameObject)
}

let getComponent = (
  data: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentData,
  gameObject: Meta3dEngineCoreProtocol.IGameObjectForJs.gameObject,
): Js.Nullable.t<Meta3dEngineCoreProtocol.RegisterComponentType.component> => {
  data.getComponentFunc(. data.state, gameObject)
}

let getAllComponents = (data: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentData): array<
  Meta3dEngineCoreProtocol.RegisterComponentType.component,
> => {
  data.getAllComponentsFunc(. data.state)
}

let getComponentContribute = (
  data: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentData,
  component: Meta3dEngineCoreProtocol.RegisterComponentType.component,
  dataName: Meta3dEngineCoreProtocol.RegisterComponentType.dataName,
): Js.Nullable.t<Meta3dEngineCoreProtocol.IComponentForJs.dataValue> => {
  data.getComponentDataFunc(. data.state, component, dataName)
}

let getComponentGameObjects = (
  data: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentData,
  component: Meta3dEngineCoreProtocol.RegisterComponentType.component,
): array<Meta3dEngineCoreProtocol.IGameObjectForJs.gameObject> => {
  data.getGameObjectsFunc(. data.state, component)
}

let getState = (
  state: Meta3dEngineCoreProtocol.StateType.state,
  componentName: Meta3dEngineCoreProtocol.IComponentForJs.componentName,
) => {
  state.componentData.allUsedComponentData
  ->Meta3dCommonlib.MutableHashMap.get(componentName)
  ->Meta3dCommonlib.OptionSt.map(({state}) => state)
}

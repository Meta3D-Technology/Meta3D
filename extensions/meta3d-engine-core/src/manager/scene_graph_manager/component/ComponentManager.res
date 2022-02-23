let registerComponent = (
  {componentContributeData} as state: Meta3dEngineCoreProtocol.StateType.state,
  componentContribute: Meta3dEngineCoreProtocol.RegisterComponentType.componentContribute,
): Meta3dCommonlib.Result.t2<Meta3dEngineCoreProtocol.StateType.state> => {
  Meta3dCommonlib.ContractResult.requireCheck(() => {
    open Meta3dCommonlib.ContractResult
    open Operators
    test(
      Meta3dCommonlib.Log.buildAssertMessage(~expect=j`not register before`, ~actual=j`not`),
      () => {
        componentContributeData.allComponentContributes
        ->Meta3dCommonlib.ImmutableHashMap.has(componentContribute.componentName)
        ->assertFalse
      },
    )
  }, PluginDataManager.getIsDebug(state))->Meta3dCommonlib.Result.mapSuccess(() => {
    {
      ...state,
      componentContributeData: {
        ...componentContributeData,
        allComponentContributes: componentContributeData.allComponentContributes->Meta3dCommonlib.ImmutableHashMap.set(
          componentContribute.componentName,
          componentContribute,
        ),
      },
    }
  })
}

let unregisterComponent = (
  {componentContributeData} as state: Meta3dEngineCoreProtocol.StateType.state,
  componentName: Meta3dEngineCoreProtocol.IComponentForJs.componentName,
): Meta3dEngineCoreProtocol.StateType.state => {
  {
    ...state,
    componentContributeData: {
      ...componentContributeData,
      allComponentContributes: componentContributeData.allComponentContributes->Meta3dCommonlib.ImmutableHashMap.deleteVal(
        componentName,
      ),
    },
  }
}

let unsafeGetUsedComponentContribute = (
  {componentContributeData}: Meta3dEngineCoreProtocol.StateType.state,
  componentName: Meta3dEngineCoreProtocol.IComponentForJs.componentName,
): Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute => {
  componentContributeData.allUsedComponentContributes->Meta3dCommonlib.MutableHashMap.unsafeGet(
    componentName,
  )
}

let setUsedComponentContribute = (
  state: Meta3dEngineCoreProtocol.StateType.state,
  usedComponentContribute: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
  componentName: Meta3dEngineCoreProtocol.IComponentForJs.componentName,
): Meta3dEngineCoreProtocol.StateType.state => {
  state.componentContributeData.allUsedComponentContributes
  ->Meta3dCommonlib.MutableHashMap.set(componentName, usedComponentContribute)
  ->ignore

  state
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
    state.componentContributeData.allComponentContributes->Meta3dCommonlib.ImmutableHashMap.unsafeGet(
      componentName,
    )

  {
    ...state,
    componentContributeData: {
      ...state.componentContributeData,
      allUsedComponentContributes: state.componentContributeData.allUsedComponentContributes->Meta3dCommonlib.ImmutableHashMap.set(
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
  usedComponentContribute: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
): Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute => {
  usedComponentContribute.state = componentState

  usedComponentContribute
}

let createComponent = (
  usedComponentContribute: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
): (
  Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
  Meta3dEngineCoreProtocol.RegisterComponentType.component,
) => {
  let (componentState, component) = usedComponentContribute.createComponentFunc(.
    usedComponentContribute.state,
  )

  (_setComponentStateToData(componentState, usedComponentContribute), component)
}

let setComponentData = (
  usedComponentContribute: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
  component: Meta3dEngineCoreProtocol.RegisterComponentType.component,
  dataName: Meta3dEngineCoreProtocol.RegisterComponentType.dataName,
  dataValue: Meta3dEngineCoreProtocol.IComponentForJs.dataValue,
): Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute => {
  // let usedComponentContribute = state->unsafeGetUsedComponentContributeribute(componentName)

  usedComponentContribute.setComponentDataFunc(.
    usedComponentContribute.state,
    component,
    dataName,
    dataValue,
  )->_setComponentStateToData(usedComponentContribute)

  // ->_setComponentStateToData(state, usedComponentContribute, componentName, _)

  // state
}

let addComponent = (
  usedComponentContribute: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
  gameObject: Meta3dEngineCoreProtocol.IGameObjectForJs.gameObject,
  component: Meta3dEngineCoreProtocol.RegisterComponentType.component,
): Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute => {
  usedComponentContribute.addComponentFunc(.
    usedComponentContribute.state,
    gameObject,
    component,
  )->_setComponentStateToData(usedComponentContribute)
}

let hasComponent = (
  usedComponentContribute: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
  gameObject: Meta3dEngineCoreProtocol.IGameObjectForJs.gameObject,
): bool => {
  usedComponentContribute.hasComponentFunc(. usedComponentContribute.state, gameObject)
}

let getComponent = (
  usedComponentContribute: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
  gameObject: Meta3dEngineCoreProtocol.IGameObjectForJs.gameObject,
): Js.Nullable.t<Meta3dEngineCoreProtocol.RegisterComponentType.component> => {
  usedComponentContribute.getComponentFunc(. usedComponentContribute.state, gameObject)
}

let getAllComponents = (
  usedComponentContribute: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
): array<Meta3dEngineCoreProtocol.RegisterComponentType.component> => {
  usedComponentContribute.getAllComponentsFunc(. usedComponentContribute.state)
}

let getComponentData = (
  usedComponentContribute: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
  component: Meta3dEngineCoreProtocol.RegisterComponentType.component,
  dataName: Meta3dEngineCoreProtocol.RegisterComponentType.dataName,
): Js.Nullable.t<Meta3dEngineCoreProtocol.IComponentForJs.dataValue> => {
  usedComponentContribute.getComponentDataFunc(. usedComponentContribute.state, component, dataName)
}

let getComponentGameObjects = (
  usedComponentContribute: Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
  component: Meta3dEngineCoreProtocol.RegisterComponentType.component,
): array<Meta3dEngineCoreProtocol.IGameObjectForJs.gameObject> => {
  usedComponentContribute.getGameObjectsFunc(. usedComponentContribute.state, component)
}

let getComponentState = (
  state: Meta3dEngineCoreProtocol.StateType.state,
  componentName: Meta3dEngineCoreProtocol.IComponentForJs.componentName,
) => {
  state.componentContributeData.allUsedComponentContributes
  ->Meta3dCommonlib.MutableHashMap.get(componentName)
  ->Meta3dCommonlib.OptionSt.map(({state}) => state)
}

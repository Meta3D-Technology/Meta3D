let registerComponent = (
  {componentContributeData} as state: Meta3dEngineCoreSceneviewProtocol.StateType.state,
  componentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.componentContribute,
): Meta3dCommonlib.Result.t2<Meta3dEngineCoreSceneviewProtocol.StateType.state> => {
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
  }, ContributeDataManager.getIsDebug(state))->Meta3dCommonlib.Result.mapSuccess(() => {
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
  {componentContributeData} as state: Meta3dEngineCoreSceneviewProtocol.StateType.state,
  componentName: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.componentName,
): Meta3dEngineCoreSceneviewProtocol.StateType.state => {
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
  {componentContributeData}: Meta3dEngineCoreSceneviewProtocol.StateType.state,
  componentName: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.componentName,
): Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute => {
  componentContributeData.allUsedComponentContributes->Meta3dCommonlib.MutableHashMap.unsafeGet(
    componentName,
  )
}

let setUsedComponentContribute = (
  state: Meta3dEngineCoreSceneviewProtocol.StateType.state,
  usedComponentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
  componentName: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.componentName,
): Meta3dEngineCoreSceneviewProtocol.StateType.state => {
  state.componentContributeData.allUsedComponentContributes
  ->Meta3dCommonlib.MutableHashMap.set(componentName, usedComponentContribute)
  ->ignore

  state
}

let createAndSetComponentState = (
  state: Meta3dEngineCoreSceneviewProtocol.StateType.state,
  componentName: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.componentName,
  config: Meta3dEngineCoreSceneviewProtocol.ComponentType.config,
): Meta3dEngineCoreSceneviewProtocol.StateType.state => {
  let {
    createStateFunc,
    getGameObjectsFunc,
    createComponentFunc,
    addComponentFunc,
    removeComponentFunc,
    hasComponentFunc,
    getComponentFunc,
    getNeedDisposedComponentsFunc,
    deferDisposeComponentFunc,
    disposeComponentsFunc,
    cloneComponentFunc,
    getAllComponentsFunc,
    getComponentDataFunc,
    setComponentDataFunc,
    restore,
    deepCopy,
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
          componentName,
          state: createStateFunc(. config),
          createComponentFunc,
          getGameObjectsFunc,
          addComponentFunc,
          removeComponentFunc,
          hasComponentFunc,
          getComponentFunc,
          getNeedDisposedComponentsFunc,
          deferDisposeComponentFunc,
          disposeComponentsFunc,
          cloneComponentFunc,
          getAllComponentsFunc,
          getComponentDataFunc,
          setComponentDataFunc,
          restore,
          deepCopy,
        },
      ),
    },
  }
}

let setComponentStateToUsedComponentContribute = (
  componentState: Meta3dEngineCoreSceneviewProtocol.ComponentType.state,
  usedComponentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
): Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute => {
  {
    ...usedComponentContribute,
    state: componentState,
  }
}

let createComponent = (
  usedComponentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
): (
  Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
  Meta3dEngineCoreSceneviewProtocol.ComponentType.component,
) => {
  let (componentState, component) = usedComponentContribute.createComponentFunc(.
    usedComponentContribute.state,
  )

  (setComponentStateToUsedComponentContribute(componentState, usedComponentContribute), component)
}

let setComponentData = (
  usedComponentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
  component: Meta3dEngineCoreSceneviewProtocol.ComponentType.component,
  dataName: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.dataName,
  dataValue: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.dataValue,
): Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute => {
  // let usedComponentContribute = state->unsafeGetUsedComponentContributeribute(componentName)

  usedComponentContribute.setComponentDataFunc(.
    usedComponentContribute.state,
    component,
    dataName,
    dataValue,
  )->setComponentStateToUsedComponentContribute(usedComponentContribute)

  // ->setComponentStateToUsedComponentContribute(state, usedComponentContribute, componentName, _)

  // state
}

let addComponent = (
  usedComponentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
  gameObject: Meta3dGameobjectProtocol.Index.gameObject,
  component: Meta3dEngineCoreSceneviewProtocol.ComponentType.component,
): Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute => {
  usedComponentContribute.addComponentFunc(.
    usedComponentContribute.state,
    gameObject,
    component,
  )->setComponentStateToUsedComponentContribute(usedComponentContribute)
}

let removeComponent = (
  usedComponentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
  gameObject: Meta3dGameobjectProtocol.Index.gameObject,
  component: Meta3dEngineCoreSceneviewProtocol.ComponentType.component,
): Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute => {
  usedComponentContribute.removeComponentFunc(.
    usedComponentContribute.state,
    gameObject,
    component,
  )->setComponentStateToUsedComponentContribute(usedComponentContribute)
}

let hasComponent = (
  usedComponentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
  gameObject: Meta3dGameobjectProtocol.Index.gameObject,
): bool => {
  usedComponentContribute.hasComponentFunc(. usedComponentContribute.state, gameObject)
}

let getComponent = (
  usedComponentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
  gameObject: Meta3dGameobjectProtocol.Index.gameObject,
): Js.Nullable.t<Meta3dEngineCoreSceneviewProtocol.ComponentType.component> => {
  usedComponentContribute.getComponentFunc(. usedComponentContribute.state, gameObject)
}

let getNeedDisposedComponents = (
  usedComponentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
) => {
  usedComponentContribute.getNeedDisposedComponentsFunc(. usedComponentContribute.state)
}

let deferDisposeComponent = (
  usedComponentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
  deferDisposeData,
): Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute => {
  usedComponentContribute.deferDisposeComponentFunc(.
    usedComponentContribute.state,
    deferDisposeData,
  )->setComponentStateToUsedComponentContribute(usedComponentContribute)
}

let disposeComponents = (
  usedComponentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
  // components: array<Meta3dEngineCoreSceneviewProtocol.ComponentType.component>,
  batchDisposeData,
): (
  Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
  array<Meta3dEngineCoreSceneviewProtocol.ComponentType.component>,
) => {
  let (componentState, actuallyDisposedComponents) = usedComponentContribute.disposeComponentsFunc(.
    usedComponentContribute.state,
    batchDisposeData,
  )

  (
    componentState->setComponentStateToUsedComponentContribute(usedComponentContribute),
    actuallyDisposedComponents,
  )
}

let getAllComponents = (
  usedComponentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
): array<Meta3dEngineCoreSceneviewProtocol.ComponentType.component> => {
  usedComponentContribute.getAllComponentsFunc(. usedComponentContribute.state)
}

let getComponentData = (
  usedComponentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
  component: Meta3dEngineCoreSceneviewProtocol.ComponentType.component,
  dataName: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.dataName,
): Js.Nullable.t<Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.dataValue> => {
  usedComponentContribute.getComponentDataFunc(. usedComponentContribute.state, component, dataName)
}

let getComponentGameObjects = (
  usedComponentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
  component: Meta3dEngineCoreSceneviewProtocol.ComponentType.component,
): array<Meta3dGameobjectProtocol.Index.gameObject> => {
  usedComponentContribute.getGameObjectsFunc(. usedComponentContribute.state, component)
}

let getComponentState = (
  state: Meta3dEngineCoreSceneviewProtocol.StateType.state,
  componentName: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.componentName,
) => {
  state.componentContributeData.allUsedComponentContributes
  ->Meta3dCommonlib.MutableHashMap.get(componentName)
  ->Meta3dCommonlib.OptionSt.map(({state}) => state)
}

let restore = (
  currentUsedComponentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
  targetUsedComponentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
): Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute => {
  currentUsedComponentContribute.restore(.
    currentUsedComponentContribute.state,
    targetUsedComponentContribute.state,
  )->setComponentStateToUsedComponentContribute(targetUsedComponentContribute)
}

let deepCopy = (
  usedComponentContribute: Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
): Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute => {
  usedComponentContribute.deepCopy(.
    usedComponentContribute.state,
  )->setComponentStateToUsedComponentContribute(usedComponentContribute)
}

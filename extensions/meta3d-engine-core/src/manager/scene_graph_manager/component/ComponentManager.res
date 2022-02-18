let registerComponent = (
  {componentData} as po: POType.po,
  data: RegisterComponentType.registeredComponent,
): Meta3dCommonlib.Result.t2<POType.po> => {
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
      ...po,
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
  {componentData} as po: POType.po,
  componentName: Meta3dEngineCoreType.IComponentForJs.componentName,
): POType.po => {
  {
    ...po,
    componentData: {
      ...componentData,
      allRegisteredComponentData: componentData.allRegisteredComponentData->Meta3dCommonlib.ImmutableHashMap.deleteVal(
        componentName,
      ),
    },
  }
}

let unsafeGetUsedComponentData = (
  {componentData}: POType.po,
  componentName: Meta3dEngineCoreType.IComponentForJs.componentName,
): RegisterComponentType.usedComponentData => {
  componentData.allUsedComponentData->Meta3dCommonlib.MutableHashMap.unsafeGet(componentName)
}

let setRelatedComponentData = (
  poState: POType.po,
  data: RegisterComponentType.usedComponentData,
  componentName: Meta3dEngineCoreType.IComponentForJs.componentName,
): POType.po => {
  poState.componentData.allUsedComponentData
  ->Meta3dCommonlib.MutableHashMap.set(componentName, data)
  ->ignore

  poState
}

let createAndSetComponentState = (
  po: POType.po,
  componentName: Meta3dEngineCoreType.IComponentForJs.componentName,
  config: RegisterComponentType.config,
): POType.po => {
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
    po.componentData.allRegisteredComponentData->Meta3dCommonlib.ImmutableHashMap.unsafeGet(
      componentName,
    )

  {
    ...po,
    componentData: {
      ...po.componentData,
      allUsedComponentData: po.componentData.allUsedComponentData->Meta3dCommonlib.ImmutableHashMap.set(
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
  // let data = po->unsafeGetUsedComponentData(componentName)

  data.setComponentDataFunc(. data.state, component, dataName, dataValue)->_setComponentStateToData(
    data,
  )

  // ->_setComponentStateToData(po, data, componentName, _)

  // po
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

let getState = (po: POType.po, componentName: Meta3dEngineCoreType.IComponentForJs.componentName) => {
  po.componentData.allUsedComponentData
  ->Meta3dCommonlib.MutableHashMap.get(componentName)
  ->Meta3dCommonlib.OptionSt.map(({state}) => state)
}

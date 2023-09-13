let unsafeGetUsedGameObjectContribute = (
  {usedGameObjectContribute}: Meta3dEngineCoreProtocol.StateType.state,
): Meta3dEngineCoreProtocol.GameObjectType.usedGameObjectContribute => {
  usedGameObjectContribute->Meta3dCommonlib.OptionSt.unsafeGet
}


let getAllUsedContributes = state => {
  (
    state->unsafeGetUsedGameObjectContribute,
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentTransformProtocol.Index.componentName,
    ),
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentPbrmaterialProtocol.Index.componentName,
    ),
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentGeometryProtocol.Index.componentName,
    ),
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentDirectionlightProtocol.Index.componentName,
    ),
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentArcballcameracontrollerProtocol.Index.componentName,
    ),
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentBasiccameraviewProtocol.Index.componentName,
    ),
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.componentName,
    ),
  )
}

let setGameObjectStateToState = (
  state: Meta3dEngineCoreProtocol.StateType.state,
  usedGameObjectContribute: Meta3dEngineCoreProtocol.GameObjectType.usedGameObjectContribute,
  gameObjectState: Meta3dEngineCoreProtocol.GameObjectType.state,
): Meta3dEngineCoreProtocol.StateType.state => {
  usedGameObjectContribute.state = gameObjectState

  state.usedGameObjectContribute = usedGameObjectContribute->Some

  state
}

let setGameObjectStateAndAllUsedComponentContributesToState = (
  state,
  (
    usedGameObjectContribute,
    usedTransformContribute,
    usedPBRMaterialContribute,
    usedGeometryContribute,
    usedDirectionLightContribute,
    usedArcballCameraControllerContribute,
    usedBasicCameraViewContribute,
    usedPerspectiveCameraProjectionContribute,
  ),
  gameObjectState,
) => {
  state
  ->setGameObjectStateToState(usedGameObjectContribute, gameObjectState)
  ->ComponentManager.setUsedComponentContribute(
    usedTransformContribute,
    Meta3dComponentTransformProtocol.Index.componentName,
  )
  ->ComponentManager.setUsedComponentContribute(
    usedPBRMaterialContribute,
    Meta3dComponentPbrmaterialProtocol.Index.componentName,
  )
  ->ComponentManager.setUsedComponentContribute(
    usedGeometryContribute,
    Meta3dComponentGeometryProtocol.Index.componentName,
  )
  ->ComponentManager.setUsedComponentContribute(
    usedDirectionLightContribute,
    Meta3dComponentDirectionlightProtocol.Index.componentName,
  )
  ->ComponentManager.setUsedComponentContribute(
    usedArcballCameraControllerContribute,
    Meta3dComponentArcballcameracontrollerProtocol.Index.componentName,
  )
  ->ComponentManager.setUsedComponentContribute(
    usedBasicCameraViewContribute,
    Meta3dComponentBasiccameraviewProtocol.Index.componentName,
  )
  ->ComponentManager.setUsedComponentContribute(
    usedPerspectiveCameraProjectionContribute,
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.componentName,
  )
}
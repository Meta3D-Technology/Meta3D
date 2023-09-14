let restore = (currentState, targetState) => {
  let (
    currentUsedGameObjectContribute,
    currentUsedTransformContribute,
    currentUsedPBRMaterialContribute,
    currentUsedGeometryContribute,
    currentUsedDirectionLightContribute,
    currentUsedArcballCameraControllerContribute,
    currentUsedBasicCameraViewContribute,
    currentUsedPerspectiveCameraProjectionContribute,
  ) = StateUtils.getAllUsedContributes(currentState)

  let (
    targetUsedGameObjectContribute,
    targetUsedTransformContribute,
    targetUsedPBRMaterialContribute,
    targetUsedGeometryContribute,
    targetUsedDirectionLightContribute,
    targetUsedArcballCameraControllerContribute,
    targetUsedBasicCameraViewContribute,
    targetUsedPerspectiveCameraProjectionContribute,
  ) = StateUtils.getAllUsedContributes(targetState)

  let gameObjectState = currentUsedGameObjectContribute.restore(.
    currentUsedGameObjectContribute.state,
    targetUsedGameObjectContribute.state,
  )

  let usedTransformContribute = ComponentManager.restore(
    currentUsedTransformContribute,
    targetUsedTransformContribute,
  )

  let usedPBRMaterialContribute = ComponentManager.restore(
    currentUsedPBRMaterialContribute,
    targetUsedPBRMaterialContribute,
  )

  let usedGeometryContribute = ComponentManager.restore(
    currentUsedGeometryContribute,
    targetUsedGeometryContribute,
  )

  let usedDirectionLightContribute = ComponentManager.restore(
    currentUsedDirectionLightContribute,
    targetUsedDirectionLightContribute,
  )

  let usedArcballCameraControllerContribute = ComponentManager.restore(
    currentUsedArcballCameraControllerContribute,
    targetUsedArcballCameraControllerContribute,
  )

  let usedBasicCameraViewContribute = ComponentManager.restore(
    currentUsedBasicCameraViewContribute,
    targetUsedBasicCameraViewContribute,
  )

  let usedPerspectiveCameraProjectionContribute = ComponentManager.restore(
    currentUsedPerspectiveCameraProjectionContribute,
    targetUsedPerspectiveCameraProjectionContribute,
  )

  targetState->StateUtils.setGameObjectStateAndAllUsedComponentContributesToState(
    (
      targetUsedGameObjectContribute,
      usedTransformContribute,
      usedPBRMaterialContribute,
      usedGeometryContribute,
      usedDirectionLightContribute,
      usedArcballCameraControllerContribute,
      usedBasicCameraViewContribute,
      usedPerspectiveCameraProjectionContribute,
    ),
    gameObjectState,
  )
}

let deepCopy = state => {
  let (
    usedGameObjectContribute,
    usedTransformContribute,
    usedPBRMaterialContribute,
    usedGeometryContribute,
    usedDirectionLightContribute,
    usedArcballCameraControllerContribute,
    usedBasicCameraViewContribute,
    usedPerspectiveCameraProjectionContribute,
  ) = StateUtils.getAllUsedContributes(state)

  let gameObjectState = usedGameObjectContribute.deepCopy(. usedGameObjectContribute.state)

  let usedTransformContribute = ComponentManager.deepCopy(usedTransformContribute)

  let usedPBRMaterialContribute = ComponentManager.deepCopy(usedPBRMaterialContribute)

  let usedGeometryContribute = ComponentManager.deepCopy(usedGeometryContribute)

  let usedDirectionLightContribute = ComponentManager.deepCopy(usedDirectionLightContribute)

  let usedArcballCameraControllerContribute = ComponentManager.deepCopy(
    usedArcballCameraControllerContribute,
  )

  let usedBasicCameraViewContribute = ComponentManager.deepCopy(usedBasicCameraViewContribute)

  let usedPerspectiveCameraProjectionContribute = ComponentManager.deepCopy(
    usedPerspectiveCameraProjectionContribute,
  )

  state->StateUtils.setGameObjectStateAndAllUsedComponentContributesToState(
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
  )
}

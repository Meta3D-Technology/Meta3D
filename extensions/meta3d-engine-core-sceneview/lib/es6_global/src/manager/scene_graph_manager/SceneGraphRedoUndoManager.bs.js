

import * as StateUtils$Meta3dEngineCoreSceneview from "./StateUtils.bs.js";
import * as ComponentManager$Meta3dEngineCoreSceneview from "./component/ComponentManager.bs.js";

function restore(currentState, targetState) {
  var match = StateUtils$Meta3dEngineCoreSceneview.getAllUsedContributes(currentState);
  var currentUsedGameObjectContribute = match[0];
  var match$1 = StateUtils$Meta3dEngineCoreSceneview.getAllUsedContributes(targetState);
  var targetUsedGameObjectContribute = match$1[0];
  var gameObjectState = currentUsedGameObjectContribute.restore(currentUsedGameObjectContribute.state, targetUsedGameObjectContribute.state);
  var usedTransformContribute = ComponentManager$Meta3dEngineCoreSceneview.restore(match[1], match$1[1]);
  var usedPBRMaterialContribute = ComponentManager$Meta3dEngineCoreSceneview.restore(match[2], match$1[2]);
  var usedGeometryContribute = ComponentManager$Meta3dEngineCoreSceneview.restore(match[3], match$1[3]);
  var usedDirectionLightContribute = ComponentManager$Meta3dEngineCoreSceneview.restore(match[4], match$1[4]);
  var usedArcballCameraControllerContribute = ComponentManager$Meta3dEngineCoreSceneview.restore(match[5], match$1[5]);
  var usedBasicCameraViewContribute = ComponentManager$Meta3dEngineCoreSceneview.restore(match[6], match$1[6]);
  var usedPerspectiveCameraProjectionContribute = ComponentManager$Meta3dEngineCoreSceneview.restore(match[7], match$1[7]);
  return StateUtils$Meta3dEngineCoreSceneview.setGameObjectStateAndAllUsedComponentContributesToState(targetState, [
              targetUsedGameObjectContribute,
              usedTransformContribute,
              usedPBRMaterialContribute,
              usedGeometryContribute,
              usedDirectionLightContribute,
              usedArcballCameraControllerContribute,
              usedBasicCameraViewContribute,
              usedPerspectiveCameraProjectionContribute
            ], gameObjectState);
}

function deepCopy(state) {
  var match = StateUtils$Meta3dEngineCoreSceneview.getAllUsedContributes(state);
  var usedGameObjectContribute = match[0];
  var gameObjectState = usedGameObjectContribute.deepCopy(usedGameObjectContribute.state);
  var usedTransformContribute = ComponentManager$Meta3dEngineCoreSceneview.deepCopy(match[1]);
  var usedPBRMaterialContribute = ComponentManager$Meta3dEngineCoreSceneview.deepCopy(match[2]);
  var usedGeometryContribute = ComponentManager$Meta3dEngineCoreSceneview.deepCopy(match[3]);
  var usedDirectionLightContribute = ComponentManager$Meta3dEngineCoreSceneview.deepCopy(match[4]);
  var usedArcballCameraControllerContribute = ComponentManager$Meta3dEngineCoreSceneview.deepCopy(match[5]);
  var usedBasicCameraViewContribute = ComponentManager$Meta3dEngineCoreSceneview.deepCopy(match[6]);
  var usedPerspectiveCameraProjectionContribute = ComponentManager$Meta3dEngineCoreSceneview.deepCopy(match[7]);
  return StateUtils$Meta3dEngineCoreSceneview.setGameObjectStateAndAllUsedComponentContributesToState(state, [
              usedGameObjectContribute,
              usedTransformContribute,
              usedPBRMaterialContribute,
              usedGeometryContribute,
              usedDirectionLightContribute,
              usedArcballCameraControllerContribute,
              usedBasicCameraViewContribute,
              usedPerspectiveCameraProjectionContribute
            ], gameObjectState);
}

export {
  restore ,
  deepCopy ,
}
/* No side effect */

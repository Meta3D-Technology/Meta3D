'use strict';

var StateUtils$Meta3dEngineCore = require("./StateUtils.bs.js");
var ComponentManager$Meta3dEngineCore = require("./component/ComponentManager.bs.js");

function restore(currentState, targetState) {
  var match = StateUtils$Meta3dEngineCore.getAllUsedContributes(currentState);
  var currentUsedGameObjectContribute = match[0];
  var match$1 = StateUtils$Meta3dEngineCore.getAllUsedContributes(targetState);
  var targetUsedGameObjectContribute = match$1[0];
  var gameObjectState = currentUsedGameObjectContribute.restore(currentUsedGameObjectContribute.state, targetUsedGameObjectContribute.state);
  var usedTransformContribute = ComponentManager$Meta3dEngineCore.restore(match[1], match$1[1]);
  var usedPBRMaterialContribute = ComponentManager$Meta3dEngineCore.restore(match[2], match$1[2]);
  var usedGeometryContribute = ComponentManager$Meta3dEngineCore.restore(match[3], match$1[3]);
  var usedDirectionLightContribute = ComponentManager$Meta3dEngineCore.restore(match[4], match$1[4]);
  var usedArcballCameraControllerContribute = ComponentManager$Meta3dEngineCore.restore(match[5], match$1[5]);
  var usedBasicCameraViewContribute = ComponentManager$Meta3dEngineCore.restore(match[6], match$1[6]);
  var usedPerspectiveCameraProjectionContribute = ComponentManager$Meta3dEngineCore.restore(match[7], match$1[7]);
  var usedScriptContribute = ComponentManager$Meta3dEngineCore.restore(match[8], match$1[8]);
  return StateUtils$Meta3dEngineCore.setGameObjectStateAndAllUsedComponentContributesToState(targetState, [
              targetUsedGameObjectContribute,
              usedTransformContribute,
              usedPBRMaterialContribute,
              usedGeometryContribute,
              usedDirectionLightContribute,
              usedArcballCameraControllerContribute,
              usedBasicCameraViewContribute,
              usedPerspectiveCameraProjectionContribute,
              usedScriptContribute
            ], gameObjectState);
}

function deepCopy(state) {
  var match = StateUtils$Meta3dEngineCore.getAllUsedContributes(state);
  var usedGameObjectContribute = match[0];
  var gameObjectState = usedGameObjectContribute.deepCopy(usedGameObjectContribute.state);
  var usedTransformContribute = ComponentManager$Meta3dEngineCore.deepCopy(match[1]);
  var usedPBRMaterialContribute = ComponentManager$Meta3dEngineCore.deepCopy(match[2]);
  var usedGeometryContribute = ComponentManager$Meta3dEngineCore.deepCopy(match[3]);
  var usedDirectionLightContribute = ComponentManager$Meta3dEngineCore.deepCopy(match[4]);
  var usedArcballCameraControllerContribute = ComponentManager$Meta3dEngineCore.deepCopy(match[5]);
  var usedBasicCameraViewContribute = ComponentManager$Meta3dEngineCore.deepCopy(match[6]);
  var usedPerspectiveCameraProjectionContribute = ComponentManager$Meta3dEngineCore.deepCopy(match[7]);
  var usedScriptContribute = ComponentManager$Meta3dEngineCore.deepCopy(match[8]);
  return StateUtils$Meta3dEngineCore.setGameObjectStateAndAllUsedComponentContributesToState(state, [
              usedGameObjectContribute,
              usedTransformContribute,
              usedPBRMaterialContribute,
              usedGeometryContribute,
              usedDirectionLightContribute,
              usedArcballCameraControllerContribute,
              usedBasicCameraViewContribute,
              usedPerspectiveCameraProjectionContribute,
              usedScriptContribute
            ], gameObjectState);
}

exports.restore = restore;
exports.deepCopy = deepCopy;
/* No side effect */

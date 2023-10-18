'use strict';

var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var StateUtils$Meta3dEngineCoreSceneview = require("./StateUtils.bs.js");
var ComponentManager$Meta3dEngineCoreSceneview = require("./component/ComponentManager.bs.js");

function unsafeGetGameObjectData(state) {
  return OptionSt$Meta3dCommonlib.unsafeGet(state.gameObjectContribute);
}

function setGameObjectContribute(state, gameObjectContribute) {
  return {
          allRegisteredPipelineContribute: state.allRegisteredPipelineContribute,
          states: state.states,
          contributeData: state.contributeData,
          componentContributeData: state.componentContributeData,
          gameObjectContribute: gameObjectContribute,
          usedGameObjectContribute: state.usedGameObjectContribute
        };
}

function createAndSetState(state, config) {
  var match = OptionSt$Meta3dCommonlib.unsafeGet(state.gameObjectContribute);
  return {
          allRegisteredPipelineContribute: state.allRegisteredPipelineContribute,
          states: state.states,
          contributeData: state.contributeData,
          componentContributeData: state.componentContributeData,
          gameObjectContribute: state.gameObjectContribute,
          usedGameObjectContribute: {
            state: match.createStateFunc(config),
            createGameObjectFunc: match.createGameObjectFunc,
            getNeedDisposedGameObjectsFunc: match.getNeedDisposedGameObjectsFunc,
            deferDisposeGameObjectFunc: match.deferDisposeGameObjectFunc,
            disposeGameObjectsFunc: match.disposeGameObjectsFunc,
            cloneGameObjectFunc: match.cloneGameObjectFunc,
            getAllGameObjectsFunc: match.getAllGameObjectsFunc,
            restore: match.restore,
            deepCopy: match.deepCopy
          }
        };
}

function createGameObject(state) {
  var usedGameObjectContribute = StateUtils$Meta3dEngineCoreSceneview.unsafeGetUsedGameObjectContribute(state);
  var match = usedGameObjectContribute.createGameObjectFunc(usedGameObjectContribute.state);
  return [
          StateUtils$Meta3dEngineCoreSceneview.setGameObjectStateToState(state, usedGameObjectContribute, match[0]),
          match[1]
        ];
}

function _setGameObjectStateAndAllComponentStatesToState(state, param, param$1) {
  var usedTransformContribute = ComponentManager$Meta3dEngineCoreSceneview.setComponentStateToUsedComponentContribute(param$1[1], param[1]);
  var usedPBRMaterialContribute = ComponentManager$Meta3dEngineCoreSceneview.setComponentStateToUsedComponentContribute(param$1[2], param[2]);
  var usedGeometryContribute = ComponentManager$Meta3dEngineCoreSceneview.setComponentStateToUsedComponentContribute(param$1[3], param[3]);
  var usedDirectionLightContribute = ComponentManager$Meta3dEngineCoreSceneview.setComponentStateToUsedComponentContribute(param$1[4], param[4]);
  var usedArcballCameraControllerContribute = ComponentManager$Meta3dEngineCoreSceneview.setComponentStateToUsedComponentContribute(param$1[5], param[5]);
  var usedBasicCameraViewContribute = ComponentManager$Meta3dEngineCoreSceneview.setComponentStateToUsedComponentContribute(param$1[6], param[6]);
  var usedPerspectiveCameraProjectionContribute = ComponentManager$Meta3dEngineCoreSceneview.setComponentStateToUsedComponentContribute(param$1[7], param[7]);
  return StateUtils$Meta3dEngineCoreSceneview.setGameObjectStateAndAllUsedComponentContributesToState(state, [
              param[0],
              usedTransformContribute,
              usedPBRMaterialContribute,
              usedGeometryContribute,
              usedDirectionLightContribute,
              usedArcballCameraControllerContribute,
              usedBasicCameraViewContribute,
              usedPerspectiveCameraProjectionContribute
            ], param$1[0]);
}

function getNeedDisposedGameObjects(state) {
  var usedGameObjectContribute = StateUtils$Meta3dEngineCoreSceneview.unsafeGetUsedGameObjectContribute(state);
  return usedGameObjectContribute.getNeedDisposedGameObjectsFunc(usedGameObjectContribute.state);
}

function deferDisposeGameObject(state, gameObject) {
  var match = StateUtils$Meta3dEngineCoreSceneview.getAllUsedContributes(state);
  var usedPerspectiveCameraProjectionContribute = match[7];
  var usedBasicCameraViewContribute = match[6];
  var usedArcballCameraControllerContribute = match[5];
  var usedDirectionLightContribute = match[4];
  var usedGeometryContribute = match[3];
  var usedPBRMaterialContribute = match[2];
  var usedTransformContribute = match[1];
  var usedGameObjectContribute = match[0];
  var match$1 = usedGameObjectContribute.deferDisposeGameObjectFunc([
        usedGameObjectContribute.state,
        usedTransformContribute.state,
        usedPBRMaterialContribute.state,
        usedGeometryContribute.state,
        usedDirectionLightContribute.state,
        usedArcballCameraControllerContribute.state,
        usedBasicCameraViewContribute.state,
        usedPerspectiveCameraProjectionContribute.state
      ], [
        [
          usedTransformContribute.getComponentFunc,
          usedTransformContribute.deferDisposeComponentFunc
        ],
        [
          usedPBRMaterialContribute.getComponentFunc,
          usedPBRMaterialContribute.deferDisposeComponentFunc
        ],
        [
          usedGeometryContribute.getComponentFunc,
          usedGeometryContribute.deferDisposeComponentFunc
        ],
        [
          usedDirectionLightContribute.getComponentFunc,
          usedDirectionLightContribute.deferDisposeComponentFunc
        ],
        [
          usedArcballCameraControllerContribute.getComponentFunc,
          usedArcballCameraControllerContribute.deferDisposeComponentFunc
        ],
        [
          usedBasicCameraViewContribute.getComponentFunc,
          usedBasicCameraViewContribute.deferDisposeComponentFunc
        ],
        [
          usedPerspectiveCameraProjectionContribute.getComponentFunc,
          usedPerspectiveCameraProjectionContribute.deferDisposeComponentFunc
        ]
      ], gameObject);
  return _setGameObjectStateAndAllComponentStatesToState(state, [
              usedGameObjectContribute,
              usedTransformContribute,
              usedPBRMaterialContribute,
              usedGeometryContribute,
              usedDirectionLightContribute,
              usedArcballCameraControllerContribute,
              usedBasicCameraViewContribute,
              usedPerspectiveCameraProjectionContribute
            ], [
              match$1[0],
              match$1[1],
              match$1[2],
              match$1[3],
              match$1[4],
              match$1[5],
              match$1[6],
              match$1[7]
            ]);
}

function disposeGameObjects(state, gameObjects) {
  var match = StateUtils$Meta3dEngineCoreSceneview.getAllUsedContributes(state);
  var usedPerspectiveCameraProjectionContribute = match[7];
  var usedBasicCameraViewContribute = match[6];
  var usedArcballCameraControllerContribute = match[5];
  var usedDirectionLightContribute = match[4];
  var usedGeometryContribute = match[3];
  var usedPBRMaterialContribute = match[2];
  var usedTransformContribute = match[1];
  var usedGameObjectContribute = match[0];
  var match$1 = usedGameObjectContribute.disposeGameObjectsFunc([
        usedGameObjectContribute.state,
        usedTransformContribute.state,
        usedPBRMaterialContribute.state,
        usedGeometryContribute.state,
        usedDirectionLightContribute.state,
        usedArcballCameraControllerContribute.state,
        usedBasicCameraViewContribute.state,
        usedPerspectiveCameraProjectionContribute.state
      ], [
        [
          usedTransformContribute.getComponentFunc,
          usedTransformContribute.disposeComponentsFunc
        ],
        [
          usedPBRMaterialContribute.getComponentFunc,
          usedPBRMaterialContribute.disposeComponentsFunc
        ],
        [
          usedGeometryContribute.getComponentFunc,
          usedGeometryContribute.disposeComponentsFunc
        ],
        [
          usedDirectionLightContribute.getComponentFunc,
          usedDirectionLightContribute.disposeComponentsFunc
        ],
        [
          usedArcballCameraControllerContribute.getComponentFunc,
          usedArcballCameraControllerContribute.disposeComponentsFunc
        ],
        [
          usedBasicCameraViewContribute.getComponentFunc,
          usedBasicCameraViewContribute.disposeComponentsFunc
        ],
        [
          usedPerspectiveCameraProjectionContribute.getComponentFunc,
          usedPerspectiveCameraProjectionContribute.disposeComponentsFunc
        ]
      ], gameObjects);
  var match$2 = match$1[1];
  var match$3 = match$1[0];
  return [
          _setGameObjectStateAndAllComponentStatesToState(state, [
                usedGameObjectContribute,
                usedTransformContribute,
                usedPBRMaterialContribute,
                usedGeometryContribute,
                usedDirectionLightContribute,
                usedArcballCameraControllerContribute,
                usedBasicCameraViewContribute,
                usedPerspectiveCameraProjectionContribute
              ], [
                match$3[0],
                match$3[1],
                match$3[2],
                match$3[3],
                match$3[4],
                match$3[5],
                match$3[6],
                match$3[7]
              ]),
          [
            match$2[0],
            match$2[1],
            match$2[2],
            match$2[3],
            match$2[4],
            match$2[5],
            match$2[6],
            match$2[7]
          ]
        ];
}

function cloneGameObject(state, count, cloneConfig, sourceGameObject) {
  var match = StateUtils$Meta3dEngineCoreSceneview.getAllUsedContributes(state);
  var usedPerspectiveCameraProjectionContribute = match[7];
  var usedBasicCameraViewContribute = match[6];
  var usedArcballCameraControllerContribute = match[5];
  var usedDirectionLightContribute = match[4];
  var usedGeometryContribute = match[3];
  var usedPBRMaterialContribute = match[2];
  var usedTransformContribute = match[1];
  var usedGameObjectContribute = match[0];
  var match$1 = usedGameObjectContribute.cloneGameObjectFunc([
        usedGameObjectContribute.state,
        usedTransformContribute.state,
        usedPBRMaterialContribute.state,
        usedGeometryContribute.state,
        usedDirectionLightContribute.state,
        usedArcballCameraControllerContribute.state,
        usedBasicCameraViewContribute.state,
        usedPerspectiveCameraProjectionContribute.state
      ], [
        [
          usedTransformContribute.getComponentFunc,
          usedTransformContribute.cloneComponentFunc,
          usedTransformContribute.addComponentFunc,
          usedTransformContribute.getGameObjectsFunc,
          usedTransformContribute.getComponentDataFunc,
          usedTransformContribute.setComponentDataFunc
        ],
        [
          usedPBRMaterialContribute.getComponentFunc,
          usedPBRMaterialContribute.cloneComponentFunc,
          usedPBRMaterialContribute.addComponentFunc
        ],
        [
          usedGeometryContribute.getComponentFunc,
          usedGeometryContribute.cloneComponentFunc,
          usedGeometryContribute.addComponentFunc
        ],
        [
          usedDirectionLightContribute.getComponentFunc,
          usedDirectionLightContribute.cloneComponentFunc,
          usedDirectionLightContribute.addComponentFunc
        ],
        [
          usedArcballCameraControllerContribute.getComponentFunc,
          usedArcballCameraControllerContribute.cloneComponentFunc,
          usedArcballCameraControllerContribute.addComponentFunc
        ],
        [
          usedBasicCameraViewContribute.getComponentFunc,
          usedBasicCameraViewContribute.cloneComponentFunc,
          usedBasicCameraViewContribute.addComponentFunc
        ],
        [
          usedPerspectiveCameraProjectionContribute.getComponentFunc,
          usedPerspectiveCameraProjectionContribute.cloneComponentFunc,
          usedPerspectiveCameraProjectionContribute.addComponentFunc
        ]
      ], count, cloneConfig, sourceGameObject);
  var match$2 = match$1[0];
  var state$1 = _setGameObjectStateAndAllComponentStatesToState(state, [
        usedGameObjectContribute,
        usedTransformContribute,
        usedPBRMaterialContribute,
        usedGeometryContribute,
        usedDirectionLightContribute,
        usedArcballCameraControllerContribute,
        usedBasicCameraViewContribute,
        usedPerspectiveCameraProjectionContribute
      ], [
        match$2[0],
        match$2[1],
        match$2[2],
        match$2[3],
        match$2[4],
        match$2[5],
        match$2[6],
        match$2[7]
      ]);
  return [
          state$1,
          match$1[1]
        ];
}

function getAllGameObjects(state) {
  var usedGameObjectContribute = StateUtils$Meta3dEngineCoreSceneview.unsafeGetUsedGameObjectContribute(state);
  return usedGameObjectContribute.getAllGameObjectsFunc(usedGameObjectContribute.state);
}

exports.unsafeGetGameObjectData = unsafeGetGameObjectData;
exports.setGameObjectContribute = setGameObjectContribute;
exports.createAndSetState = createAndSetState;
exports.createGameObject = createGameObject;
exports._setGameObjectStateAndAllComponentStatesToState = _setGameObjectStateAndAllComponentStatesToState;
exports.getNeedDisposedGameObjects = getNeedDisposedGameObjects;
exports.deferDisposeGameObject = deferDisposeGameObject;
exports.disposeGameObjects = disposeGameObjects;
exports.cloneGameObject = cloneGameObject;
exports.getAllGameObjects = getAllGameObjects;
/* No side effect */

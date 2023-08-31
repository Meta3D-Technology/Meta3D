

import * as OptionSt$Meta3dCommonlib from "./../../../../../../meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as ComponentManager$Meta3dEngineCore from "./component/ComponentManager.bs.js";
import * as Index$Meta3dComponentGeometryProtocol from "./../../../../../../meta3d-component-geometry-protocol/lib/es6_global/src/Index.bs.js";
import * as Index$Meta3dComponentTransformProtocol from "./../../../../../../meta3d-component-transform-protocol/lib/es6_global/src/Index.bs.js";
import * as Index$Meta3dComponentPbrmaterialProtocol from "./../../../../../../meta3d-component-pbrmaterial-protocol/lib/es6_global/src/Index.bs.js";
import * as Index$Meta3dComponentDirectionlightProtocol from "./../../../../../../meta3d-component-directionlight-protocol/lib/es6_global/src/Index.bs.js";
import * as Index$Meta3dComponentBasiccameraviewProtocol from "./../../../../../../meta3d-component-basiccameraview-protocol/lib/es6_global/src/Index.bs.js";
import * as Index$Meta3dComponentArcballcameracontrollerProtocol from "./../../../../../../meta3d-component-arcballcameracontroller-protocol/lib/es6_global/src/Index.bs.js";
import * as Index$Meta3dComponentPerspectivecameraprojectionProtocol from "./../../../../../../meta3d-component-perspectivecameraprojection-protocol/lib/es6_global/src/Index.bs.js";

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
            getAllGameObjectsFunc: match.getAllGameObjectsFunc
          }
        };
}

function _unsafeGetUsedGameObjectContribute(param) {
  return OptionSt$Meta3dCommonlib.unsafeGet(param.usedGameObjectContribute);
}

function _setGameObjectStateToState(state, usedGameObjectContribute, gameObjectState) {
  usedGameObjectContribute.state = gameObjectState;
  state.usedGameObjectContribute = usedGameObjectContribute;
  return state;
}

function createGameObject(state) {
  var usedGameObjectContribute = _unsafeGetUsedGameObjectContribute(state);
  var match = usedGameObjectContribute.createGameObjectFunc(usedGameObjectContribute.state);
  return [
          _setGameObjectStateToState(state, usedGameObjectContribute, match[0]),
          match[1]
        ];
}

function _getAllUsedContributes(state) {
  return [
          _unsafeGetUsedGameObjectContribute(state),
          ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentTransformProtocol.componentName),
          ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentPbrmaterialProtocol.componentName),
          ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentGeometryProtocol.componentName),
          ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentDirectionlightProtocol.componentName),
          ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentArcballcameracontrollerProtocol.componentName),
          ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentBasiccameraviewProtocol.componentName),
          ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentPerspectivecameraprojectionProtocol.componentName)
        ];
}

function _setGameObjectStateAndAllComponentStatesToState(state, param, param$1) {
  var usedTransformContribute = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(param$1[1], param[1]);
  var usedPBRMaterialContribute = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(param$1[2], param[2]);
  var usedGeometryContribute = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(param$1[3], param[3]);
  var usedDirectionLightContribute = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(param$1[4], param[4]);
  var usedArcballCameraControllerContribute = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(param$1[5], param[5]);
  var usedBasicCameraViewContribute = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(param$1[6], param[6]);
  var usedPerspectiveCameraProjectionContribute = ComponentManager$Meta3dEngineCore.setComponentStateToUsedComponentContribute(param$1[7], param[7]);
  return ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(_setGameObjectStateToState(state, param[0], param$1[0]), usedTransformContribute, Index$Meta3dComponentTransformProtocol.componentName), usedPBRMaterialContribute, Index$Meta3dComponentPbrmaterialProtocol.componentName), usedGeometryContribute, Index$Meta3dComponentGeometryProtocol.componentName), usedDirectionLightContribute, Index$Meta3dComponentDirectionlightProtocol.componentName), usedArcballCameraControllerContribute, Index$Meta3dComponentArcballcameracontrollerProtocol.componentName), usedBasicCameraViewContribute, Index$Meta3dComponentBasiccameraviewProtocol.componentName), usedPerspectiveCameraProjectionContribute, Index$Meta3dComponentPerspectivecameraprojectionProtocol.componentName);
}

function getNeedDisposedGameObjects(state) {
  var usedGameObjectContribute = _unsafeGetUsedGameObjectContribute(state);
  return usedGameObjectContribute.getNeedDisposedGameObjectsFunc(usedGameObjectContribute.state);
}

function deferDisposeGameObject(state, gameObject) {
  var match = _getAllUsedContributes(state);
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
  var match = _getAllUsedContributes(state);
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

function cloneGameObject(state, count, cloneConfig, sourceGameObject) {
  var match = _getAllUsedContributes(state);
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
  var usedGameObjectContribute = _unsafeGetUsedGameObjectContribute(state);
  return usedGameObjectContribute.getAllGameObjectsFunc(usedGameObjectContribute.state);
}

export {
  unsafeGetGameObjectData ,
  setGameObjectContribute ,
  createAndSetState ,
  _unsafeGetUsedGameObjectContribute ,
  _setGameObjectStateToState ,
  createGameObject ,
  _getAllUsedContributes ,
  _setGameObjectStateAndAllComponentStatesToState ,
  getNeedDisposedGameObjects ,
  deferDisposeGameObject ,
  disposeGameObjects ,
  cloneGameObject ,
  getAllGameObjects ,
}
/* No side effect */

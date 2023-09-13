'use strict';

var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var ComponentManager$Meta3dEngineCore = require("./component/ComponentManager.bs.js");
var Index$Meta3dComponentGeometryProtocol = require("meta3d-component-geometry-protocol/lib/js/src/Index.bs.js");
var Index$Meta3dComponentTransformProtocol = require("meta3d-component-transform-protocol/lib/js/src/Index.bs.js");
var Index$Meta3dComponentPbrmaterialProtocol = require("meta3d-component-pbrmaterial-protocol/lib/js/src/Index.bs.js");
var Index$Meta3dComponentDirectionlightProtocol = require("meta3d-component-directionlight-protocol/lib/js/src/Index.bs.js");
var Index$Meta3dComponentBasiccameraviewProtocol = require("meta3d-component-basiccameraview-protocol/lib/js/src/Index.bs.js");
var Index$Meta3dComponentArcballcameracontrollerProtocol = require("meta3d-component-arcballcameracontroller-protocol/lib/js/src/Index.bs.js");
var Index$Meta3dComponentPerspectivecameraprojectionProtocol = require("meta3d-component-perspectivecameraprojection-protocol/lib/js/src/Index.bs.js");

function unsafeGetUsedGameObjectContribute(param) {
  return OptionSt$Meta3dCommonlib.unsafeGet(param.usedGameObjectContribute);
}

function getAllUsedContributes(state) {
  return [
          unsafeGetUsedGameObjectContribute(state),
          ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentTransformProtocol.componentName),
          ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentPbrmaterialProtocol.componentName),
          ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentGeometryProtocol.componentName),
          ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentDirectionlightProtocol.componentName),
          ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentArcballcameracontrollerProtocol.componentName),
          ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentBasiccameraviewProtocol.componentName),
          ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentPerspectivecameraprojectionProtocol.componentName)
        ];
}

function setGameObjectStateToState(state, usedGameObjectContribute, gameObjectState) {
  usedGameObjectContribute.state = gameObjectState;
  state.usedGameObjectContribute = usedGameObjectContribute;
  return state;
}

function setGameObjectStateAndAllUsedComponentContributesToState(state, param, gameObjectState) {
  return ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(setGameObjectStateToState(state, param[0], gameObjectState), param[1], Index$Meta3dComponentTransformProtocol.componentName), param[2], Index$Meta3dComponentPbrmaterialProtocol.componentName), param[3], Index$Meta3dComponentGeometryProtocol.componentName), param[4], Index$Meta3dComponentDirectionlightProtocol.componentName), param[5], Index$Meta3dComponentArcballcameracontrollerProtocol.componentName), param[6], Index$Meta3dComponentBasiccameraviewProtocol.componentName), param[7], Index$Meta3dComponentPerspectivecameraprojectionProtocol.componentName);
}

exports.unsafeGetUsedGameObjectContribute = unsafeGetUsedGameObjectContribute;
exports.getAllUsedContributes = getAllUsedContributes;
exports.setGameObjectStateToState = setGameObjectStateToState;
exports.setGameObjectStateAndAllUsedComponentContributesToState = setGameObjectStateAndAllUsedComponentContributesToState;
/* No side effect */

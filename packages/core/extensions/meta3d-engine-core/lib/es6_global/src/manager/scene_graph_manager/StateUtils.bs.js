

import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as ComponentManager$Meta3dEngineCore from "./component/ComponentManager.bs.js";
import * as Index$Meta3dComponentScriptProtocol from "../../../../../../../../../node_modules/meta3d-component-script-protocol/lib/es6_global/src/Index.bs.js";
import * as Index$Meta3dComponentGeometryProtocol from "../../../../../../../../../node_modules/meta3d-component-geometry-protocol/lib/es6_global/src/Index.bs.js";
import * as Index$Meta3dComponentTransformProtocol from "../../../../../../../../../node_modules/meta3d-component-transform-protocol/lib/es6_global/src/Index.bs.js";
import * as Index$Meta3dComponentPbrmaterialProtocol from "../../../../../../../../../node_modules/meta3d-component-pbrmaterial-protocol/lib/es6_global/src/Index.bs.js";
import * as Index$Meta3dComponentDirectionlightProtocol from "../../../../../../../../../node_modules/meta3d-component-directionlight-protocol/lib/es6_global/src/Index.bs.js";
import * as Index$Meta3dComponentBasiccameraviewProtocol from "../../../../../../../../../node_modules/meta3d-component-basiccameraview-protocol/lib/es6_global/src/Index.bs.js";
import * as Index$Meta3dComponentArcballcameracontrollerProtocol from "../../../../../../../../../node_modules/meta3d-component-arcballcameracontroller-protocol/lib/es6_global/src/Index.bs.js";
import * as Index$Meta3dComponentPerspectivecameraprojectionProtocol from "../../../../../../../../../node_modules/meta3d-component-perspectivecameraprojection-protocol/lib/es6_global/src/Index.bs.js";

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
          ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentPerspectivecameraprojectionProtocol.componentName),
          ComponentManager$Meta3dEngineCore.unsafeGetUsedComponentContribute(state, Index$Meta3dComponentScriptProtocol.componentName)
        ];
}

function setGameObjectStateToState(state, usedGameObjectContribute, gameObjectState) {
  state.usedGameObjectContribute = {
    state: gameObjectState,
    createGameObjectFunc: usedGameObjectContribute.createGameObjectFunc,
    getNeedDisposedGameObjectsFunc: usedGameObjectContribute.getNeedDisposedGameObjectsFunc,
    deferDisposeGameObjectFunc: usedGameObjectContribute.deferDisposeGameObjectFunc,
    disposeGameObjectsFunc: usedGameObjectContribute.disposeGameObjectsFunc,
    cloneGameObjectFunc: usedGameObjectContribute.cloneGameObjectFunc,
    getAllGameObjectsFunc: usedGameObjectContribute.getAllGameObjectsFunc,
    getNameFunc: usedGameObjectContribute.getNameFunc,
    setNameFunc: usedGameObjectContribute.setNameFunc,
    restore: usedGameObjectContribute.restore,
    deepCopy: usedGameObjectContribute.deepCopy
  };
  return state;
}

function setGameObjectStateAndAllUsedComponentContributesToState(state, param, gameObjectState) {
  return ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(ComponentManager$Meta3dEngineCore.setUsedComponentContribute(setGameObjectStateToState(state, param[0], gameObjectState), param[1], Index$Meta3dComponentTransformProtocol.componentName), param[2], Index$Meta3dComponentPbrmaterialProtocol.componentName), param[3], Index$Meta3dComponentGeometryProtocol.componentName), param[4], Index$Meta3dComponentDirectionlightProtocol.componentName), param[5], Index$Meta3dComponentArcballcameracontrollerProtocol.componentName), param[6], Index$Meta3dComponentBasiccameraviewProtocol.componentName), param[7], Index$Meta3dComponentPerspectivecameraprojectionProtocol.componentName), param[8], Index$Meta3dComponentScriptProtocol.componentName);
}

export {
  unsafeGetUsedGameObjectContribute ,
  getAllUsedContributes ,
  setGameObjectStateToState ,
  setGameObjectStateAndAllUsedComponentContributesToState ,
}
/* No side effect */

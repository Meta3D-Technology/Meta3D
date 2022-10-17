

import * as UIManager$Meta3dUi from "./UIManager.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function getExtensionService(api, param) {
  var meta3dImguiRendererExtensionName = param[0].meta3dImguiRendererExtensionName;
  return {
          registerElement: UIManager$Meta3dUi.registerElement,
          registerSkin: UIManager$Meta3dUi.registerSkin,
          registerUIControl: UIManager$Meta3dUi.registerUIControl,
          render: (function (param, param$1, param$2) {
              return UIManager$Meta3dUi.render(api, param, param$1, param$2);
            }),
          show: UIManager$Meta3dUi.show,
          hide: UIManager$Meta3dUi.hide,
          isStateChange: UIManager$Meta3dUi.isStateChange,
          getElementState: UIManager$Meta3dUi.getElementState,
          dispatch: UIManager$Meta3dUi.dispatch,
          getIOData: UIManager$Meta3dUi.getIOData,
          getSkin: UIManager$Meta3dUi.getSkinExn,
          getUIControl: UIManager$Meta3dUi.getUIControlExn,
          drawBox: (function (meta3dState, rect, backgroundColor) {
              return UIManager$Meta3dUi.drawBox(meta3dState, [
                          api,
                          meta3dImguiRendererExtensionName
                        ], rect, backgroundColor);
            }),
          init: UIManager$Meta3dUi.init,
          clear: UIManager$Meta3dUi.clear
        };
}

function createExtensionState(param) {
  return {
          elementFuncMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          elementStateMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          elementExecOrderMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          isShowMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          isStateChangeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          skinContributeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          uiControlContributeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          reducers: [],
          ioData: {
            pointUp: false,
            pointDown: false,
            pointTap: false,
            pointPosition: [
              0,
              0
            ],
            pointMovementDelta: [
              0,
              0
            ]
          }
        };
}

function getExtensionLife(param, param$1) {
  return {
          onRegister: null,
          onStart: null,
          onInit: null,
          onUpdate: null
        };
}

export {
  getExtensionService ,
  createExtensionState ,
  getExtensionLife ,
  
}
/* No side effect */
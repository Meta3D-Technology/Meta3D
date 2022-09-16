

import * as UIManager$Meta3dUi from "./UIManager.bs.js";
import * as ManageIMGUIService$Meta3dUi from "./imgui/ManageIMGUIService.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function getExtensionService(api, param) {
  return {
          registerElement: UIManager$Meta3dUi.registerElement,
          registerSkin: UIManager$Meta3dUi.registerSkin,
          registerCustomControl: UIManager$Meta3dUi.registerCustomControl,
          render: (function (param, param$1, param$2) {
              return UIManager$Meta3dUi.render(api, param, param$1, param$2);
            }),
          show: UIManager$Meta3dUi.show,
          hide: UIManager$Meta3dUi.hide,
          isStateChange: UIManager$Meta3dUi.isStateChange,
          getElementState: UIManager$Meta3dUi.getElementState,
          combineReducers: UIManager$Meta3dUi.combineReducers,
          dispatch: UIManager$Meta3dUi.dispatch,
          getIOData: UIManager$Meta3dUi.getIODataExn,
          getSkin: UIManager$Meta3dUi.getSkinExn,
          getCustomControl: UIManager$Meta3dUi.getCustomControlExn,
          drawBox: UIManager$Meta3dUi.drawBox,
          drawText: UIManager$Meta3dUi.drawText,
          init: UIManager$Meta3dUi.init
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
          customControlContributeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          ioData: undefined,
          reducers: [],
          imguiData: ManageIMGUIService$Meta3dUi.createData(undefined)
        };
}

function getExtensionLife(param, param$1) {
  return {
          onRegister: null,
          onStart: null
        };
}

export {
  getExtensionService ,
  createExtensionState ,
  getExtensionLife ,
  
}
/* No side effect */

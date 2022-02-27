

import * as UIManager$Meta3dUi from "./UIManager.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function getExtensionService(api, param) {
  return {
          register: UIManager$Meta3dUi.register,
          render: (function (param, param$1) {
              return UIManager$Meta3dUi.render(api, param, param$1);
            }),
          show: UIManager$Meta3dUi.show,
          hide: UIManager$Meta3dUi.hide,
          getExecState: UIManager$Meta3dUi.getExecState,
          combineReducers: UIManager$Meta3dUi.combineReducers,
          dispatch: UIManager$Meta3dUi.dispatch,
          drawButton: UIManager$Meta3dUi.drawButton
        };
}

function createExtensionState(param) {
  return {
          execFuncMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          execStateMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          isShowMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          isStateChangeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          reducers: []
        };
}

export {
  getExtensionService ,
  createExtensionState ,
  
}
/* No side effect */

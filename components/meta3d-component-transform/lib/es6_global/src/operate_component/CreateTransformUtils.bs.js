

import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as IndexComponentUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/component/IndexComponentUtils.bs.js";
import * as BufferComponentUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/component/BufferComponentUtils.bs.js";
import * as ConfigUtils$Meta3dComponentTransform from "../config/ConfigUtils.bs.js";
import * as DirtyTransformUtils$Meta3dComponentTransform from "../operate_data/DirtyTransformUtils.bs.js";

function _initDataWhenCreate(childrenMap, index) {
  MutableSparseMap$Meta3dCommonlib.set(childrenMap, index, []);
  
}

function create(state) {
  var index = state.maxIndex;
  var newIndex = IndexComponentUtils$Meta3dCommonlib.generateIndex(index);
  state.maxIndex = newIndex;
  _initDataWhenCreate(state.childrenMap, index);
  var state$1 = DirtyTransformUtils$Meta3dComponentTransform.mark(state, index, true);
  return [
          state$1,
          BufferComponentUtils$Meta3dCommonlib.checkNotExceedMaxCountByIndex(ConfigUtils$Meta3dComponentTransform.getIsDebug(state$1), index, ConfigUtils$Meta3dComponentTransform.getTransformCount(state$1))
        ];
}

export {
  _initDataWhenCreate ,
  create ,
  
}
/* No side effect */

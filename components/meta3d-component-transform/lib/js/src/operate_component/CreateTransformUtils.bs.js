'use strict';

var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var IndexComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/component/IndexComponentUtils.bs.js");
var BufferComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/component/BufferComponentUtils.bs.js");
var ConfigUtils$Meta3dComponentTransform = require("../config/ConfigUtils.bs.js");
var DirtyTransformUtils$Meta3dComponentTransform = require("../operate_data/DirtyTransformUtils.bs.js");

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

exports._initDataWhenCreate = _initDataWhenCreate;
exports.create = create;
/* No side effect */

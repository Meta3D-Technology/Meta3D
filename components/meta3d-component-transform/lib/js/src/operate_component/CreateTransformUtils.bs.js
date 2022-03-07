'use strict';

var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var IndexComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/component/IndexComponentUtils.bs.js");
var BufferComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/component/BufferComponentUtils.bs.js");
var ConfigUtils$Meta3dComponentTransform = require("../config/ConfigUtils.bs.js");
var DirtyTransformUtils$Meta3dComponentTransform = require("../operate_data/DirtyTransformUtils.bs.js");

var _isNotNeedInitData = MutableSparseMap$Meta3dCommonlib.has;

function _initDataWhenCreate(childrenMap, index) {
  if (MutableSparseMap$Meta3dCommonlib.has(childrenMap, index)) {
    return ;
  } else {
    MutableSparseMap$Meta3dCommonlib.set(childrenMap, index, []);
    return ;
  }
}

function create(state) {
  var index = state.maxIndex;
  var match = IndexComponentUtils$Meta3dCommonlib.generateIndex(state.disposedTransformArray, index);
  var index$1 = match[1];
  state.maxIndex = match[2];
  state.disposedTransformArray = match[0];
  _initDataWhenCreate(state.childrenMap, index$1);
  var state$1 = DirtyTransformUtils$Meta3dComponentTransform.mark(state, index$1, true);
  return [
          state$1,
          BufferComponentUtils$Meta3dCommonlib.checkNotExceedMaxCountByIndex(ConfigUtils$Meta3dComponentTransform.getIsDebug(state$1), index$1, ConfigUtils$Meta3dComponentTransform.getTransformCount(state$1))
        ];
}

exports._isNotNeedInitData = _isNotNeedInitData;
exports._initDataWhenCreate = _initDataWhenCreate;
exports.create = create;
/* No side effect */

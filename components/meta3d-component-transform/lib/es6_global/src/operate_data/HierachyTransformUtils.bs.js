

import * as Log$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as ArraySt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as Contract$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/contract/Contract.bs.js";
import * as OptionSt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as ConfigUtils$Meta3dComponentTransform from "../config/ConfigUtils.bs.js";
import * as DirtyTransformUtils$Meta3dComponentTransform from "./DirtyTransformUtils.bs.js";

var getParent = MutableSparseMap$Meta3dCommonlib.get;

var getNullableParent = MutableSparseMap$Meta3dCommonlib.getNullable;

var getNullableChildren = MutableSparseMap$Meta3dCommonlib.getNullable;

var _unsafeGetChildren = MutableSparseMap$Meta3dCommonlib.unsafeGet;

function _addChild(childrenMap, parent, child) {
  return ArraySt$Meta3dCommonlib.push(MutableSparseMap$Meta3dCommonlib.unsafeGet(childrenMap, parent), child);
}

function _addToParent(state, parent, child) {
  Contract$Meta3dCommonlib.requireCheck((function (param) {
          var childrenMap = state.childrenMap;
          var parentMap = state.parentMap;
          Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("child not has parent", "has"), (function (param) {
                  return Contract$Meta3dCommonlib.assertNotExist(MutableSparseMap$Meta3dCommonlib.get(parentMap, child));
                }));
          return Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("parent not already has the child", "has"), (function (param) {
                        var children = OptionSt$Meta3dCommonlib.fromNullable(MutableSparseMap$Meta3dCommonlib.getNullable(childrenMap, parent));
                        if (children !== undefined) {
                          return Contract$Meta3dCommonlib.assertFalse(ArraySt$Meta3dCommonlib.includes(children, child));
                        } else {
                          return Contract$Meta3dCommonlib.assertPass(undefined);
                        }
                      }));
        }), ConfigUtils$Meta3dComponentTransform.getIsDebug(state));
  MutableSparseMap$Meta3dCommonlib.set(state.parentMap, child, parent);
  _addChild(state.childrenMap, parent, child);
  return state;
}

var _removeParent = MutableSparseMap$Meta3dCommonlib.remove;

function _removeChild(children, isDebug, child) {
  return ArraySt$Meta3dCommonlib.deleteBySwap(children, isDebug, children.indexOf(child), children.length - 1 | 0);
}

function _removeFromChildMap(childrenMap, isDebug, parent, child) {
  return _removeChild(MutableSparseMap$Meta3dCommonlib.unsafeGet(childrenMap, parent), isDebug, child);
}

function _removeFromParent(state, currentParent, child) {
  MutableSparseMap$Meta3dCommonlib.remove(state.parentMap, child);
  _removeFromChildMap(state.childrenMap, ConfigUtils$Meta3dComponentTransform.getIsDebug(state), currentParent, child);
  return state;
}

function removeParent(state, transform) {
  var currentParent = MutableSparseMap$Meta3dCommonlib.get(state.parentMap, transform);
  if (currentParent !== undefined) {
    return _removeFromParent(state, currentParent, transform);
  } else {
    return state;
  }
}

function _setNewParent(state, parent, child) {
  var currentParent = MutableSparseMap$Meta3dCommonlib.get(state.parentMap, child);
  if (currentParent !== undefined) {
    if (currentParent !== parent) {
      return _addToParent(_removeFromParent(state, currentParent, child), parent, child);
    } else {
      return state;
    }
  } else {
    return _addToParent(state, parent, child);
  }
}

function markHierachyDirty(state, transform) {
  DirtyTransformUtils$Meta3dComponentTransform.mark(state, transform, true);
  return ArraySt$Meta3dCommonlib.reduceOneParam(MutableSparseMap$Meta3dCommonlib.unsafeGet(state.childrenMap, transform), markHierachyDirty, state);
}

function setParent(state, parent, child) {
  return markHierachyDirty(_setNewParent(state, parent, child), child);
}

export {
  getParent ,
  getNullableParent ,
  getNullableChildren ,
  _unsafeGetChildren ,
  _addChild ,
  _addToParent ,
  _removeParent ,
  _removeChild ,
  _removeFromChildMap ,
  _removeFromParent ,
  removeParent ,
  _setNewParent ,
  markHierachyDirty ,
  setParent ,
  
}
/* No side effect */

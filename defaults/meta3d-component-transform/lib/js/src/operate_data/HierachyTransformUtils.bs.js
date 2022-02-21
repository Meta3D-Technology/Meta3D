'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var Contract$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/contract/Contract.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var ConfigUtils$Meta3dComponentTransform = require("../config/ConfigUtils.bs.js");
var DirtyTransformUtils$Meta3dComponentTransform = require("./DirtyTransformUtils.bs.js");

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

exports.getParent = getParent;
exports.getNullableParent = getNullableParent;
exports.getNullableChildren = getNullableChildren;
exports._unsafeGetChildren = _unsafeGetChildren;
exports._addChild = _addChild;
exports._addToParent = _addToParent;
exports._removeParent = _removeParent;
exports._removeChild = _removeChild;
exports._removeFromChildMap = _removeFromChildMap;
exports._removeFromParent = _removeFromParent;
exports.removeParent = removeParent;
exports._setNewParent = _setNewParent;
exports.markHierachyDirty = markHierachyDirty;
exports.setParent = setParent;
/* No side effect */

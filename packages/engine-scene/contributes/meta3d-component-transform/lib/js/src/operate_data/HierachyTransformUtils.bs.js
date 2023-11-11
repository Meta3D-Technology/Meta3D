'use strict';

var Js_array = require("rescript/lib/js/js_array.js");
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

var unsafeGetChildren = MutableSparseMap$Meta3dCommonlib.unsafeGet;

function _addChild(childrenMap, parent, child) {
  return ArraySt$Meta3dCommonlib.push(MutableSparseMap$Meta3dCommonlib.unsafeGet(childrenMap, parent), child);
}

function _addToParent(state, parent, child) {
  Contract$Meta3dCommonlib.requireCheck((function (param) {
          var parentMap = state.parentMap;
          var childrenMap = state.childrenMap;
          Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("child not has parent", "has"), (function (param) {
                  return Contract$Meta3dCommonlib.assertNotExist(MutableSparseMap$Meta3dCommonlib.get(parentMap, child));
                }));
          Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("parent not already has the child", "has"), (function (param) {
                  var children = OptionSt$Meta3dCommonlib.fromNullable(MutableSparseMap$Meta3dCommonlib.getNullable(childrenMap, parent));
                  if (children !== undefined) {
                    return Contract$Meta3dCommonlib.assertFalse(ArraySt$Meta3dCommonlib.includes(children, child));
                  } else {
                    return Contract$Meta3dCommonlib.assertPass(undefined);
                  }
                }));
        }), ConfigUtils$Meta3dComponentTransform.getIsDebug(state));
  var parentMap = state.parentMap;
  var childrenMap = state.childrenMap;
  MutableSparseMap$Meta3dCommonlib.set(parentMap, child, parent);
  _addChild(childrenMap, parent, child);
  return state;
}

var removeParentMap = MutableSparseMap$Meta3dCommonlib.remove;

function _removeChild(children, isDebug, child) {
  ArraySt$Meta3dCommonlib.deleteBySwap(children, isDebug, Js_array.indexOf(child, children), children.length - 1 | 0);
}

function removeFromChildMap(childrenMap, isDebug, parent, child) {
  _removeChild(MutableSparseMap$Meta3dCommonlib.unsafeGet(childrenMap, parent), isDebug, child);
}

function _removeFromParent(state, currentParent, child) {
  var parentMap = state.parentMap;
  var childrenMap = state.childrenMap;
  MutableSparseMap$Meta3dCommonlib.remove(parentMap, child);
  removeFromChildMap(childrenMap, ConfigUtils$Meta3dComponentTransform.getIsDebug(state), currentParent, child);
  return state;
}

function markHierachyDirty(state, transform) {
  DirtyTransformUtils$Meta3dComponentTransform.mark(state, transform, true);
  var childrenMap = state.childrenMap;
  return ArraySt$Meta3dCommonlib.reduceOneParam(MutableSparseMap$Meta3dCommonlib.unsafeGet(childrenMap, transform), markHierachyDirty, state);
}

function removeParent(state, transform) {
  var parentMap = state.parentMap;
  var currentParent = MutableSparseMap$Meta3dCommonlib.get(parentMap, transform);
  if (currentParent !== undefined) {
    return markHierachyDirty(_removeFromParent(state, currentParent, transform), transform);
  } else {
    return state;
  }
}

function _setNewParent(state, parent, child) {
  var parentMap = state.parentMap;
  var currentParent = MutableSparseMap$Meta3dCommonlib.get(parentMap, child);
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

function setParent(state, parent, child) {
  return markHierachyDirty(_setNewParent(state, parent, child), child);
}

exports.getParent = getParent;
exports.getNullableParent = getNullableParent;
exports.getNullableChildren = getNullableChildren;
exports.unsafeGetChildren = unsafeGetChildren;
exports._addChild = _addChild;
exports._addToParent = _addToParent;
exports.removeParentMap = removeParentMap;
exports._removeChild = _removeChild;
exports.removeFromChildMap = removeFromChildMap;
exports._removeFromParent = _removeFromParent;
exports.markHierachyDirty = markHierachyDirty;
exports.removeParent = removeParent;
exports._setNewParent = _setNewParent;
exports.setParent = setParent;
/* No side effect */



import * as Curry from "../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_obj from "../../../../../../../../../../../../node_modules/rescript/lib/es6/caml_obj.js";
import * as Caml_option from "../../../../../../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";

function findSelectedUIControlData(result, param, allSelectedUIControlData, id) {
  var getChildren = param[1];
  var getId = param[0];
  if (result !== undefined) {
    return result;
  } else {
    return ListSt$Meta3dCommonlib.reduce(allSelectedUIControlData, result, (function (result, data) {
                  if (result !== undefined) {
                    return result;
                  } else if (Curry._1(getId, data) === id) {
                    return Caml_option.some(data);
                  } else {
                    return findSelectedUIControlData(result, [
                                getId,
                                getChildren
                              ], Curry._1(getChildren, data), id);
                  }
                }));
  }
}

function mapSelectedUIControlData(handle, param, allSelectedUIControlData, id) {
  var setChildren = param[2];
  var getChildren = param[1];
  var getId = param[0];
  return ListSt$Meta3dCommonlib.map(allSelectedUIControlData, (function (data) {
                if (Curry._1(getId, data) === id) {
                  return Curry._1(handle, data);
                } else {
                  return Curry._2(setChildren, data, mapSelectedUIControlData(handle, [
                                  getId,
                                  getChildren,
                                  setChildren
                                ], Curry._1(getChildren, data), id));
                }
              }));
}

function mapAllSelectedUIControlData(handle, param, allSelectedUIControlData) {
  var setChildren = param[1];
  var getChildren = param[0];
  return ListSt$Meta3dCommonlib.map(allSelectedUIControlData, (function (data) {
                return Curry._2(setChildren, Curry._1(handle, data), mapAllSelectedUIControlData(handle, [
                                getChildren,
                                setChildren
                              ], Curry._1(getChildren, data)));
              }));
}

function reduceAllSelectedUIControlData(initialValue, handle, getChildren, allSelectedUIControlData) {
  return ListSt$Meta3dCommonlib.reduce(allSelectedUIControlData, initialValue, (function (initialValue, data) {
                return reduceAllSelectedUIControlData(Curry._2(handle, initialValue, data), handle, getChildren, Curry._1(getChildren, data));
              }));
}

function addChildUIControlData(param, allSelectedUIControlData, childUIControlData, parentId) {
  var setChildren = param[2];
  var getChildren = param[1];
  var getId = param[0];
  if (parentId === undefined) {
    return ListSt$Meta3dCommonlib.push(allSelectedUIControlData, childUIControlData);
  }
  var parentId$1 = Caml_option.valFromOption(parentId);
  return ListSt$Meta3dCommonlib.map(allSelectedUIControlData, (function (data) {
                if (Curry._1(getId, data) === parentId$1) {
                  return Curry._2(setChildren, data, ListSt$Meta3dCommonlib.push(Curry._1(getChildren, data), childUIControlData));
                } else {
                  return Curry._2(setChildren, data, addChildUIControlData([
                                  getId,
                                  getChildren,
                                  setChildren
                                ], Curry._1(getChildren, data), childUIControlData, Caml_option.some(parentId$1)));
                }
              }));
}

function removeUIControlData(param, allSelectedUIControlData, id) {
  var setChildren = param[2];
  var getChildren = param[1];
  var getId = param[0];
  return ListSt$Meta3dCommonlib.map(ListSt$Meta3dCommonlib.filter(allSelectedUIControlData, (function (data) {
                    return Caml_obj.notequal(Curry._1(getId, data), id);
                  })), (function (data) {
                return Curry._2(setChildren, data, removeUIControlData([
                                getId,
                                getChildren,
                                setChildren
                              ], Curry._1(getChildren, data), id));
              }));
}

export {
  findSelectedUIControlData ,
  mapSelectedUIControlData ,
  mapAllSelectedUIControlData ,
  reduceAllSelectedUIControlData ,
  addChildUIControlData ,
  removeUIControlData ,
}
/* No side effect */

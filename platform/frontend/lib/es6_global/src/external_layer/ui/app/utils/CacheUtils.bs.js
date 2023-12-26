

import * as Caml_obj from "../../../../../../../../../node_modules/rescript/lib/es6/caml_obj.js";
import * as Js_promise from "../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Caml_option from "../../../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Localforage from "localforage";
import * as PromiseSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/PromiseSt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";

function _buildVersionKey(param) {
  return "meta3d_version_cache";
}

function _buildAllUIControlsJsonKey(param) {
  return "meta3d_allUIControls_json_cache";
}

function _buildAllUIControlsFileKey(param) {
  return "meta3d_allUIControls_file_cache";
}

function _buildPackagesJsonKey(param) {
  return "meta3d_packages_json_cache";
}

function _buildPackagesFileKey(param) {
  return "meta3d_packages_file_cache";
}

function _cacheData(jsonKey, fileKey, version, jsons, files) {
  var __x = version !== undefined ? PromiseSt$Meta3dCommonlib.map(Localforage.setItem("meta3d_version_cache", Caml_option.valFromOption(version)), (function (param) {
            
          })) : Promise.resolve(undefined);
  var __x$1 = Js_promise.then_((function (param) {
          return Localforage.setItem(jsonKey, jsons);
        }), __x);
  return Js_promise.then_((function (param) {
                return Localforage.setItem(fileKey, files);
              }), __x$1);
}

function _getData(jsonKey, fileKey, newestVersion) {
  var __x = Localforage.getItem("meta3d_version_cache");
  return Js_promise.then_((function (version) {
                var tmp;
                if (newestVersion !== undefined) {
                  var newestVersion$1 = Caml_option.valFromOption(newestVersion);
                  tmp = NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(version, (function (version) {
                              return Caml_obj.notequal(version, newestVersion$1);
                            })), true);
                } else {
                  tmp = true;
                }
                if (tmp) {
                  return Promise.resolve(NullableSt$Meta3dCommonlib.getEmpty(undefined));
                }
                var __x = Localforage.getItem(jsonKey);
                return Js_promise.then_((function (jsons) {
                              if (NullableSt$Meta3dCommonlib.isNullable(jsons)) {
                                return Promise.resolve(NullableSt$Meta3dCommonlib.getEmpty(undefined));
                              }
                              var __x = Localforage.getItem(fileKey);
                              return Js_promise.then_((function (files) {
                                            if (NullableSt$Meta3dCommonlib.isNullable(files)) {
                                              return Promise.resolve(NullableSt$Meta3dCommonlib.getEmpty(undefined));
                                            } else {
                                              return Promise.resolve(NullableSt$Meta3dCommonlib.$$return([
                                                              NullableSt$Meta3dCommonlib.getExn(jsons),
                                                              NullableSt$Meta3dCommonlib.getExn(files)
                                                            ]));
                                            }
                                          }), __x);
                            }), __x);
              }), __x);
}

function cacheAllUIControls(version, jsons, files) {
  return _cacheData("meta3d_allUIControls_json_cache", "meta3d_allUIControls_file_cache", version, jsons, files);
}

function getAllUIControls(version) {
  return _getData("meta3d_allUIControls_json_cache", "meta3d_allUIControls_file_cache", version);
}

function cachePackages(version, jsons, files) {
  return _cacheData("meta3d_packages_json_cache", "meta3d_packages_file_cache", version, jsons, files);
}

function getPackages(version) {
  return _getData("meta3d_packages_json_cache", "meta3d_packages_file_cache", version);
}

export {
  _buildVersionKey ,
  _buildAllUIControlsJsonKey ,
  _buildAllUIControlsFileKey ,
  _buildPackagesJsonKey ,
  _buildPackagesFileKey ,
  _cacheData ,
  _getData ,
  cacheAllUIControls ,
  getAllUIControls ,
  cachePackages ,
  getPackages ,
}
/* localforage Not a pure module */



import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Semver from "semver";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function isNotInnerProtocol(protocolName) {
  switch (protocolName) {
    case "meta3d-element-assemble-visual-protocol" :
    case "meta3d-element-assemble-visual-run-protocol" :
        return false;
    default:
      return true;
  }
}

function getPageSize(param) {
  return 30;
}

function getLimitCount(param) {
  return 1000;
}

function getCurrentPage(allPublishItems, page, pageSize) {
  return ArraySt$Meta3dCommonlib.slice(allPublishItems, Math.imul(page - 1 | 0, pageSize), Math.imul(page, pageSize));
}

function isSelect(getKey, key, selectedItems) {
  return ListSt$Meta3dCommonlib.includesByFunc(selectedItems, (function (selectedItem) {
                return key === Curry._1(getKey, selectedItem);
              }));
}

function groupAllPublishProtocols(allPublishProtocols) {
  return ArraySt$Meta3dCommonlib.map(ImmutableHashMap$Meta3dCommonlib.entries(ArraySt$Meta3dCommonlib.reduceOneParam(allPublishProtocols, (function (map, protocol) {
                        var name = protocol.name;
                        return ImmutableHashMap$Meta3dCommonlib.set(map, name, ArraySt$Meta3dCommonlib.push(OptionSt$Meta3dCommonlib.getWithDefault(ImmutableHashMap$Meta3dCommonlib.get(map, name), []), protocol));
                      }), ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined))), (function (param) {
                return ArraySt$Meta3dCommonlib.sort(param[1], (function (a, b) {
                              if (Semver.gt(a.version, b.version)) {
                                return -1;
                              } else {
                                return 1;
                              }
                            }));
              }));
}

function groupAllPublishItems(param, allPublishItems) {
  var getVersion = param[1];
  var getName = param[0];
  return ArraySt$Meta3dCommonlib.map(ImmutableHashMap$Meta3dCommonlib.entries(ArraySt$Meta3dCommonlib.reduceOneParam(allPublishItems, (function (map, item) {
                        return ImmutableHashMap$Meta3dCommonlib.set(map, Curry._1(getName, item), ArraySt$Meta3dCommonlib.push(OptionSt$Meta3dCommonlib.getWithDefault(ImmutableHashMap$Meta3dCommonlib.get(map, Curry._1(getName, item)), []), item));
                      }), ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined))), (function (param) {
                return ArraySt$Meta3dCommonlib.sort(param[1], (function (a, b) {
                              if (Semver.gt(Curry._1(getVersion, a), Curry._1(getVersion, b))) {
                                return -1;
                              } else {
                                return 1;
                              }
                            }));
              }));
}

function getAllProtocolsCount(allPublishProtocols) {
  return ArraySt$Meta3dCommonlib.length(groupAllPublishProtocols(allPublishProtocols));
}

export {
  isNotInnerProtocol ,
  getPageSize ,
  getLimitCount ,
  getCurrentPage ,
  isSelect ,
  groupAllPublishProtocols ,
  groupAllPublishItems ,
  getAllProtocolsCount ,
}
/* semver Not a pure module */

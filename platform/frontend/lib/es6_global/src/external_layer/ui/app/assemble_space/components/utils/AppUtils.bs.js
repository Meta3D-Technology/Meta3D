

import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

function generateApp(service, param, selectedContributes, selectedElements, configData) {
  var selectPackages = param[0];
  return service.meta3d.generateApp(service.meta3d.convertAllFileDataForApp(ArraySt$Meta3dCommonlib.map(selectedContributes, (function (param) {
                        return param.data;
                      }))), ArraySt$Meta3dCommonlib.map(selectPackages, (function (param) {
                    return param.binaryFile;
                  })), param[1], ListSt$Meta3dCommonlib.toArray(selectedElements), configData, OptionSt$Meta3dCommonlib.getExn(OptionSt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.find(selectPackages, (function (param) {
                            return param.isStart;
                          })), (function (param) {
                        return param.protocol.name;
                      }))));
}

function splitPackages(selectedPackages, storedPackageIdsInApp) {
  return [
          ListSt$Meta3dCommonlib.toArray(ListSt$Meta3dCommonlib.filter(selectedPackages, (function (param) {
                      return !ListSt$Meta3dCommonlib.includes(storedPackageIdsInApp, param.id);
                    }))),
          ListSt$Meta3dCommonlib.toArray(ListSt$Meta3dCommonlib.map(ListSt$Meta3dCommonlib.filter(selectedPackages, (function (param) {
                          return ListSt$Meta3dCommonlib.includes(storedPackageIdsInApp, param.id);
                        })), (function (param) {
                      return [
                              [
                                param.protocol,
                                param.entryExtensionName,
                                param.version,
                                param.name,
                                OptionSt$Meta3dCommonlib.getWithDefault(param.protocolConfigStr, "")
                              ],
                              param.binaryFile
                            ];
                    })))
        ];
}

export {
  generateApp ,
  splitPackages ,
}
/* No side effect */

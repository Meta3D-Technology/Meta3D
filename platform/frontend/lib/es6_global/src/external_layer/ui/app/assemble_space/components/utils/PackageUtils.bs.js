

import * as Js_array from "../../../../../../../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

function getEntryExtensionName(selectedExtensions) {
  return ArraySt$Meta3dCommonlib.getExn(ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.filter(selectedExtensions, (function (param) {
                        return param.isEntry;
                      })), (function (param) {
                    return param.data.extensionPackageData.name;
                  })), 0);
}

function getEntryExtensionProtocolData(selectedExtensions) {
  return ArraySt$Meta3dCommonlib.getExn(ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.filter(selectedExtensions, (function (param) {
                        return param.isEntry;
                      })), (function (param) {
                    return [
                            param.protocolName,
                            param.protocolVersion,
                            param.data.extensionPackageData.protocol.version,
                            param.protocolIconBase64,
                            param.protocolDisplayName,
                            param.protocolRepoLink,
                            param.protocolDescription,
                            param.protocolConfigStr
                          ];
                  })), 0);
}

function generatePackage(service, selectPackages, selectedExtensions, selectedContributes, packageData) {
  return service.meta3d.generatePackage(service.meta3d.convertAllFileDataForPackage(ArraySt$Meta3dCommonlib.map(selectedExtensions, (function (param) {
                        return param.data;
                      })), ArraySt$Meta3dCommonlib.map(selectedContributes, (function (param) {
                        return param.data;
                      })), [getEntryExtensionName(selectedExtensions)]), ArraySt$Meta3dCommonlib.map(selectPackages, (function (param) {
                    return param.binaryFile;
                  })), packageData);
}

function getPackageAllExtensionAndContributeFileData(service, packageBinaryFile) {
  var _func = function (allExtensionFileData, allContributeFileData, packageBinaryFile) {
    var match = service.meta3d.getAllDataOfPackage(packageBinaryFile);
    return ArraySt$Meta3dCommonlib.reduceOneParam(match[2], (function (param, subPackageBinaryFile) {
                  return _func(param[0], param[1], subPackageBinaryFile);
                }), [
                Js_array.concat(match[0], allExtensionFileData),
                Js_array.concat(match[1], allContributeFileData)
              ]);
  };
  return _func([], [], packageBinaryFile);
}

function buildPackageData(param) {
  return [
          param.protocol,
          param.entryExtensionName,
          param.version,
          param.name,
          OptionSt$Meta3dCommonlib.getWithDefault(param.protocolConfigStr, "")
        ];
}

export {
  getEntryExtensionName ,
  getEntryExtensionProtocolData ,
  generatePackage ,
  getPackageAllExtensionAndContributeFileData ,
  buildPackageData ,
}
/* No side effect */



import * as IdUtils$Frontend from "../../../../utils/utils/IdUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";

function _createState(param) {
  return {
          selectedPackages: /* [] */0,
          selectedExtensions: /* [] */0,
          selectedContributes: /* [] */0,
          inspectorCurrentExtensionId: undefined,
          inspectorCurrentContributeId: undefined
        };
}

function _resetInspector(state) {
  return {
          selectedPackages: state.selectedPackages,
          selectedExtensions: state.selectedExtensions,
          selectedContributes: state.selectedContributes,
          inspectorCurrentExtensionId: undefined,
          inspectorCurrentContributeId: undefined
        };
}

function _unmarkEntryAllSelectedExtensions(selectedExtensions) {
  return ListSt$Meta3dCommonlib.map(selectedExtensions, (function (extension) {
                return {
                        id: extension.id,
                        protocolName: extension.protocolName,
                        protocolVersion: extension.protocolVersion,
                        protocolIconBase64: extension.protocolIconBase64,
                        protocolConfigStr: extension.protocolConfigStr,
                        protocolDisplayName: extension.protocolDisplayName,
                        protocolRepoLink: extension.protocolRepoLink,
                        protocolDescription: extension.protocolDescription,
                        isEntry: false,
                        version: extension.version,
                        data: extension.data
                      };
              }));
}

function reducer(state, action) {
  if (typeof action === "number") {
    if (action === /* ResetWhenEnter */0) {
      return {
              selectedPackages: /* [] */0,
              selectedExtensions: /* [] */0,
              selectedContributes: /* [] */0,
              inspectorCurrentExtensionId: undefined,
              inspectorCurrentContributeId: undefined
            };
    } else {
      return _resetInspector(state);
    }
  }
  switch (action.TAG | 0) {
    case /* SelectPackage */0 :
        var $$package = action._0;
        return {
                selectedPackages: ListSt$Meta3dCommonlib.push(state.selectedPackages, {
                      id: IdUtils$Frontend.generateId(function (prim) {
                            return Math.random();
                          }),
                      protocol: $$package.protocol,
                      entryExtensionName: $$package.entryExtensionName,
                      version: $$package.version,
                      name: $$package.name,
                      binaryFile: $$package.binaryFile,
                      isStart: $$package.isStart,
                      protocolConfigStr: $$package.protocolConfigStr
                    }),
                selectedExtensions: state.selectedExtensions,
                selectedContributes: state.selectedContributes,
                inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                inspectorCurrentContributeId: state.inspectorCurrentContributeId
              };
    case /* SelectExtension */1 :
        var extension = action._5;
        return {
                selectedPackages: state.selectedPackages,
                selectedExtensions: ListSt$Meta3dCommonlib.push(state.selectedExtensions, {
                      id: IdUtils$Frontend.generateId(function (prim) {
                            return Math.random();
                          }),
                      protocolName: extension.protocolName,
                      protocolVersion: extension.protocolVersion,
                      protocolIconBase64: action._0,
                      protocolConfigStr: action._4,
                      protocolDisplayName: action._1,
                      protocolRepoLink: action._2,
                      protocolDescription: action._3,
                      isEntry: false,
                      version: extension.version,
                      data: extension.data
                    }),
                selectedContributes: state.selectedContributes,
                inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                inspectorCurrentContributeId: state.inspectorCurrentContributeId
              };
    case /* SetInspectorCurrentExtensionId */2 :
        return {
                selectedPackages: state.selectedPackages,
                selectedExtensions: state.selectedExtensions,
                selectedContributes: state.selectedContributes,
                inspectorCurrentExtensionId: action._0,
                inspectorCurrentContributeId: undefined
              };
    case /* MarkEntryExtension */3 :
        var id = action._0;
        return {
                selectedPackages: state.selectedPackages,
                selectedExtensions: ListSt$Meta3dCommonlib.map(_unmarkEntryAllSelectedExtensions(state.selectedExtensions), (function (extension) {
                        if (extension.id === id) {
                          return {
                                  id: extension.id,
                                  protocolName: extension.protocolName,
                                  protocolVersion: extension.protocolVersion,
                                  protocolIconBase64: extension.protocolIconBase64,
                                  protocolConfigStr: extension.protocolConfigStr,
                                  protocolDisplayName: extension.protocolDisplayName,
                                  protocolRepoLink: extension.protocolRepoLink,
                                  protocolDescription: extension.protocolDescription,
                                  isEntry: true,
                                  version: extension.version,
                                  data: extension.data
                                };
                        } else {
                          return extension;
                        }
                      })),
                selectedContributes: state.selectedContributes,
                inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                inspectorCurrentContributeId: state.inspectorCurrentContributeId
              };
    case /* UnMarkEntryExtension */4 :
        return {
                selectedPackages: state.selectedPackages,
                selectedExtensions: _unmarkEntryAllSelectedExtensions(state.selectedExtensions),
                selectedContributes: state.selectedContributes,
                inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                inspectorCurrentContributeId: state.inspectorCurrentContributeId
              };
    case /* SelectContribute */5 :
        var contribute = action._2;
        return {
                selectedPackages: state.selectedPackages,
                selectedExtensions: state.selectedExtensions,
                selectedContributes: ListSt$Meta3dCommonlib.push(state.selectedContributes, {
                      id: IdUtils$Frontend.generateId(function (prim) {
                            return Math.random();
                          }),
                      protocolIconBase64: action._0,
                      protocolConfigStr: action._1,
                      version: contribute.version,
                      data: contribute.data
                    }),
                inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                inspectorCurrentContributeId: state.inspectorCurrentContributeId
              };
    case /* SetInspectorCurrentContributeId */6 :
        return {
                selectedPackages: state.selectedPackages,
                selectedExtensions: state.selectedExtensions,
                selectedContributes: state.selectedContributes,
                inspectorCurrentExtensionId: undefined,
                inspectorCurrentContributeId: action._0
              };
    case /* UpdateSelectedPackagesAndExtensionsAndContributes */7 :
        return {
                selectedPackages: action._0,
                selectedExtensions: action._1,
                selectedContributes: action._2,
                inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                inspectorCurrentContributeId: state.inspectorCurrentContributeId
              };
    
  }
}

var initialState = {
  selectedPackages: /* [] */0,
  selectedExtensions: /* [] */0,
  selectedContributes: /* [] */0,
  inspectorCurrentExtensionId: undefined,
  inspectorCurrentContributeId: undefined
};

export {
  _createState ,
  _resetInspector ,
  _unmarkEntryAllSelectedExtensions ,
  reducer ,
  initialState ,
}
/* No side effect */

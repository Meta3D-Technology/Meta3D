

import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

function convertSelectedContributesFromAssembleToApAssemble(selectedContributes) {
  return ListSt$Meta3dCommonlib.map(selectedContributes, (function (param) {
                var match = param[0];
                return {
                        id: match.id,
                        protocolIconBase64: match.protocolIconBase64,
                        protocolConfigStr: OptionSt$Meta3dCommonlib.map(param[1], (function (param) {
                                return param.configStr;
                              })),
                        version: match.version,
                        data: match.data
                      };
              }));
}

export {
  convertSelectedContributesFromAssembleToApAssemble ,
}
/* No side effect */

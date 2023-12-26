

import * as ElementUtils$Frontend from "./utils/ElementUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";

function removeElementContribute(selectedContributes) {
  return ListSt$Meta3dCommonlib.filter(selectedContributes, (function (param) {
                return param[0].protocolName !== ElementUtils$Frontend.getElementContributeProtocolName(undefined);
              }));
}

export {
  removeElementContribute ,
}
/* No side effect */

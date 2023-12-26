

import * as ElementVisualUtils$Frontend from "../element_assemble/utils/ElementVisualUtils.bs.js";
import * as ContributeTypeUtils$Frontend from "../../../utils/utils/ContributeTypeUtils.bs.js";

function isLocalInput(protocolName) {
  if (ContributeTypeUtils$Frontend.isInput(protocolName)) {
    return !ElementVisualUtils$Frontend.isCustomInput(protocolName);
  } else {
    return false;
  }
}

function isLocalAction(protocolName) {
  if (ContributeTypeUtils$Frontend.isAction(protocolName)) {
    return !ElementVisualUtils$Frontend.isCustomAction(protocolName);
  } else {
    return false;
  }
}

export {
  isLocalInput ,
  isLocalAction ,
}
/* No side effect */

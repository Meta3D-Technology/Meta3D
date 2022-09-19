

import * as Container$Meta3dEvent from "./container/Container.bs.js";

function getState(param) {
  return Container$Meta3dEvent.poContainer.state;
}

function setState(state) {
  Container$Meta3dEvent.poContainer.state = state;
  
}

export {
  getState ,
  setState ,
  
}
/* Container-Meta3dEvent Not a pure module */

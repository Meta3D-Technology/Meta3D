

import * as POContainer$Frontend from "../domain_layer/logic_data/container/POContainer.bs.js";

function getState(param) {
  return POContainer$Frontend.poContainer.po;
}

function setState(state) {
  POContainer$Frontend.poContainer.po = state;
}

export {
  getState ,
  setState ,
}
/* No side effect */

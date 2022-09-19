

import * as BodyDoService$Meta3dEvent from "../service/dom/BodyDoService.bs.js";
import * as ContainerManager$Meta3dEvent from "../data/ContainerManager.bs.js";

function getBodyExn(param) {
  return BodyDoService$Meta3dEvent.getBodyExn(ContainerManager$Meta3dEvent.getState(undefined));
}

function setBody(body) {
  return ContainerManager$Meta3dEvent.setState(BodyDoService$Meta3dEvent.setBody(ContainerManager$Meta3dEvent.getState(undefined), body));
}

export {
  getBodyExn ,
  setBody ,
  
}
/* ContainerManager-Meta3dEvent Not a pure module */

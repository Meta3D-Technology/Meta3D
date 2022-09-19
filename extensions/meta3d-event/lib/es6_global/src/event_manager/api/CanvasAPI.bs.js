

import * as CanvasDoService$Meta3dEvent from "../service/dom/CanvasDoService.bs.js";
import * as ContainerManager$Meta3dEvent from "../data/ContainerManager.bs.js";

function setCanvas(canvas) {
  return ContainerManager$Meta3dEvent.setState(CanvasDoService$Meta3dEvent.setCanvas(ContainerManager$Meta3dEvent.getState(undefined), canvas));
}

export {
  setCanvas ,
  
}
/* ContainerManager-Meta3dEvent Not a pure module */

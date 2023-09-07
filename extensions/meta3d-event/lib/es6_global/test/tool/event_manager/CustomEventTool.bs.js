

import * as Caml_option from "./../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Js_null_undefined from "./../../../../../../../node_modules/rescript/lib/es6/js_null_undefined.js";
import * as ManageEventAPI$Meta3dEvent from "../api/ManageEventAPI.bs.js";
import * as NameEventDoService$Meta3dEvent from "../../../src/event_manager/service/event/NameEventDoService.bs.js";

function createCustomEvent(eventName, userDataOpt, param) {
  var userData = userDataOpt !== undefined ? Caml_option.valFromOption(userDataOpt) : undefined;
  return ManageEventAPI$Meta3dEvent.createCustomEvent(eventName, Js_null_undefined.fromOption(userData));
}

var getPointDownEventName = NameEventDoService$Meta3dEvent.getPointDownEventName;

var getPointUpEventName = NameEventDoService$Meta3dEvent.getPointUpEventName;

var getPointTapEventName = NameEventDoService$Meta3dEvent.getPointTapEventName;

var getPointMoveEventName = NameEventDoService$Meta3dEvent.getPointMoveEventName;

var getPointScaleEventName = NameEventDoService$Meta3dEvent.getPointScaleEventName;

var getPointDragStartEventName = NameEventDoService$Meta3dEvent.getPointDragStartEventName;

var getPointDragOverEventName = NameEventDoService$Meta3dEvent.getPointDragOverEventName;

var getPointDragDropEventName = NameEventDoService$Meta3dEvent.getPointDragDropEventName;

export {
  getPointDownEventName ,
  getPointUpEventName ,
  getPointTapEventName ,
  getPointMoveEventName ,
  getPointScaleEventName ,
  getPointDragStartEventName ,
  getPointDragOverEventName ,
  getPointDragDropEventName ,
  createCustomEvent ,
}
/* No side effect */

'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");
var Js_null_undefined = require("rescript/lib/js/js_null_undefined.js");
var ManageEventAPI$Meta3dEvent = require("../api/ManageEventAPI.bs.js");
var NameEventDoService$Meta3dEvent = require("../../../src/event_manager/service/event/NameEventDoService.bs.js");

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

exports.getPointDownEventName = getPointDownEventName;
exports.getPointUpEventName = getPointUpEventName;
exports.getPointTapEventName = getPointTapEventName;
exports.getPointMoveEventName = getPointMoveEventName;
exports.getPointScaleEventName = getPointScaleEventName;
exports.getPointDragStartEventName = getPointDragStartEventName;
exports.getPointDragOverEventName = getPointDragOverEventName;
exports.getPointDragDropEventName = getPointDragDropEventName;
exports.createCustomEvent = createCustomEvent;
/* No side effect */

'use strict';

var ContainerManager$Meta3dEvent = require("../../../src/event_manager/data/ContainerManager.bs.js");
var EventExtensionTool$Meta3dEvent = require("../api/EventExtensionTool.bs.js");
var CreateEventManagerState$Meta3dEvent = require("../../../src/event_manager/data/CreateEventManagerState.bs.js");

function prepareState(param) {
  ContainerManager$Meta3dEvent.setState(CreateEventManagerState$Meta3dEvent.create(undefined), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined));
}

exports.prepareState = prepareState;
/* No side effect */

'use strict';

var ContainerManager$Meta3dEvent = require("../../../src/event_manager/data/ContainerManager.bs.js");
var CreateEventManagerState$Meta3dEvent = require("../../../src/event_manager/data/CreateEventManagerState.bs.js");

function prepareState(param) {
  return ContainerManager$Meta3dEvent.setState(CreateEventManagerState$Meta3dEvent.create(undefined));
}

exports.prepareState = prepareState;
/* ContainerManager-Meta3dEvent Not a pure module */

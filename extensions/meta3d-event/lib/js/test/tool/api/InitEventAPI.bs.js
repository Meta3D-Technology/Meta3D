'use strict';

var ContainerManager$Meta3dEvent = require("../../../src/event_manager/data/ContainerManager.bs.js");
var EventExtensionTool$Meta3dEvent = require("./EventExtensionTool.bs.js");
var InitEventDoService$Meta3dEvent = require("../../../src/event_manager/service/init_event/InitEventDoService.bs.js");

function initEvent(param) {
  ContainerManager$Meta3dEvent.setState(InitEventDoService$Meta3dEvent.initEvent(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

exports.initEvent = initEvent;
/* InitEventDoService-Meta3dEvent Not a pure module */

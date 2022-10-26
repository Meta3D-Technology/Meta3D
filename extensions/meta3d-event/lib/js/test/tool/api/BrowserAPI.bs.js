'use strict';

var BrowserDoService$Meta3dEvent = require("../../../src/event_manager/service/browser/BrowserDoService.bs.js");
var ContainerManager$Meta3dEvent = require("../../../src/event_manager/data/ContainerManager.bs.js");
var EventExtensionTool$Meta3dEvent = require("./EventExtensionTool.bs.js");

function setBrowser(browser) {
  return ContainerManager$Meta3dEvent.setState(BrowserDoService$Meta3dEvent.setBrowser(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)), browser), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

exports.setBrowser = setBrowser;
/* No side effect */

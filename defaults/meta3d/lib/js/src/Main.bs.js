'use strict';

var ExtensionManager$Meta3d = require("./ExtensionManager.bs.js");

var prepare = ExtensionManager$Meta3d.prepare;

var registerExtension = ExtensionManager$Meta3d.register;

var getExtensionService = ExtensionManager$Meta3d.getExtensionServiceExn;

var setExtensionState = ExtensionManager$Meta3d.setExtensionState;

var getExtensionState = ExtensionManager$Meta3d.getExtensionStateExn;

var buildAPI = ExtensionManager$Meta3d.buildAPI;

exports.prepare = prepare;
exports.registerExtension = registerExtension;
exports.getExtensionService = getExtensionService;
exports.setExtensionState = setExtensionState;
exports.getExtensionState = getExtensionState;
exports.buildAPI = buildAPI;
/* No side effect */

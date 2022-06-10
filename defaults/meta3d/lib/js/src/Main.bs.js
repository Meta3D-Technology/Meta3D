'use strict';

var ExtensionManager$Meta3d = require("./ExtensionManager.bs.js");
var ExtensionFileManager$Meta3d = require("./file/ExtensionFileManager.bs.js");

var prepare = ExtensionManager$Meta3d.prepare;

var registerExtension = ExtensionManager$Meta3d.registerExtension;

var getExtensionService = ExtensionManager$Meta3d.getExtensionServiceExn;

var setExtensionState = ExtensionManager$Meta3d.setExtensionState;

var getExtensionState = ExtensionManager$Meta3d.getExtensionStateExn;

var registerContribute = ExtensionManager$Meta3d.registerContribute;

var getContribute = ExtensionManager$Meta3d.getContributeExn;

var startExtensions = ExtensionManager$Meta3d.startExtensions;

var compressExtension = ExtensionFileManager$Meta3d.compressExtension;

var loadExtension = ExtensionFileManager$Meta3d.loadExtension;

var buildAPI = ExtensionManager$Meta3d.buildAPI;

exports.prepare = prepare;
exports.registerExtension = registerExtension;
exports.getExtensionService = getExtensionService;
exports.setExtensionState = setExtensionState;
exports.getExtensionState = getExtensionState;
exports.registerContribute = registerContribute;
exports.getContribute = getContribute;
exports.startExtensions = startExtensions;
exports.compressExtension = compressExtension;
exports.loadExtension = loadExtension;
exports.buildAPI = buildAPI;
/* No side effect */

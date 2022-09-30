'use strict';

var AppManager$Meta3d = require("./app/AppManager.bs.js");
var ExtensionManager$Meta3d = require("./ExtensionManager.bs.js");
var ExtensionFileManager$Meta3d = require("./file/ExtensionFileManager.bs.js");

var registerExtension = ExtensionManager$Meta3d.registerExtension;

var getExtensionService = ExtensionManager$Meta3d.getExtensionServiceExn;

var setExtensionState = ExtensionManager$Meta3d.setExtensionState;

var getExtensionState = ExtensionManager$Meta3d.getExtensionStateExn;

var registerContribute = ExtensionManager$Meta3d.registerContribute;

var getContribute = ExtensionManager$Meta3d.getContributeExn;

var startExtension = ExtensionManager$Meta3d.startExtension;

var generateExtension = ExtensionFileManager$Meta3d.generateExtension;

var loadExtension = ExtensionFileManager$Meta3d.loadExtension;

var generateContribute = ExtensionFileManager$Meta3d.generateContribute;

var loadContribute = ExtensionFileManager$Meta3d.loadContribute;

var convertAllFileDataForApp = AppManager$Meta3d.convertAllFileData;

var generateApp = AppManager$Meta3d.generate;

var loadApp = AppManager$Meta3d.load;

var startApp = AppManager$Meta3d.start;

var initApp = AppManager$Meta3d.init;

var updateApp = AppManager$Meta3d.update;

var buildAPI = ExtensionManager$Meta3d.buildAPI;

exports.registerExtension = registerExtension;
exports.getExtensionService = getExtensionService;
exports.setExtensionState = setExtensionState;
exports.getExtensionState = getExtensionState;
exports.registerContribute = registerContribute;
exports.getContribute = getContribute;
exports.startExtension = startExtension;
exports.generateExtension = generateExtension;
exports.loadExtension = loadExtension;
exports.generateContribute = generateContribute;
exports.loadContribute = loadContribute;
exports.convertAllFileDataForApp = convertAllFileDataForApp;
exports.generateApp = generateApp;
exports.loadApp = loadApp;
exports.startApp = startApp;
exports.initApp = initApp;
exports.updateApp = updateApp;
exports.buildAPI = buildAPI;
/* AppManager-Meta3d Not a pure module */

'use strict';

var AppManager$Meta3d = require("./app/AppManager.bs.js");
var ExtensionManager$Meta3d = require("./ExtensionManager.bs.js");
var ActionProtocolConfig$Meta3d = require("./contribute_protocol_config/ActionProtocolConfig.bs.js");
var ExtensionFileManager$Meta3d = require("./file/ExtensionFileManager.bs.js");
var UIControlProtocolConfig$Meta3d = require("./contribute_protocol_config/UIControlProtocolConfig.bs.js");

var registerExtension = ExtensionManager$Meta3d.registerExtension;

var initExtension = ExtensionManager$Meta3d.initExtension;

var updateExtension = ExtensionManager$Meta3d.updateExtension;

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

var execGetContributeFunc = AppManager$Meta3d.execGetContributeFunc;

var serializeUIControlProtocolConfigLib = UIControlProtocolConfig$Meta3d.serializeLib;

var getSkinProtocolData = UIControlProtocolConfig$Meta3d.getSkinProtocolData;

var generateUIControlName = UIControlProtocolConfig$Meta3d.generateUIControlName;

var generateUIControlDataStr = UIControlProtocolConfig$Meta3d.generateUIControlDataStr;

var getUIControlSupportedEventNames = UIControlProtocolConfig$Meta3d.getUIControlSupportedEventNames;

var generateHandleUIControlEventStr = UIControlProtocolConfig$Meta3d.generateHandleUIControlEventStr;

var serializeActionProtocolConfigLib = ActionProtocolConfig$Meta3d.serializeLib;

var getActions = ActionProtocolConfig$Meta3d.getActions;

var buildAPI = ExtensionManager$Meta3d.buildAPI;

exports.registerExtension = registerExtension;
exports.initExtension = initExtension;
exports.updateExtension = updateExtension;
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
exports.execGetContributeFunc = execGetContributeFunc;
exports.serializeUIControlProtocolConfigLib = serializeUIControlProtocolConfigLib;
exports.getSkinProtocolData = getSkinProtocolData;
exports.generateUIControlName = generateUIControlName;
exports.generateUIControlDataStr = generateUIControlDataStr;
exports.getUIControlSupportedEventNames = getUIControlSupportedEventNames;
exports.generateHandleUIControlEventStr = generateHandleUIControlEventStr;
exports.serializeActionProtocolConfigLib = serializeActionProtocolConfigLib;
exports.getActions = getActions;
exports.buildAPI = buildAPI;
/* AppManager-Meta3d Not a pure module */

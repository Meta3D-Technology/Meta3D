'use strict';

var AppManager$Meta3d = require("./app_and_package/AppManager.bs.js");
var PackageManager$Meta3d = require("./app_and_package/PackageManager.bs.js");
var ExtensionManager$Meta3d = require("./ExtensionManager.bs.js");
var ActionProtocolConfig$Meta3d = require("./contribute_protocol_config/ActionProtocolConfig.bs.js");
var ExtensionFileManager$Meta3d = require("./file/ExtensionFileManager.bs.js");
var UIControlProtocolConfig$Meta3d = require("./contribute_protocol_config/UIControlProtocolConfig.bs.js");
var StartExtensionProtocolConfig$Meta3d = require("./extension_protocol_config/StartExtensionProtocolConfig.bs.js");

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

var convertAllFileDataForPackage = PackageManager$Meta3d.convertAllFileData;

var generateApp = AppManager$Meta3d.generate;

var generatePackage = PackageManager$Meta3d.generate;

var loadApp = AppManager$Meta3d.load;

var loadPackage = PackageManager$Meta3d.load;

var startApp = AppManager$Meta3d.start;

var execGetContributeFunc = AppManager$Meta3d.execGetContributeFunc;

var serializeUIControlProtocolConfigLib = UIControlProtocolConfig$Meta3d.serializeLib;

var generateUIControlCommonDataStr = UIControlProtocolConfig$Meta3d.generateUIControlCommonDataStr;

var getUIControlSpecificDataFields = UIControlProtocolConfig$Meta3d.getUIControlSpecificDataFields;

var hasChildren = UIControlProtocolConfig$Meta3d.hasChildren;

var getUIControlSupportedEventNames = UIControlProtocolConfig$Meta3d.getUIControlSupportedEventNames;

var generateHandleUIControlEventStr = UIControlProtocolConfig$Meta3d.generateHandleUIControlEventStr;

var serializeActionProtocolConfigLib = ActionProtocolConfig$Meta3d.serializeLib;

var getActions = ActionProtocolConfig$Meta3d.getActions;

var serializeStartExtensionProtocolConfigLib = StartExtensionProtocolConfig$Meta3d.serializeLib;

var getNeedConfigData = StartExtensionProtocolConfig$Meta3d.getNeedConfigData;

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
exports.convertAllFileDataForPackage = convertAllFileDataForPackage;
exports.generateApp = generateApp;
exports.generatePackage = generatePackage;
exports.loadApp = loadApp;
exports.loadPackage = loadPackage;
exports.startApp = startApp;
exports.execGetContributeFunc = execGetContributeFunc;
exports.serializeUIControlProtocolConfigLib = serializeUIControlProtocolConfigLib;
exports.generateUIControlCommonDataStr = generateUIControlCommonDataStr;
exports.getUIControlSpecificDataFields = getUIControlSpecificDataFields;
exports.hasChildren = hasChildren;
exports.getUIControlSupportedEventNames = getUIControlSupportedEventNames;
exports.generateHandleUIControlEventStr = generateHandleUIControlEventStr;
exports.serializeActionProtocolConfigLib = serializeActionProtocolConfigLib;
exports.getActions = getActions;
exports.serializeStartExtensionProtocolConfigLib = serializeStartExtensionProtocolConfigLib;
exports.getNeedConfigData = getNeedConfigData;
exports.buildAPI = buildAPI;
/* No side effect */

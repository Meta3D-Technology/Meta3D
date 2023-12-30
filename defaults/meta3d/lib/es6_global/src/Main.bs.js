

import * as AppManager$Meta3d from "./app_and_package/AppManager.bs.js";
import * as ManagerUtils$Meta3d from "./app_and_package/ManagerUtils.bs.js";
import * as PackageManager$Meta3d from "./app_and_package/PackageManager.bs.js";
import * as ExtensionManager$Meta3d from "./ExtensionManager.bs.js";
import * as ExtensionFileManager$Meta3d from "./file/ExtensionFileManager.bs.js";
import * as UIControlProtocolConfig$Meta3d from "./contribute_protocol_config/UIControlProtocolConfig.bs.js";
import * as StartPackageProtocolConfig$Meta3d from "./package_protocol_config/StartPackageProtocolConfig.bs.js";

var registerExtension = ExtensionManager$Meta3d.registerExtension;

var initExtension = ExtensionManager$Meta3d.initExtension;

var updateExtension = ExtensionManager$Meta3d.updateExtension;

var getExtensionService = ExtensionManager$Meta3d.getExtensionServiceExn;

var setExtensionState = ExtensionManager$Meta3d.setExtensionState;

var getExtensionState = ExtensionManager$Meta3d.getExtensionStateExn;

var getPackageService = ExtensionManager$Meta3d.getPackageService;

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

var getAllDataOfPackage = PackageManager$Meta3d.getAllDataOfPackage;

var getAllDataOfApp = AppManager$Meta3d.getAllDataOfApp;

var startApp = AppManager$Meta3d.start;

var execGetContributeFunc = AppManager$Meta3d.execGetContributeFunc;

var getExtensionFuncDataStr = AppManager$Meta3d.getExtensionFuncDataStr;

var getExtensionFuncData = AppManager$Meta3d.getExtensionFuncData;

var getContributeFuncDataStr = AppManager$Meta3d.getContributeFuncDataStr;

var convertContributeFuncData = ManagerUtils$Meta3d.convertContributeFuncData;

var getContributeFuncData = AppManager$Meta3d.getContributeFuncData;

var serializeUIControlProtocolConfigLib = UIControlProtocolConfig$Meta3d.serializeLib;

var getUIControlSpecificDataFields = UIControlProtocolConfig$Meta3d.getUIControlSpecificDataFields;

var hasChildren = UIControlProtocolConfig$Meta3d.hasChildren;

var getUIControlSupportedEventNames = UIControlProtocolConfig$Meta3d.getUIControlSupportedEventNames;

var generateHandleUIControlEventStr = UIControlProtocolConfig$Meta3d.generateHandleUIControlEventStr;

var serializeStartPackageProtocolConfigLib = StartPackageProtocolConfig$Meta3d.serializeLib;

var getNeedConfigData = StartPackageProtocolConfig$Meta3d.getNeedConfigData;

var restore = ExtensionManager$Meta3d.restore;

var deepCopy = ExtensionManager$Meta3d.deepCopy;

var buildAPI = ExtensionManager$Meta3d.buildAPI;

export {
  registerExtension ,
  initExtension ,
  updateExtension ,
  getExtensionService ,
  setExtensionState ,
  getExtensionState ,
  getPackageService ,
  registerContribute ,
  getContribute ,
  startExtension ,
  generateExtension ,
  loadExtension ,
  generateContribute ,
  loadContribute ,
  convertAllFileDataForApp ,
  convertAllFileDataForPackage ,
  generateApp ,
  generatePackage ,
  loadApp ,
  loadPackage ,
  getAllDataOfPackage ,
  getAllDataOfApp ,
  startApp ,
  execGetContributeFunc ,
  getExtensionFuncDataStr ,
  getExtensionFuncData ,
  getContributeFuncDataStr ,
  convertContributeFuncData ,
  getContributeFuncData ,
  serializeUIControlProtocolConfigLib ,
  getUIControlSpecificDataFields ,
  hasChildren ,
  getUIControlSupportedEventNames ,
  generateHandleUIControlEventStr ,
  serializeStartPackageProtocolConfigLib ,
  getNeedConfigData ,
  restore ,
  deepCopy ,
  buildAPI ,
}
/* AppManager-Meta3d Not a pure module */

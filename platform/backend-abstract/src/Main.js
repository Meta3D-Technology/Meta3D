"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNewestPublishPackage = exports.findPublishPackage = exports.getAllPublishPackageInfos = exports.getAllPublishPackageEntryExtensionProtocols = exports.publishPackage = exports.publishElementContribute = exports.publishElementAssembleData = exports.findAllElementAssembleData = exports.getElementAssembleData = exports.getAllPublishNewestData = exports.findAllPublishApps = exports.findAllPublishAppsByAccount = exports.findPublishApp = exports.publishApp = exports.findPublishImplement = exports.getAllPublishImplementInfo = exports.batchFindPublishProtocolConfigData = exports.getAllPublishProtocolConfigData = exports.getAllPublishProtocolDataCount = exports.batchFindPublishProtocolData = exports.getAllPublishProtocolData = exports.isLoginSuccess = exports.registerUser = exports.checkUserName = exports.handleLoginForWeb3 = exports.init = void 0;
const MarketService = __importStar(require("./application_layer/market/MarketService"));
const LoginService = __importStar(require("./application_layer/user/LoginService"));
const PublishAppService = __importStar(require("./application_layer/publish/PublishAppService"));
const GetElementDataService = __importStar(require("./application_layer/assemble_space/element_assemble/GetElementDataService"));
const PublishElementContributeService = __importStar(require("./application_layer/assemble_space/element_assemble/PublishElementContributeService"));
const PublishPackageService = __importStar(require("./application_layer/publish/PublishPackageService"));
const PackageMarketService = __importStar(require("./application_layer/market/PackageMarketService"));
const DependencyService = __importStar(require("./application_layer/assemble_space/DependencyService"));
let init = (init, env) => init(env);
exports.init = init;
let handleLoginForWeb3 = (handleLoginForWeb3, account) => handleLoginForWeb3(account);
exports.handleLoginForWeb3 = handleLoginForWeb3;
let checkUserName = (checkUserName, account) => checkUserName(account);
exports.checkUserName = checkUserName;
let registerUser = (registerUser, account) => registerUser(account);
exports.registerUser = registerUser;
exports.isLoginSuccess = LoginService.isLoginSuccess;
exports.getAllPublishProtocolData = MarketService.getAllPublishProtocolData;
exports.batchFindPublishProtocolData = MarketService.batchFindPublishProtocolData;
exports.getAllPublishProtocolDataCount = MarketService.getAllPublishProtocolDataCount;
exports.getAllPublishProtocolConfigData = MarketService.getAllPublishProtocolConfigData;
exports.batchFindPublishProtocolConfigData = MarketService.batchFindPublishProtocolConfigData;
exports.getAllPublishImplementInfo = MarketService.getAllPublishImplementInfo;
exports.findPublishImplement = MarketService.findPublishImplement;
exports.publishApp = PublishAppService.publish;
exports.findPublishApp = PublishAppService.findPublishApp;
exports.findAllPublishAppsByAccount = PublishAppService.findAllPublishAppsByAccount;
exports.findAllPublishApps = PublishAppService.findAllPublishApps;
exports.getAllPublishNewestData = GetElementDataService.getAllPublishNewestData;
exports.getElementAssembleData = GetElementDataService.getElementAssembleData;
exports.findAllElementAssembleData = GetElementDataService.findAllElementAssembleData;
exports.publishElementAssembleData = PublishElementContributeService.publishElementAssembleData;
exports.publishElementContribute = PublishElementContributeService.publishElementContribute;
exports.publishPackage = PublishPackageService.publish;
exports.getAllPublishPackageEntryExtensionProtocols = PackageMarketService.getAllPublishPackageEntryExtensionProtocols;
exports.getAllPublishPackageInfos = PackageMarketService.getAllPublishPackageInfos;
exports.findPublishPackage = PackageMarketService.findPublishPackage;
exports.findNewestPublishPackage = DependencyService.findNewestPublishPackage;
//# sourceMappingURL=Main.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishContribute = exports.publishExtension = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const read_package_json_1 = __importDefault(require("read-package-json"));
const meta3d_1 = require("meta3d");
function _error(msg) {
    throw new Error(msg);
}
function _checkNotEmpty(value) {
    return value === undefined || value === null ?
        _error("empty") : value;
}
function _searchProtocolVersion(name, dependencies) {
    return _checkNotEmpty(dependencies[name]);
}
function _convertToExtensionPackageData({ name, protocol, dependentExtensionNameMap, dependentContributeNameMap, dependencies }) {
    return {
        name: name,
        protocol: {
            name: protocol.name,
            version: _searchProtocolVersion(protocol.name, dependencies)
        },
        dependentExtensionNameMap: Object.fromEntries(Object
            .entries(dependentExtensionNameMap)
            .map(([key, { protocolName }]) => [key, { protocolName, protocolVersion: _searchProtocolVersion(protocolName, dependencies) }])),
        dependentContributeNameMap: Object.fromEntries(Object
            .entries(dependentContributeNameMap)
            .map(([key, { protocolName }]) => [key, { protocolName, protocolVersion: _searchProtocolVersion(protocolName, dependencies) }]))
    };
}
function _defineWindow() {
    global.window = {};
}
function _arrayBufferToBuffer(ab) {
    return Buffer.from(ab);
}
// TODO remove loadFunc
// TODO send to server
function _publish([loadFunc, generateFunc], packageFilePath, distFilePath) {
    // readJson(packageFilePath, console.error, false, (er: any, packageJson: any) => {
    (0, read_package_json_1.default)(packageFilePath, null, false, (er, packageJson) => {
        if (er) {
            console.error("There was an error reading the file");
            return;
        }
        _defineWindow();
        // console.log(_convertToExtensionPackageData(packageJson))
        let fileData = loadFunc(generateFunc(_convertToExtensionPackageData(packageJson), fs_1.default.readFileSync(distFilePath, "utf-8")));
        console.log(JSON.stringify(fileData.extensionPackageData), fileData.extensionFuncData);
        // fs.writeFileSync(
        // 	path.join("/Users/yang/Github/Meta3D/tools/meta3d-tool-publish/", "mine/temp_data", fileData.extensionPackageData.name + ".buffer"),
        // 	_arrayBufferToBuffer(generateExtension(
        // 		_convertToExtensionPackageData(packageJson),
        // 		fs.readFileSync(distFilePath, "utf-8")
        // 	))
        // )
        // console.log(loadExtension(
        // 	fs.readFileSync(path.join("/Users/yang/Github/Meta3D/tools/meta3d-tool-publish/", "mine/temp_data", fileData.extensionPackageData.name + ".buffer")).buffer
        // ))
    });
}
function publishExtension(packageFilePath, distFilePath) {
    return _publish([meta3d_1.loadExtension, meta3d_1.generateExtension], packageFilePath, distFilePath);
}
exports.publishExtension = publishExtension;
function publishContribute(packageFilePath, distFilePath) {
    return _publish([meta3d_1.loadContribute, meta3d_1.generateContribute], packageFilePath, distFilePath);
}
exports.publishContribute = publishContribute;
publishExtension(path_1.default.join(__dirname, "../mine/test_data/", "package.json"), path_1.default.join(__dirname, "../mine/test_data/js/", "main.js"));
//# sourceMappingURL=Main.js.map
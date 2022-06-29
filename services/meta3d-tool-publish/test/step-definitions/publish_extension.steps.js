"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const Main_1 = require("../../src/Main");
const sinon_1 = require("sinon");
const most_1 = require("most");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/publish_extension.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let readFileSyncFunc, logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc;
    function _createFuncs(sandbox, errorFuncStub = console.error) {
        readFileSyncFunc = sandbox.stub();
        logFunc = sandbox.stub();
        errorFunc = errorFuncStub;
        readJsonFunc = sandbox.stub();
        generateFunc = sandbox.stub();
        initFunc = sandbox.stub();
        hasDataFunc = sandbox.stub();
        uploadFileFunc = sandbox.stub();
        getDataFunc = sandbox.stub();
        updateDataFunc = sandbox.stub();
    }
    function _buildPackageJson(name = "test1", version = "0.0.1", protocol = { name: "test1-protocol" }, publisher = "meta3d", dependentExtensionNameMap = {}, dependentContributeNameMap = {}, dependencies = {
        "test1-protocol": "^0.0.1"
    }) {
        return { name, version, protocol, publisher, dependentExtensionNameMap, dependentContributeNameMap, dependencies };
    }
    function _publishExtension(packageFilePath = "", distFilePath = "") {
        return (0, Main_1._publish)([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc], packageFilePath, distFilePath, "extension");
    }
    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    }
    test('if publisher is not registered, throw error', ({ given, and, when, then }) => {
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox, sandbox.stub());
            readJsonFunc.returns((0, most_1.just)({}));
            initFunc.returns((0, most_1.just)({}));
        });
        and('make publisher not be registered', () => {
            hasDataFunc.returns((0, most_1.just)(false));
        });
        when('publish extension', () => {
            return _publishExtension();
        });
        then(/^should error:                 "(.*)"$/, (arg0) => {
            expect(errorFunc.getCall(0).args[1].message).toEqual(arg0);
        });
    });
    test('define window for generateFunc', ({ given, and, when, then }) => {
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox, sandbox.stub());
            readJsonFunc.returns((0, most_1.just)(_buildPackageJson()));
            initFunc.returns((0, most_1.just)({}));
            hasDataFunc.returns((0, most_1.just)(true));
            uploadFileFunc.returns((0, most_1.empty)());
        });
        and('make generateFunc use window', () => {
            delete global.window;
            generateFunc = (_1, _2) => {
                global.window.a = 1;
                return new ArrayBuffer(0);
            };
        });
        when('publish extension', () => {
            return _publishExtension();
        });
        then('should not error', () => {
            expect(errorFunc).not.toCalled();
        });
    });
    test('upload file and add to collection', ({ given, when, then, and }) => {
        let app = {};
        let distFileContent = "dist";
        let generatedResult = new ArrayBuffer(0);
        let fileID1 = "id1";
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            readJsonFunc.returns((0, most_1.just)(_buildPackageJson("test1", "0.0.2", { name: "test1-protocol" }, "meta3d", {
                meta3dTest1ExtensionName: {
                    "protocolName": "meta3d-extension-test1-protocol"
                }
            }, {}, {
                "test1-protocol": "^0.0.1",
                "meta3d-extension-test1-protocol": "^0.3.4"
            })));
            initFunc.returns((0, most_1.just)(app));
            hasDataFunc.returns((0, most_1.just)(true));
            readFileSyncFunc.returns(distFileContent);
            generateFunc.returns(generatedResult);
            uploadFileFunc.returns((0, most_1.just)({ fileID: fileID1 }));
            getDataFunc.returns((0, PromiseTool_1.resolve)({
                data: [
                    {
                        fileData: []
                    }
                ]
            }));
        });
        when('publish extension', () => {
            return _publishExtension();
        });
        then('should upload generated file', () => {
            expect(generateFunc).toCalledWith([
                { "name": "test1", "publisher": "meta3d", "protocol": { "name": "test1-protocol", "version": "^0.0.1" }, "dependentExtensionNameMap": { "meta3dTest1ExtensionName": { "protocolName": "meta3d-extension-test1-protocol", "protocolVersion": "^0.3.4" } }, "dependentContributeNameMap": {} },
                distFileContent
            ]);
            expect(uploadFileFunc).toCalledWith([
                "extensions/test1_0.0.2.arrayBuffer",
                Buffer.from(generatedResult)
            ]);
        });
        and('should add to collection', () => {
            expect(updateDataFunc).toCalledWith([
                app,
                "publishedExtensions",
                { "username": "meta3d" },
                {
                    "fileData": [{
                            "protocolName": "test1-protocol", "protocolVersion": "^0.0.1",
                            "version": "0.0.2",
                            "fileID": fileID1
                        }]
                }
            ]);
        });
    });
    test('update fileID in collection if exist', ({ given, and, when, then }) => {
        let app = {};
        let distFileContent1 = "dist1";
        let distFileContent2 = "dist2";
        let generatedResult1 = new ArrayBuffer(0);
        let generatedResult2 = new ArrayBuffer(1);
        let fileID1 = "id1";
        let fileID2 = "id2";
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            readJsonFunc.returns((0, most_1.just)(_buildPackageJson("test1", "0.0.2", { name: "test1-protocol" }, "meta3d", {}, {}, {
                "test1-protocol": "^0.0.1"
            })));
            initFunc.returns((0, most_1.just)(app));
            hasDataFunc.returns((0, most_1.just)(true));
            readFileSyncFunc.onCall(0).returns(distFileContent1);
            readFileSyncFunc.onCall(1).returns(distFileContent2);
            generateFunc.onCall(0).returns(generatedResult1);
            generateFunc.onCall(1).returns(generatedResult2);
            uploadFileFunc.onCall(0).returns((0, most_1.just)({ fileID: fileID1 }));
            uploadFileFunc.onCall(1).returns((0, most_1.just)({ fileID: fileID2 }));
            getDataFunc.onCall(0).returns((0, PromiseTool_1.resolve)({
                data: [
                    {
                        fileData: []
                    }
                ]
            }));
            getDataFunc.onCall(1).returns((0, PromiseTool_1.resolve)({
                data: [
                    {
                        fileData: [
                            {
                                protocolName: "test1-protocol",
                                version: "0.0.2"
                            }
                        ]
                    }
                ]
            }));
        });
        and('publish extension', () => {
            return _publishExtension();
        });
        when('publish extension with same protocolName and version but different dist file', () => {
            return _publishExtension();
        });
        then('should upload generated file', () => {
            expect(uploadFileFunc.getCall(1)).toCalledWith([
                "extensions/test1_0.0.2.arrayBuffer",
                Buffer.from(generatedResult2)
            ]);
        });
        and('should update fileID in collection', () => {
            expect(updateDataFunc.getCall(1)).toCalledWith([
                app,
                "publishedExtensions",
                { "username": "meta3d" },
                {
                    "fileData": [{
                            "protocolName": "test1-protocol", "protocolVersion": "^0.0.1",
                            "version": "0.0.2",
                            "fileID": fileID2
                        }]
                }
            ]);
        });
    });
});
//# sourceMappingURL=publish_extension.steps.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const Publish_1 = require("../../src/Publish");
const sinon_1 = require("sinon");
const most_1 = require("most");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const CloudbaseService_1 = require("../../../meta3d-tool-utils/src/publish/CloudbaseService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/publish_extension.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let readFileSyncFunc, logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasAccountFunc, uploadFileFunc, getShopImplementAccountDataFunc, updateShopImplementDataFunc, getDataFromShopImplementAccountDataFunc, isContainFunc, buildShopImplementAccountDataFunc, addShopImplementDataToDataFromShopImplementCollectionDataFunc, getFileIDFunc;
    function _createFuncs(sandbox, errorFuncStub = console.error) {
        readFileSyncFunc = sandbox.stub();
        logFunc = sandbox.stub();
        errorFunc = errorFuncStub;
        readJsonFunc = sandbox.stub();
        generateFunc = sandbox.stub();
        initFunc = sandbox.stub();
        hasAccountFunc = sandbox.stub();
        uploadFileFunc = sandbox.stub();
        getShopImplementAccountDataFunc = sandbox.stub();
        updateShopImplementDataFunc = sandbox.stub();
        getDataFromShopImplementAccountDataFunc = CloudbaseService_1.getDataFromShopImplementAccountData;
        isContainFunc = CloudbaseService_1.isContain;
        buildShopImplementAccountDataFunc = CloudbaseService_1.buildShopImplementAccountData;
        addShopImplementDataToDataFromShopImplementCollectionDataFunc = CloudbaseService_1.addShopImplementDataToDataFromShopImplementCollectionData;
        getFileIDFunc = CloudbaseService_1.getFileID;
    }
    function _buildPackageJson(name = "test1", version = "0.0.1", protocol = { name: "test1-protocol" }, publisher = "meta3d", dependentExtensionNameMap = {}, dependentContributeNameMap = {}, dependencies = {
        "test1-protocol": "^0.0.1"
    }) {
        return { name, version, protocol, publisher, dependentExtensionNameMap, dependentContributeNameMap, dependencies };
    }
    function _publishExtension(packageFilePath = "", distFilePath = "") {
        return (0, Publish_1.publish)([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasAccountFunc, uploadFileFunc, getShopImplementAccountDataFunc, updateShopImplementDataFunc, getDataFromShopImplementAccountDataFunc, isContainFunc, buildShopImplementAccountDataFunc, addShopImplementDataToDataFromShopImplementCollectionDataFunc, getFileIDFunc], packageFilePath, distFilePath, "extension");
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
            hasAccountFunc.returns((0, most_1.just)(false));
        });
        when('publish extension', () => {
            return _publishExtension();
        });
        then(/^should error: "(.*)"$/, (arg0) => {
            expect(errorFunc.getCall(0).args[1].message).toEqual(arg0);
        });
    });
    test('define window for generateFunc', ({ given, and, when, then }) => {
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox, sandbox.stub());
            readJsonFunc.returns((0, most_1.just)(_buildPackageJson()));
            initFunc.returns((0, most_1.just)({}));
            getShopImplementAccountDataFunc.returns((0, PromiseTool_1.resolve)([{
                    fileData: []
                }, []]));
            hasAccountFunc.returns((0, most_1.just)(true));
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
        let app = { "app": true };
        let distFileContent = "dist";
        let generatedResult = new ArrayBuffer(0);
        let fileID1 = "id1";
        let shopImplementCollectionData = [];
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
            hasAccountFunc.returns((0, most_1.just)(true));
            readFileSyncFunc.returns(distFileContent);
            generateFunc.returns(generatedResult);
            uploadFileFunc.returns((0, most_1.just)({ fileID: fileID1 }));
            getShopImplementAccountDataFunc.returns((0, PromiseTool_1.resolve)([{
                    fileData: []
                }, shopImplementCollectionData]));
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
                app,
                "extensions/test1_0.0.2.arrayBuffer",
                generatedResult
            ]);
        });
        and('should add to collection', () => {
            expect(updateShopImplementDataFunc).toCalledWith([
                app,
                "publishedextensions",
                "meta3d",
                {
                    "key": "meta3d",
                    "fileData": [{
                            "protocolName": "test1-protocol", "protocolVersion": "^0.0.1",
                            "name": "test1",
                            "version": "0.0.2",
                            "fileID": fileID1
                        }]
                },
                shopImplementCollectionData
            ]);
        });
    });
    // test('update fileID in collection if exist', ({ given, and, when, then }) => {
    //     let app = { "a": true }
    //     let distFileContent1 = "dist1"
    //     let distFileContent2 = "dist2"
    //     let generatedResult1 = new ArrayBuffer(0)
    //     let generatedResult2 = new ArrayBuffer(1)
    //     let fileID1 = "id1"
    //     let fileID2 = "id2"
    //     _prepare(given)
    //     given('prepare funcs', () => {
    //         _createFuncs(sandbox)
    //         readJsonFunc.returns(
    //             just(_buildPackageJson(
    //                 "test1",
    //                 "0.0.2",
    //                 { name: "test1-protocol" }, "meta3d",
    //                 {
    //                 }, {},
    //                 {
    //                     "test1-protocol": "^0.0.1"
    //                 }
    //             ))
    //         )
    //         initFunc.returns(
    //             just(app)
    //         )
    //         hasAccountFunc.returns(
    //             just(true)
    //         )
    //         readFileSyncFunc.onCall(0).returns(distFileContent1)
    //         readFileSyncFunc.onCall(1).returns(distFileContent2)
    //         generateFunc.onCall(0).returns(generatedResult1)
    //         generateFunc.onCall(1).returns(generatedResult2)
    //         uploadFileFunc.onCall(0).returns(
    //             just({ fileID: fileID1 })
    //         )
    //         uploadFileFunc.onCall(1).returns(
    //             just({ fileID: fileID2 })
    //         )
    //         getShopImplementAccountDataFunc.onCall(0).returns(
    //             resolve({
    //                 data: [
    //                     {
    //                         fileData: []
    //                     }
    //                 ]
    //             })
    //         )
    //         getShopImplementAccountDataFunc.onCall(1).returns(
    //             resolve({
    //                 data: [
    //                     {
    //                         fileData: [
    //                             {
    //                                 protocolName: "test1-protocol",
    //                                 version: "0.0.2"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             })
    //         )
    //     });
    //     and('publish extension', () => {
    //         return _publishExtension()
    //     });
    //     when('publish extension with same protocolName and version but different dist file', () => {
    //         return _publishExtension()
    //     });
    //     then('should upload generated file', () => {
    //         expect(uploadFileFunc.getCall(1)).toCalledWith([
    //             app,
    //             "extensions/test1_0.0.2.arrayBuffer",
    //             Buffer.from(generatedResult2)
    //         ])
    //     });
    //     and('should update fileID in collection', () => {
    //         expect(updateShopImplementDataFunc.getCall(1)).toCalledWith([
    //             app,
    //             "publishedextensions",
    //             { "username": "meta3d" },
    //             {
    //                 "fileData": [{
    //                     "protocolName": "test1-protocol", "protocolVersion": "^0.0.1",
    //                     "version": "0.0.2",
    //                     "fileID": fileID2
    //                 }]
    //             }
    //         ])
    //     });
    // });
    test('if extension with the same publisher, name, version, protocol name exist, throw error', ({ given, when, then, and }) => {
        let app = { "app": true };
        let distFileContent = "dist";
        let generatedResult = new ArrayBuffer(0);
        let fileID1 = "id1";
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox, sandbox.stub());
            readJsonFunc.returns((0, most_1.just)(_buildPackageJson("test1", "0.0.2", { name: "test1-protocol" }, "meta3d", {}, {}, {
                "test1-protocol": "^0.0.1"
            })));
            initFunc.returns((0, most_1.just)(app));
            hasAccountFunc.returns((0, most_1.just)(true));
            readFileSyncFunc.returns(distFileContent);
            generateFunc.returns(generatedResult);
            uploadFileFunc.returns((0, most_1.empty)());
            getShopImplementAccountDataFunc.onCall(0).returns((0, PromiseTool_1.resolve)([{
                    fileData: []
                }, []]));
            getShopImplementAccountDataFunc.onCall(1).returns((0, PromiseTool_1.resolve)([{
                    fileData: [
                        {
                            protocolName: "test1-protocol",
                            name: "test1",
                            version: "0.0.2"
                        }
                    ]
                }, []]));
        });
        and('publish extension', () => {
            return _publishExtension();
        });
        when('publish extension with the same publisher, name, version, protocol name', () => {
            return _publishExtension();
        });
        then('should error', () => {
            expect(errorFunc.getCall(0).args[1].message).toEqual("version: 0.0.2 already exist, please update version");
        });
        and('not upload file', () => {
            expect(uploadFileFunc.callCount).toEqual(1);
        });
    });
});
//# sourceMappingURL=publish_extension.steps.js.map
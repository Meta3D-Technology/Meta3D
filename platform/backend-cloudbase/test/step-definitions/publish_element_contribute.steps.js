"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const most_1 = require("most");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const PublishElementContributeService_1 = require("../../src/application_layer/publish/PublishElementContributeService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/publish_element_contribute.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let logFunc, errorFunc, initFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc;
    function _createFuncs(sandbox, errorFuncStub = console.error) {
        logFunc = sandbox.stub();
        errorFunc = errorFuncStub;
        initFunc = sandbox.stub();
        hasDataFunc = sandbox.stub();
        uploadFileFunc = sandbox.stub();
        getDataFunc = sandbox.stub();
        updateDataFunc = sandbox.stub();
    }
    function _publish(username = "u1", packageData = [
        "",
        "",
        "",
        "",
    ], contributeBinaryFile = new ArrayBuffer(0)) {
        return (0, PublishElementContributeService_1.publishElementContribute)([logFunc, errorFunc, initFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc], username, packageData, contributeBinaryFile);
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
            initFunc.returns((0, most_1.just)({}));
        });
        and('make publisher not be registered', () => {
            hasDataFunc.returns((0, most_1.just)(false));
        });
        when('publish', () => {
            return _publish();
        });
        then(/^should error:                 "(.*)"$/, (arg0) => {
            expect(errorFunc.getCall(0).args[1].message).toEqual(arg0);
        });
    });
    test('upload file and add to collection', ({ given, when, then, and }) => {
        let app = { "app": true };
        let username = "meta3d";
        let name = "test1";
        let version = "0.0.2";
        let protocolName = "test1-protocol";
        let protocolVersion = "^0.0.1";
        let binaryFile = new ArrayBuffer(10);
        let fileID1 = "id1";
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            initFunc.returns((0, most_1.just)(app));
            hasDataFunc.returns((0, most_1.just)(true));
            uploadFileFunc.returns((0, most_1.just)({ fileID: fileID1 }));
            getDataFunc.returns((0, PromiseTool_1.resolve)({
                data: [
                    {
                        fileData: []
                    }
                ]
            }));
        });
        when('publish', () => {
            return _publish(username, [
                name,
                version,
                protocolName,
                protocolVersion,
            ], binaryFile);
        });
        then('should upload file', () => {
            expect(uploadFileFunc).toCalledWith([
                app,
                "contributes/test1_0.0.2.arrayBuffer",
                Buffer.from(binaryFile)
            ]);
        });
        and('should add to collection', () => {
            expect(updateDataFunc).toCalledWith([
                app,
                "publishedContributes",
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
    test('if element contribute with the same publisher, version, protocol name exist, throw error', ({ given, when, then, and }) => {
        let app = { "app": true };
        let username = "meta3d";
        let name = "test1";
        let version = "0.0.2";
        let protocolName = "test1-protocol";
        let protocolVersion = "^0.0.1";
        let binaryFile = new ArrayBuffer(10);
        let fileID1 = "id1";
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox, sandbox.stub());
            initFunc.returns((0, most_1.just)(app));
            hasDataFunc.returns((0, most_1.just)(true));
            uploadFileFunc.returns((0, most_1.empty)());
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
        and('publish', () => {
            return _publish(username, [
                name,
                version,
                protocolName,
                protocolVersion,
            ], binaryFile);
        });
        when('publish with the same publisher, version, protocol name', () => {
            return _publish(username, [
                name,
                version,
                protocolName,
                protocolVersion,
            ], binaryFile);
        });
        then('should error', () => {
            expect(errorFunc.getCall(0).args[1].message).toEqual("version: 0.0.2 already exist, please update version");
        });
    });
});

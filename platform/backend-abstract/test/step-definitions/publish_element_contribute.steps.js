"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const most_1 = require("most");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const PublishElementContributeService_1 = require("../../src/application_layer/assemble_space/element_assemble/PublishElementContributeService");
// import { addMarketImplementData, getFileID } from "meta3d-backend-cloudbase";
const BackendService_1 = require("backend-cloudbase/src/application_layer/BackendService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/publish_element_contribute.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let logFunc, errorFunc, uploadFileFunc, getMarketImplementAccountDataFunc, addMarketImplementDataFunc, getFileIDFunc;
    let _createFuncs = (sandbox, errorFuncStub = console.error) => {
        logFunc = sandbox.stub();
        errorFunc = errorFuncStub;
        uploadFileFunc = sandbox.stub();
        getMarketImplementAccountDataFunc = sandbox.stub();
        addMarketImplementDataFunc = sandbox.stub();
        addMarketImplementDataFunc = sandbox.stub();
        getFileIDFunc = BackendService_1.getFileID;
    };
    function _publish(account = "u1", packageData = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    ], contributeBinaryFile = new ArrayBuffer(0)) {
        return (0, PublishElementContributeService_1.publishElementContribute)([logFunc, (message) => {
                errorFunc(message);
                throw new Error(message);
            }, uploadFileFunc,
            getMarketImplementAccountDataFunc,
            addMarketImplementDataFunc, getFileIDFunc], account, packageData, contributeBinaryFile);
    }
    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    };
    test('upload file and add to collection', ({ given, when, then, and }) => {
        let account = "meta3d";
        let name = "test1";
        let version = "0.0.2";
        let protocolName = "test1-protocol";
        let protocolVersion = "^0.0.1";
        let displayName = name;
        let repoLink = "";
        let description = "dp1";
        let binaryFile = new ArrayBuffer(10);
        let fileID1 = "id1";
        // let marketImplementCollectionData = []
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            uploadFileFunc.returns((0, most_1.just)({ fileID: fileID1 }));
            getMarketImplementAccountDataFunc.returns((0, PromiseTool_1.resolve)([]));
            addMarketImplementDataFunc.returns((0, PromiseTool_1.resolve)({}));
        });
        when('publish', () => {
            return _publish(account, [
                name,
                version,
                protocolName,
                protocolVersion,
                displayName,
                repoLink,
                description
            ], binaryFile).drain();
        });
        then('should upload file', () => {
            expect(uploadFileFunc).toCalledWith([
                logFunc,
                "contributes/test1_0.0.2.arrayBuffer",
                binaryFile
            ]);
        });
        and('should add to collection', () => {
            expect(addMarketImplementDataFunc).toCalledWith([
                "publishedcontributes",
                {
                    "key": "meta3d",
                    "protocolName": protocolName, "protocolVersion": protocolVersion,
                    "name": name,
                    "version": version,
                    "displayName": displayName,
                    "repoLink": repoLink,
                    "description": description,
                    "fileID": fileID1
                },
            ]);
        });
    });
    test('if element contribute with the same publisher, name, version exist, throw error', ({ given, when, then, and }) => {
        let account = "meta3d";
        let name = "test1";
        let version = "0.0.2";
        // let protocolName = "test1-protocol"
        // let protocolVersion = "^0.0.1"
        let binaryFile = new ArrayBuffer(10);
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox, sandbox.stub());
            uploadFileFunc.returns((0, most_1.empty)());
            getMarketImplementAccountDataFunc.onCall(0).returns((0, PromiseTool_1.resolve)([]));
            getMarketImplementAccountDataFunc.onCall(1).returns((0, PromiseTool_1.resolve)([
                {
                    name: name,
                    version: version
                }
            ]));
        });
        and('publish', () => {
            return _publish(account, [
                name,
                version,
                "",
                "",
                "",
                "",
                ""
            ], binaryFile).drain();
        });
        when('publish with the same publisher, name, version', () => {
            return _publish(account, [
                name,
                version,
                "",
                "",
                "",
                "",
                ""
            ], binaryFile).drain().catch(e => { });
        });
        then('should error', () => {
            expect(errorFunc.getCall(0).args[0]).toEqual("version: 0.0.2 already exist, please update version");
        });
        and('not upload file', () => {
            expect(uploadFileFunc.callCount).toEqual(1);
        });
    });
});
//# sourceMappingURL=publish_element_contribute.steps.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const PublishElementContributeService_1 = require("../../src/application_layer/assemble_space/element_assemble/PublishElementContributeService");
const meta3d_backend_cloudbase_1 = require("meta3d-backend-cloudbase");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/publish_element_assemble_data.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let logFunc, errorFunc, getShopImplementAccountDataFunc, updateShopImplementDataFunc, getDataFromShopImplementAccountDataFunc, isContainFunc, buildShopImplementAccountDataFunc, addShopImplementDataToDataFromShopImplementCollectionDataFunc, parseShopCollectionDataBodyFunc;
    function _createFuncs(sandbox) {
        logFunc = sandbox.stub();
        errorFunc = sandbox.stub();
        getShopImplementAccountDataFunc = sandbox.stub();
        updateShopImplementDataFunc = sandbox.stub();
        getDataFromShopImplementAccountDataFunc = meta3d_backend_cloudbase_1.getDataFromShopImplementAccountData;
        isContainFunc = meta3d_backend_cloudbase_1.isContain;
        buildShopImplementAccountDataFunc = meta3d_backend_cloudbase_1.buildShopImplementAccountData;
        addShopImplementDataToDataFromShopImplementCollectionDataFunc = meta3d_backend_cloudbase_1.addShopImplementDataToDataFromShopImplementCollectionData;
        parseShopCollectionDataBodyFunc = meta3d_backend_cloudbase_1.parseShopCollectionDataBodyForNodejs;
    }
    function _publish(account = "u1", elementName = "", elementVersion = "", inspectorData = {}) {
        return (0, PublishElementContributeService_1.publishElementAssembleData)([errorFunc, getShopImplementAccountDataFunc, updateShopImplementDataFunc, getDataFromShopImplementAccountDataFunc, isContainFunc, buildShopImplementAccountDataFunc, addShopImplementDataToDataFromShopImplementCollectionDataFunc, parseShopCollectionDataBodyFunc], account, elementName, elementVersion, inspectorData);
    }
    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    }
    test('add to collection', ({ given, when, then, and }) => {
        let account = "meta3d";
        let elementName = "test1";
        let elementVersion = "0.0.2";
        let inspectorData = {
            element: 1,
            uiControls: []
        };
        let shopImplementCollectionData = [];
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getShopImplementAccountDataFunc.returns((0, PromiseTool_1.resolve)([{
                    fileData: []
                }, shopImplementCollectionData]));
        });
        when('publish', () => {
            return _publish(account, elementName, elementVersion, inspectorData).drain();
        });
        and('should add to collection', () => {
            expect(updateShopImplementDataFunc).toCalledWith([
                "publishedelementassembledata",
                "meta3d",
                {
                    "key": "meta3d",
                    "fileData": [{
                            "elementName": elementName, "elementVersion": elementVersion,
                            "inspectorData": inspectorData
                        }]
                },
                shopImplementCollectionData
            ]);
        });
    });
    test('if element assemble data with the same publisher, element name, element version exist, throw error', ({ given, when, then, and }) => {
        let app = { "app": true };
        let account = "meta3d";
        let elementName = "test1";
        let elementVersion = "0.0.2";
        let inspectorData = {
            element: 1,
            uiControls: []
        };
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getShopImplementAccountDataFunc.onCall(0).returns((0, PromiseTool_1.resolve)([
                {
                    fileData: []
                }
            ]));
            getShopImplementAccountDataFunc.onCall(1).returns((0, PromiseTool_1.resolve)([
                {
                    fileData: [
                        {
                            elementName: elementName,
                            elementVersion: elementVersion
                        }
                    ]
                }
            ]));
        });
        and('publish', () => {
            return _publish(account, elementName, elementVersion, inspectorData).drain();
        });
        when('publish with the same publisher, element name, element version', () => {
            return _publish(account, elementName, elementVersion, inspectorData).drain();
        });
        then('should error', () => {
            expect(errorFunc.getCall(0).args[0]).toEqual("version: 0.0.2 already exist, please update version");
        });
    });
});

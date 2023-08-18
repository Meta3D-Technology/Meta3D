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
    let logFunc, errorFunc, getMarketImplementAccountDataFunc, updateMarketImplementDataFunc, getDataFromMarketImplementAccountDataFunc, isContainFunc, buildMarketImplementAccountDataFunc, addMarketImplementDataToDataFromMarketImplementCollectionDataFunc;
    let _createFuncs = (sandbox) => {
        logFunc = sandbox.stub();
        errorFunc = sandbox.stub();
        getMarketImplementAccountDataFunc = sandbox.stub();
        updateMarketImplementDataFunc = sandbox.stub();
        getDataFromMarketImplementAccountDataFunc = meta3d_backend_cloudbase_1.getDataFromMarketImplementAccountData;
        isContainFunc = meta3d_backend_cloudbase_1.isContain;
        buildMarketImplementAccountDataFunc = meta3d_backend_cloudbase_1.buildMarketImplementAccountData;
        addMarketImplementDataToDataFromMarketImplementCollectionDataFunc = meta3d_backend_cloudbase_1.addMarketImplementDataToDataFromMarketImplementCollectionData;
    };
    function _publish(account = "u1", elementName = "", elementVersion = "", inspectorData = {}) {
        return (0, PublishElementContributeService_1.publishElementAssembleData)([errorFunc, getMarketImplementAccountDataFunc, updateMarketImplementDataFunc, getDataFromMarketImplementAccountDataFunc, isContainFunc, buildMarketImplementAccountDataFunc, addMarketImplementDataToDataFromMarketImplementCollectionDataFunc,], account, elementName, elementVersion, inspectorData);
    }
    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    };
    test('add to collection', ({ given, when, then, and }) => {
        let account = "meta3d";
        let elementName = "test1";
        let elementVersion = "0.0.2";
        let inspectorData = {
            element: 1,
            uiControls: []
        };
        let marketImplementCollectionData = [];
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getMarketImplementAccountDataFunc.returns((0, PromiseTool_1.resolve)([{
                    fileData: []
                }, marketImplementCollectionData]));
        });
        when('publish', () => {
            return _publish(account, elementName, elementVersion, inspectorData).drain();
        });
        and('should add to collection', () => {
            expect(updateMarketImplementDataFunc).toCalledWith([
                "publishedelementassembledata",
                "meta3d",
                {
                    "key": "meta3d",
                    "fileData": [{
                            "elementName": elementName, "elementVersion": elementVersion,
                            "inspectorData": inspectorData
                        }]
                },
                marketImplementCollectionData
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
            getMarketImplementAccountDataFunc.onCall(0).returns((0, PromiseTool_1.resolve)([
                {
                    fileData: []
                }
            ]));
            getMarketImplementAccountDataFunc.onCall(1).returns((0, PromiseTool_1.resolve)([
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

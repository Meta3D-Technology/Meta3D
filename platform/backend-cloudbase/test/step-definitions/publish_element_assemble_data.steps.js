"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const PublishElementContributeService_1 = require("../../src/application_layer/assemble_space/element_assemble/PublishElementContributeService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/publish_element_assemble_data.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let errorFunc, getDataFunc, updateDataFunc;
    function _createFuncs(sandbox) {
        errorFunc = sandbox.stub();
        getDataFunc = sandbox.stub();
        updateDataFunc = sandbox.stub();
    }
    function _publish(username = "u1", elementName = "", elementVersion = "", inspectorData = {}) {
        return (0, PublishElementContributeService_1.publishElementAssembleData)([errorFunc, getDataFunc, updateDataFunc], username, elementName, elementVersion, inspectorData);
    }
    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    }
    test('add to collection', ({ given, when, then, and }) => {
        let username = "meta3d";
        let elementName = "test1";
        let elementVersion = "0.0.2";
        let inspectorData = {
            element: 1,
            uiControls: []
        };
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getDataFunc.returns((0, PromiseTool_1.resolve)({
                data: [
                    {
                        fileData: []
                    }
                ]
            }));
        });
        when('publish', () => {
            return _publish(username, elementName, elementVersion, inspectorData).drain();
        });
        and('should add to collection', () => {
            expect(updateDataFunc).toCalledWith([
                "publishedElementAssembleData",
                { "username": "meta3d" },
                {
                    "fileData": [{
                            "elementName": elementName, "elementVersion": elementVersion,
                            "inspectorData": inspectorData
                        }]
                }
            ]);
        });
    });
    test('if element assemble data with the same publisher, element name, element version exist, throw error', ({ given, when, then, and }) => {
        let app = { "app": true };
        let username = "meta3d";
        let elementName = "test1";
        let elementVersion = "0.0.2";
        let inspectorData = {
            element: 1,
            uiControls: []
        };
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
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
                                elementName: elementName,
                                elementVersion: elementVersion
                            }
                        ]
                    }
                ]
            }));
        });
        and('publish', () => {
            return _publish(username, elementName, elementVersion, inspectorData).drain();
        });
        when('publish with the same publisher, element name, element version', () => {
            return _publish(username, elementName, elementVersion, inspectorData).drain();
        });
        then('should error', () => {
            expect(errorFunc.getCall(0).args[0]).toEqual("version: 0.0.2 already exist, please update version");
        });
    });
});

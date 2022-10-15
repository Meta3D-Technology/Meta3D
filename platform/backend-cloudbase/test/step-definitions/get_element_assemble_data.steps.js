"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const GetElementDataService_1 = require("../../src/application_layer/assemble_space/element_assemble/GetElementDataService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/get_element_assemble_data.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let getDataFunc;
    function _createFuncs(sandbox) {
        getDataFunc = sandbox.stub();
    }
    function _getElementAssembleData(username, elementName, elementVersion) {
        return (0, GetElementDataService_1.getElementAssembleData)(getDataFunc, username, elementName, elementVersion);
    }
    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    }
    test('get element assemble data', ({ given, when, then, and }) => {
        let username = "u1";
        let elementName1 = "e1";
        let elementName2 = "e2";
        let elementVersion1 = "0.0.1";
        let elementVersion2 = "0.1.0";
        let inspectorData1 = { i: 1 };
        let inspectorData2 = { i: 2 };
        let fileData1 = {
            "elementName": elementName1, "elementVersion": elementVersion1,
            "inspectorData": inspectorData1
        };
        let fileData2 = {
            "elementName": elementName2, "elementVersion": elementVersion2,
            "inspectorData": inspectorData2
        };
        let data;
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getDataFunc.returns((0, PromiseTool_1.resolve)({
                data: [
                    {
                        fileData: [
                            fileData1,
                            fileData2
                        ]
                    }
                ]
            }));
        });
        and('user u1 publish element assemble data e1', () => {
        });
        and('user u1 publish element assemble data e2', () => {
        });
        when('get element assemble data e2', () => {
            return _getElementAssembleData(username, elementName2, elementVersion2).observe(result => {
                data = result;
            });
        });
        then('should return e2', () => {
            expect(getDataFunc).toCalledWith([
                "publishedElementAssembleData",
                {
                    username: username
                },
            ]);
            expect(data).toEqual(fileData2);
        });
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const most_1 = require("most");
const Publish_1 = require("../../src/Publish");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const CloudbaseService_1 = require("meta3d-tool-utils/src/publish/CloudbaseService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/publish_contribute_protocol_config.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasAccountFunc, getMarketProtocolCollectionFunc, isContainFunc, addDataToMarketProtocolCollectionFunc, addMarketProtocolDataToDataFromMarketProtocolCollectionDataFunc, getDataFromMarketProtocolCollectionFunc, parseMarketCollectionDataBodyFunc;
    function _createFuncs(sandbox, errorFuncStub = console.error) {
        readFileSyncFunc = sandbox.stub();
        logFunc = sandbox.stub();
        errorFunc = errorFuncStub;
        readJsonFunc = sandbox.stub();
        initFunc = sandbox.stub();
        hasAccountFunc = sandbox.stub();
        getMarketProtocolCollectionFunc = sandbox.stub();
        isContainFunc = CloudbaseService_1.isContain;
        addDataToMarketProtocolCollectionFunc = sandbox.stub();
        addMarketProtocolDataToDataFromMarketProtocolCollectionDataFunc = CloudbaseService_1.addMarketProtocolDataToDataFromMarketProtocolCollectionData;
        getDataFromMarketProtocolCollectionFunc = CloudbaseService_1.getDataFromMarketProtocolCollection;
        parseMarketCollectionDataBodyFunc = CloudbaseService_1.parseMarketCollectionDataBodyForNodejs;
    }
    function _buildPackageJson(name = "test1-protocol", version = "0.0.1", account = "0xf60") {
        return { name, version, publisher: account };
    }
    function _publishContributeProtocolConfig(packageFilePath = "", distFilePath = "main.js") {
        return (0, Publish_1.publishConfig)([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasAccountFunc, getMarketProtocolCollectionFunc, isContainFunc, addDataToMarketProtocolCollectionFunc, addMarketProtocolDataToDataFromMarketProtocolCollectionDataFunc, getDataFromMarketProtocolCollectionFunc, parseMarketCollectionDataBodyFunc], packageFilePath, distFilePath, "contribute");
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
        when('publish contribute protocol config', () => {
            return _publishContributeProtocolConfig();
        });
        then(/^should error: "(.*)"$/, (arg0) => {
            expect(errorFunc.getCall(0).args[1].message).toEqual(arg0);
        });
    });
    test('add to collection', ({ given, when, then, and }) => {
        let app = {};
        let distFileContent = "config content";
        let collectionData = {
            data: []
        };
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            readJsonFunc.returns((0, most_1.just)(_buildPackageJson("test1-protocol", "0.0.2", "meta3d")));
            initFunc.returns((0, most_1.just)(app));
            hasAccountFunc.returns((0, most_1.just)(true));
            readFileSyncFunc.returns(distFileContent);
            getMarketProtocolCollectionFunc.returns((0, PromiseTool_1.resolve)(collectionData));
        });
        when('publish contribute protocol config', () => {
            return _publishContributeProtocolConfig();
        });
        then('should add to collection', () => {
            expect(addDataToMarketProtocolCollectionFunc).toCalledWith([
                app,
                addMarketProtocolDataToDataFromMarketProtocolCollectionDataFunc,
                "publishedcontributeprotocolconfigs",
                "publishedcontributeprotocolconfigs",
                getDataFromMarketProtocolCollectionFunc(collectionData),
                {
                    "name": "test1-protocol",
                    "version": "0.0.2",
                    "account": "meta3d",
                    "configStr": distFileContent
                }
            ]);
        });
    });
    test('if contribute protocol config exist, throw error', ({ given, and, when, then }) => {
        let app = {};
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox, sandbox.stub());
            readJsonFunc.returns((0, most_1.just)(_buildPackageJson("test1-protocol", "0.0.2", "meta3d")));
            initFunc.returns((0, most_1.just)(app));
            hasAccountFunc.returns((0, most_1.just)(true));
            getMarketProtocolCollectionFunc.onCall(0).returns((0, PromiseTool_1.resolve)({
                data: []
            }));
            getMarketProtocolCollectionFunc.onCall(1).returns((0, PromiseTool_1.resolve)({
                data: [
                    {
                        name: "test1-protocol",
                        version: "0.0.2",
                        account: "meta3d"
                    }
                ]
            }));
        });
        and('publish contribute protocol config', () => {
            return _publishContributeProtocolConfig();
        });
        when('publish contribute protocol config with same name and version', () => {
            return _publishContributeProtocolConfig();
        });
        then('should error', () => {
            expect(errorFunc.getCall(0).args[1].message).toEqual("version: 0.0.2 already exist, please update version");
        });
    });
});
//# sourceMappingURL=publish_contribute_protocol_config.steps.js.map
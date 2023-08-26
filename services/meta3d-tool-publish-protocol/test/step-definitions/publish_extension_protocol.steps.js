"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const most_1 = require("most");
const Publish_1 = require("../../src/Publish");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const CloudbaseService_1 = require("meta3d-tool-utils/src/publish/CloudbaseService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/publish_extension_protocol.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasAccountFunc, getMarketProtocolCollectionFunc, isContainFunc, addDataToMarketProtocolCollectionFunc, addMarketProtocolDataToDataFromMarketProtocolCollectionDataFunc, getDataFromMarketProtocolCollectionFunc, parseMarketCollectionDataBodyFunc;
    let _createFuncs = (sandbox, errorFuncStub = console.error) => {
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
    };
    function _buildPackageJson(name = "test1-protocol", version = "0.0.1", account = "0xf60", displayName = "d1", repoLink = "", description = "dp1") {
        return {
            name, version, publisher: account,
            displayName, repoLink, description
        };
    }
    let _publishExtensionProtocol = (packageFilePath = "", iconPath = "a.png") => {
        return (0, Publish_1.publish)([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasAccountFunc, getMarketProtocolCollectionFunc, isContainFunc, addDataToMarketProtocolCollectionFunc, addMarketProtocolDataToDataFromMarketProtocolCollectionDataFunc, getDataFromMarketProtocolCollectionFunc, parseMarketCollectionDataBodyFunc], packageFilePath, iconPath, "extension");
    };
    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    };
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
        when('publish extension protocol', () => {
            return _publishExtensionProtocol();
        });
        then(/^should error: "(.*)"$/, (arg0) => {
            expect(errorFunc.getCall(0).args[1].message).toEqual(arg0);
        });
    });
    test('add to collection', ({ given, when, then, and }) => {
        let app = {};
        let iconContent = "v91";
        let collectionData = {
            data: []
        };
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            readJsonFunc.returns((0, most_1.just)(_buildPackageJson("test1-protocol", "0.0.2", "meta3d", "d1", "l1", "dp1")));
            initFunc.returns((0, most_1.just)(app));
            hasAccountFunc.returns((0, most_1.just)(true));
            readFileSyncFunc.returns(iconContent);
            getMarketProtocolCollectionFunc.returns((0, PromiseTool_1.resolve)(collectionData));
        });
        when('publish extension protocol', () => {
            return _publishExtensionProtocol();
        });
        then('should add to collection', () => {
            expect(addDataToMarketProtocolCollectionFunc).toCalledWith([
                app,
                addMarketProtocolDataToDataFromMarketProtocolCollectionDataFunc,
                "publishedextensionprotocols",
                "publishedextensionprotocols",
                getDataFromMarketProtocolCollectionFunc(collectionData),
                {
                    "name": "test1-protocol",
                    "version": "0.0.2",
                    "account": "meta3d",
                    "iconBase64": "data:image/png;base64, " + iconContent,
                    "displayName": "d1",
                    "repoLink": "l1",
                    "description": "dp1",
                }
            ]);
        });
    });
    test('handle nullable package json fields', ({ given, when, then, and }) => {
        let app = {};
        let iconContent = "v91";
        let collectionData = {
            data: []
        };
        _prepare(given);
        given('prepare funcs that package json not has displayName, repoLink, description', () => {
            _createFuncs(sandbox);
            readJsonFunc.returns((0, most_1.just)({
                name: "test1-protocol", version: "0.0.2",
                publisher: "meta3d"
            }));
            initFunc.returns((0, most_1.just)(app));
            hasAccountFunc.returns((0, most_1.just)(true));
            readFileSyncFunc.returns(iconContent);
            getMarketProtocolCollectionFunc.returns((0, PromiseTool_1.resolve)(collectionData));
        });
        when('publish extension protocol', () => {
            return _publishExtensionProtocol();
        });
        then('should use default value', () => {
            expect(addDataToMarketProtocolCollectionFunc).toCalledWith([
                app,
                addMarketProtocolDataToDataFromMarketProtocolCollectionDataFunc,
                "publishedextensionprotocols",
                "publishedextensionprotocols",
                getDataFromMarketProtocolCollectionFunc(collectionData),
                {
                    "name": "test1-protocol",
                    "version": "0.0.2",
                    "account": "meta3d",
                    "iconBase64": "data:image/png;base64, " + iconContent,
                    "displayName": "test1-protocol",
                    "repoLink": "",
                    "description": "",
                }
            ]);
        });
    });
    // test('update icon base64 in collection if exist', ({ given, and, when, then }) => {
    //     let app = {}
    //     let iconContent1 = "i1"
    //     let iconContent2 = "i2"
    //     _prepare(given)
    //     given('prepare funcs', () => {
    //         _createFuncs(sandbox)
    //         readJsonFunc.returns(
    //             just(_buildPackageJson(
    //                 "test1-protocol",
    //                 "0.0.2",
    //                 "meta3d"
    //             ))
    //         )
    //         initFunc.returns(
    //             just(app)
    //         )
    //         hasAccountFunc.returns(
    //             just(true)
    //         )
    //         readFileSyncFunc.onCall(0).returns(iconContent1)
    //         readFileSyncFunc.onCall(1).returns(iconContent2)
    //         getMarketProtocolCollectionFunc.onCall(0).returns(
    //             resolve({
    //                 data: []
    //             })
    //         )
    //         getMarketProtocolCollectionFunc.onCall(1).returns(
    //             resolve({
    //                 data: [
    //                     {
    //                         name: "test1-protocol",
    //                         version: "0.0.2",
    //                         account: "meta3d"
    //                     }
    //                 ]
    //             })
    //         )
    //     });
    //     and('publish extension protocol', () => {
    //         return _publishExtensionProtocol()
    //     });
    //     when('publish extension protocol with same name and version but different icon', () => {
    //         return _publishExtensionProtocol()
    //     });
    //     then('should update icon base64 in collection', () => {
    //         expect(addDataToMarketProtocolCollectionFunc.getCall(1)).toCalledWith([
    //             app,
    //             "publishedextensionprotocols",
    //             {
    //                 "protocols": [{
    //                     "name": "test1-protocol",
    //                     "version": "0.0.2",
    //                     "account": "meta3d",
    //                     "iconBase64": "data:image/png;base64, " + iconContent2
    //                 }]
    //             }
    //         ])
    //     });
    // });
    test('if extension protocol exist, throw error', ({ given, and, when, then }) => {
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
        and('publish extension protocol', () => {
            return _publishExtensionProtocol();
        });
        when('publish extension protocol with same name and version', () => {
            return _publishExtensionProtocol();
        });
        then('should error', () => {
            expect(errorFunc.getCall(0).args[1].message).toEqual("version: 0.0.2 already exist, please update version");
        });
    });
    test('icon\'s format should be png', ({ given, and, when, then }) => {
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox, sandbox.stub());
            readJsonFunc.returns((0, most_1.just)(_buildPackageJson()));
            initFunc.returns((0, most_1.just)({}));
            hasAccountFunc.returns((0, most_1.just)(true));
        });
        when('publish extension protocol with jpeg icon', () => {
            return _publishExtensionProtocol("", "a.jpeg");
        });
        then(/^should error: "(.*)"$/, (arg0) => {
            expect(errorFunc.getCall(0).args[1].message).toEqual(arg0);
        });
    });
});
//# sourceMappingURL=publish_extension_protocol.steps.js.map
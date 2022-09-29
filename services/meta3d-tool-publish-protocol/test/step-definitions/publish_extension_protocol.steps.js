"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const most_1 = require("most");
const Publish_1 = require("../../src/Publish");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/publish_extension_protocol.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasDataFunc, getCollectionFunc, addDataFunc;
    function _createFuncs(sandbox, errorFuncStub = console.error) {
        readFileSyncFunc = sandbox.stub();
        logFunc = sandbox.stub();
        errorFunc = errorFuncStub;
        readJsonFunc = sandbox.stub();
        initFunc = sandbox.stub();
        hasDataFunc = sandbox.stub();
        getCollectionFunc = sandbox.stub();
        addDataFunc = sandbox.stub();
    }
    function _buildPackageJson(name = "test1-protocol", version = "0.0.1", username = "meta3d") {
        return { name, version, publisher: username };
    }
    function _publishExtensionProtocol(packageFilePath = "", iconPath = "a.png") {
        return (0, Publish_1.publish)([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasDataFunc, getCollectionFunc, addDataFunc], packageFilePath, iconPath, "extension");
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
        when('publish extension protocol', () => {
            return _publishExtensionProtocol();
        });
        then(/^should error:                 "(.*)"$/, (arg0) => {
            expect(errorFunc.getCall(0).args[1].message).toEqual(arg0);
        });
    });
    test('add to collection', ({ given, when, then, and }) => {
        let app = {};
        let iconContent = "v91";
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            readJsonFunc.returns((0, most_1.just)(_buildPackageJson("test1-protocol", "0.0.2", "meta3d")));
            initFunc.returns((0, most_1.just)(app));
            hasDataFunc.returns((0, most_1.just)(true));
            readFileSyncFunc.returns(iconContent);
            getCollectionFunc.returns((0, PromiseTool_1.resolve)({
                data: []
            }));
        });
        when('publish extension protocol', () => {
            return _publishExtensionProtocol();
        });
        then('should add to collection', () => {
            expect(addDataFunc).toCalledWith([
                app,
                "publishedExtensionProtocols",
                {
                    "name": "test1-protocol",
                    "version": "0.0.2",
                    "username": "meta3d",
                    "iconBase64": "data:image/png;base64, " + iconContent
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
    //         hasDataFunc.returns(
    //             just(true)
    //         )
    //         readFileSyncFunc.onCall(0).returns(iconContent1)
    //         readFileSyncFunc.onCall(1).returns(iconContent2)
    //         getCollectionFunc.onCall(0).returns(
    //             resolve({
    //                 data: []
    //             })
    //         )
    //         getCollectionFunc.onCall(1).returns(
    //             resolve({
    //                 data: [
    //                     {
    //                         name: "test1-protocol",
    //                         version: "0.0.2",
    //                         username: "meta3d"
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
    //         expect(addDataFunc.getCall(1)).toCalledWith([
    //             app,
    //             "publishedExtensionProtocols",
    //             {
    //                 "protocols": [{
    //                     "name": "test1-protocol",
    //                     "version": "0.0.2",
    //                     "username": "meta3d",
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
            hasDataFunc.returns((0, most_1.just)(true));
            getCollectionFunc.onCall(0).returns((0, PromiseTool_1.resolve)({
                data: []
            }));
            getCollectionFunc.onCall(1).returns((0, PromiseTool_1.resolve)({
                data: [
                    {
                        name: "test1-protocol",
                        version: "0.0.2",
                        username: "meta3d"
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
            hasDataFunc.returns((0, most_1.just)(true));
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
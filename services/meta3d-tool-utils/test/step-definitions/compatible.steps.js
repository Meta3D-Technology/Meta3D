"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const CompatibleService_1 = require("../../src/publish/compatible/CompatibleService");
const meta3d_backend_cloudbase_1 = require("meta3d-backend-cloudbase");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/compatible.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let app = 1;
    let getCollectionCountFunc, getCollectionFunc, parseMarketCollectionDataBodyForNodejsFunc, updateDataFunc;
    let _createFuncs = (sandbox) => {
        getCollectionCountFunc = sandbox.stub();
        getCollectionFunc = sandbox.stub();
        parseMarketCollectionDataBodyForNodejsFunc = meta3d_backend_cloudbase_1.parseMarketCollectionDataBodyForNodejs;
        updateDataFunc = sandbox.stub();
    };
    let _updateAllDatabaseData = (mapFunc, collectionName) => {
        return (0, CompatibleService_1.updateAllDatabaseData)([
            getCollectionCountFunc,
            getCollectionFunc,
            parseMarketCollectionDataBodyForNodejsFunc,
            meta3d_backend_cloudbase_1.mapMarketImplementCollection,
            meta3d_backend_cloudbase_1.getKey,
            mapFunc,
            updateDataFunc,
        ], app, collectionName);
    };
    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    };
    test('update all data', ({ given, when, then, and }) => {
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getCollectionCountFunc.returns((0, PromiseTool_1.resolve)(2));
            getCollectionFunc.returns((0, PromiseTool_1.resolve)({
                data: [
                    {
                        key: "user1",
                    },
                    {
                        key: "user2",
                    }
                ]
            }));
            updateDataFunc.returns((0, PromiseTool_1.resolve)(1));
        });
        and('add user1', () => {
        });
        and('add user2', () => {
        });
        when('update all users\' old data to new data', () => {
            return _updateAllDatabaseData((oldData) => {
                return Object.assign(Object.assign({}, oldData), { Mbi: 0 });
            }, "user").drain();
        });
        then('should update all users\' data', () => {
            expect(updateDataFunc.getCall(0)).toCalledWith([
                app,
                "user",
                "user1",
                {
                    key: "user1",
                    Mbi: 0
                }
            ]);
            expect(updateDataFunc.getCall(1)).toCalledWith([
                app,
                "user",
                "user2",
                {
                    key: "user2",
                    Mbi: 0
                }
            ]);
        });
    });
});
//# sourceMappingURL=compatible.steps.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const CompatibleService_1 = require("../../src/publish/compatible/CompatibleService");
const meta3d_backend_cloudbase_1 = require("meta3d-backend-cloudbase");
const most_1 = require("most");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/compatible.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let app = 1;
    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    };
    test('update all table data', ({ given, when, then, and }) => {
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
    test('update all storage data', ({ given, when, then, and }) => {
        let appName1 = "an1";
        let account1 = "ac1";
        let fileID1 = "id1";
        let file1 = {};
        let file2 = { a: 1 };
        let getCollectionCountFunc, getCollectionFunc, parseMarketCollectionDataBodyForNodejsFunc, downloadFileFunc, uploadFileFunc;
        let _createFuncs = (sandbox) => {
            getCollectionCountFunc = sandbox.stub();
            getCollectionFunc = sandbox.stub();
            parseMarketCollectionDataBodyForNodejsFunc = meta3d_backend_cloudbase_1.parseMarketCollectionDataBodyForNodejs;
            downloadFileFunc = sandbox.stub();
            uploadFileFunc = sandbox.stub();
        };
        let _updateAllStorageData = ([mapFunc, buildFilePathFunc], collectionName) => {
            return (0, CompatibleService_1.updateAllStorageData)([
                getCollectionCountFunc,
                getCollectionFunc,
                parseMarketCollectionDataBodyForNodejsFunc,
                meta3d_backend_cloudbase_1.mapMarketImplementCollection,
                downloadFileFunc,
                mapFunc,
                uploadFileFunc,
                buildFilePathFunc
            ], app, collectionName);
        };
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getCollectionCountFunc.returns((0, PromiseTool_1.resolve)(1));
            getCollectionFunc.returns((0, PromiseTool_1.resolve)({
                data: [
                    {
                        appName: appName1,
                        account: account1,
                        fileID: fileID1,
                    }
                ]
            }));
            downloadFileFunc.returns((0, most_1.just)(file1));
            uploadFileFunc.returns((0, most_1.empty)());
        });
        and('add app1', () => {
        });
        and('upload app1\'s file', () => {
        });
        when('update all app\' old file to new file', () => {
            return _updateAllStorageData([
                (oldFile) => {
                    return file2;
                },
                (data) => {
                    return "apps/" + data.account + "_" + data.appName;
                },
            ], "publishedapps").drain();
        });
        then('should update all app storages\' file', () => {
            expect(downloadFileFunc).toCalledWith([
                app,
                sinon_1.match.any,
                fileID1, true
            ]);
            expect(uploadFileFunc).toCalledWith([
                app,
                "apps/" + account1 + "_" + appName1,
                file2
            ]);
        });
    });
});
//# sourceMappingURL=compatible.steps.js.map
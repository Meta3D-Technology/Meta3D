"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const most_1 = require("most");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("../../../../services/meta3d-tool-utils/src/publish/PromiseTool");
const MarketService_1 = require("../../src/application_layer/market/MarketService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/find_publish_extension.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let getMarketImplementFunc, downloadFileFunc;
    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    };
    let _createFuncs = (sandbox) => {
        getMarketImplementFunc = sandbox.stub();
        downloadFileFunc = sandbox.stub();
    };
    test('if not find, return empty', ({ given, and, when, then }) => {
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getMarketImplementFunc.returns((0, PromiseTool_1.resolve)(null));
        });
        when('find the published extension', () => {
        });
        then('should return empty', () => {
            return (0, MarketService_1.findPublishImplement)([getMarketImplementFunc, downloadFileFunc], "", 10, 0, "", "", "").observe(result => {
                expect(result).toBeNull();
            });
        });
    });
    test('if find, return published extension file', ({ given, and, when, then }) => {
        let extensionBinaryFile = new ArrayBuffer(10);
        let collectionName = "c1";
        let account = "1";
        let name = "n1";
        let version = "0.0.1";
        let fileID = "id1";
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getMarketImplementFunc.returns((0, PromiseTool_1.resolve)({
                fileID: fileID
            }));
            downloadFileFunc.returns((0, most_1.just)(extensionBinaryFile));
        });
        and('publish extension1', () => {
        });
        when('find the published extension', () => {
        });
        then('should get with limitCount and skipCount', () => {
        });
        and('should return the extension file', () => {
            let limitCount = 10;
            let skipCount = 1;
            return (0, MarketService_1.findPublishImplement)([getMarketImplementFunc, downloadFileFunc], collectionName, limitCount, skipCount, account, name, version).observe(result => {
                expect(getMarketImplementFunc).toCalledWith([
                    collectionName,
                    limitCount,
                    skipCount,
                    account, name, version
                ]);
                expect(downloadFileFunc).toCalledWith([
                    fileID
                ]);
                expect(result).toEqual(extensionBinaryFile);
            });
        });
    });
});

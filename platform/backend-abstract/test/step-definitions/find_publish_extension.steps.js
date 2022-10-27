"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const most_1 = require("most");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("../../../../services/meta3d-tool-utils/src/publish/PromiseTool");
const ShopService_1 = require("../../src/application_layer/shop/ShopService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/find_publish_extension.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let getShopImplementFunc, downloadFileFunc;
    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    }
    function _createFuncs(sandbox) {
        getShopImplementFunc = sandbox.stub();
        downloadFileFunc = sandbox.stub();
    }
    test('if not find, return empty', ({ given, and, when, then }) => {
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getShopImplementFunc.returns((0, PromiseTool_1.resolve)(null));
        });
        when('find the published extension', () => {
        });
        then('should return empty', () => {
            return (0, ShopService_1.findPublishImplement)([getShopImplementFunc, downloadFileFunc], "", "", "", "").observe(result => {
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
            getShopImplementFunc.returns((0, PromiseTool_1.resolve)({
                fileID: fileID
            }));
            downloadFileFunc.returns((0, most_1.just)(extensionBinaryFile));
        });
        and('publish extension1', () => {
        });
        when('find the published extension', () => {
        });
        then('should return the extension file', () => {
            return (0, ShopService_1.findPublishImplement)([getShopImplementFunc, downloadFileFunc], collectionName, account, name, version).observe(result => {
                expect(getShopImplementFunc).toCalledWith([
                    collectionName, account, name, version
                ]);
                expect(downloadFileFunc).toCalledWith([
                    fileID
                ]);
                expect(result).toEqual(extensionBinaryFile);
            });
        });
    });
});

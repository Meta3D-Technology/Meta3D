"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const most_1 = require("most");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("../../../../services/meta3d-tool-utils/src/publish/PromiseTool");
const PublishPackageService_1 = require("../../src/application_layer/publish/PublishPackageService");
// import { getFileID } from "meta3d-backend-cloudbase";
const PackageShopService_1 = require("../../src/application_layer/shop/PackageShopService");
// import { buildKey } from "../tool/PublishPackageTool"
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/find_publish_package.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    // let onUploadProgressFunc, updateDataFunc, uploadFileFunc, hasDataFunc, addDataFunc, getFileIDFunc
    let getDataByKeyContainFunc, downloadFileFunc;
    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    }
    function _createFuncsForFindPublishPackage(sandbox) {
        getDataByKeyContainFunc = sandbox.stub();
        downloadFileFunc = sandbox.stub();
    }
    test('if not find, findPublishPackage return empty', ({ given, and, when, then }) => {
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncsForFindPublishPackage(sandbox);
            getDataByKeyContainFunc.returns((0, PromiseTool_1.resolve)([]));
        });
        when('find the published package', () => {
        });
        then('should return empty', () => {
            return (0, PackageShopService_1.findPublishPackage)([getDataByKeyContainFunc, downloadFileFunc], "", "", "").observe(result => {
                expect(result).toBeNull();
            });
        });
    });
    test('if find, findPublishPackage return published package file', ({ given, and, when, then }) => {
        let packageBinaryFile, packageName, packageVersion, account;
        let fileID = "id1";
        _prepare(given);
        given('generate a package', () => {
            packageBinaryFile = new ArrayBuffer(10);
            packageName = "package1";
            packageVersion = "0.0.1";
            account = "account1";
        });
        and('prepare funcs', () => {
            _createFuncsForFindPublishPackage(sandbox);
            getDataByKeyContainFunc.returns((0, PromiseTool_1.resolve)([
                {
                    fileID: fileID
                }
            ]));
            downloadFileFunc.returns((0, most_1.just)(packageBinaryFile));
        });
        and('publish the package', () => {
        });
        when('find the published package', () => {
        });
        then('should return the package file', () => {
            return (0, PackageShopService_1.findPublishPackage)([getDataByKeyContainFunc, downloadFileFunc], account, packageName, packageVersion).observe(result => {
                expect(getDataByKeyContainFunc).toCalledWith([
                    "publishedpackages",
                    (0, PublishPackageService_1.buildPartialKeyByPackageData)(packageName, packageVersion, account)
                ]);
                expect(downloadFileFunc).toCalledWith([
                    fileID
                ]);
                expect(result).toEqual(packageBinaryFile);
            });
        });
    });
});

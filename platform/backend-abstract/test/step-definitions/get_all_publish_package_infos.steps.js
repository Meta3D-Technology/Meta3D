"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
// import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
const PackageMarketService_1 = require("../../src/application_layer/market/PackageMarketService");
const most_1 = require("most");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/get_all_publish_package_infos.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let getDataByKeyContainFunc;
    let _createFuncs = (sandbox) => {
        getDataByKeyContainFunc = sandbox.stub();
    };
    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    };
    test('get all publish pacakge infos', ({ given, when, then, and }) => {
        let fileID1, packageName1, packageVersion1, entryExtensionProtocolName1, entryExtensionProtocolVersion1, entryExtensionProtocolIconBase641, entryExtensionName1, description1, account1;
        let fileID2, packageName2, packageVersion2, entryExtensionProtocolName2, entryExtensionProtocolVersion2, entryExtensionProtocolIconBase642, entryExtensionName2, description2, account2;
        _prepare(given);
        given('publish pacakge1 with entry extension protocol1', () => {
            packageName1 = "p1";
            packageVersion1 = "0.0.1";
            fileID1 = "f1";
            entryExtensionProtocolName1 = "ep1";
            entryExtensionProtocolVersion1 = "0.0.1";
            entryExtensionProtocolIconBase641 = "epi1";
            entryExtensionName1 = "e1";
            description1 = "dp1";
            account1 = "account1";
        });
        and('publish pacakge2 with entry extension protocol2', () => {
            packageName2 = "p2";
            packageVersion2 = "0.0.2";
            fileID2 = "f2";
            entryExtensionProtocolName2 = "ep2";
            entryExtensionProtocolVersion2 = "0.0.2";
            entryExtensionProtocolIconBase642 = "epi2";
            entryExtensionName2 = "e2";
            description2 = "dp2";
            account2 = "account2";
        });
        and('prepare funcs', () => {
            _createFuncs(sandbox);
            getDataByKeyContainFunc.withArgs("publishedpackages", [
                entryExtensionProtocolName1,
                entryExtensionProtocolVersion1
            ]).returns((0, most_1.just)([
                {
                    packageName: packageName1,
                    packageVersion: packageVersion1,
                    fileID: fileID1,
                    account: account1,
                    entryExtensionProtocolName: entryExtensionProtocolName1,
                    entryExtensionProtocolVersion: entryExtensionProtocolVersion1,
                    entryExtensionProtocolIconBase64: entryExtensionProtocolIconBase641,
                    entryExtensionName: entryExtensionName1,
                    description: description1
                }
            ]));
            getDataByKeyContainFunc.withArgs("publishedpackages", sinon_1.match.number, sinon_1.match.number, [
                entryExtensionProtocolName2,
                entryExtensionProtocolVersion2
            ]).returns((0, most_1.just)([
                {
                    packageName: packageName2,
                    packageVersion: packageVersion2,
                    fileID: fileID2,
                    account: account2,
                    entryExtensionProtocolName: entryExtensionProtocolName2,
                    entryExtensionProtocolVersion: entryExtensionProtocolVersion2,
                    entryExtensionProtocolIconBase64: entryExtensionProtocolIconBase642,
                    entryExtensionName: entryExtensionName2,
                    description: description2
                }
            ]));
        });
        when('get all publish pacakge infos of entry extension protocol2', () => {
        });
        then('should return package2 info', () => {
            return (0, PackageMarketService_1.getAllPublishPackageInfos)(getDataByKeyContainFunc, 2, 0, entryExtensionProtocolName2, entryExtensionProtocolVersion2).observe(result => {
                expect(getDataByKeyContainFunc).toCalledWith([
                    sinon_1.match.string,
                    2,
                    0,
                    sinon_1.match.any
                ]);
                expect(result).toEqual([
                    {
                        account: account2,
                        name: packageName2,
                        version: packageVersion2,
                        entryExtensionProtocolName: entryExtensionProtocolName2,
                        entryExtensionProtocolVersion: entryExtensionProtocolVersion2,
                        entryExtensionProtocolIconBase64: entryExtensionProtocolIconBase642,
                        entryExtensionName: entryExtensionName2,
                        description: description2,
                        id: fileID2
                    }
                ]);
            });
        });
    });
});

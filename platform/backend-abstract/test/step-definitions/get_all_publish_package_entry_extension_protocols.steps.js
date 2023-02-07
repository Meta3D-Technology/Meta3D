"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const PackageMarketService_1 = require("../../src/application_layer/market/PackageMarketService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/get_all_publish_package_entry_extension_protocols.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let getDataFunc;
    function _createFuncs(sandbox) {
        getDataFunc = sandbox.stub();
    }
    // function _getAllPublishExtensionProtocols() {
    //     return getAllPublishProtocolData(
    //         [getMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc],
    //         "publishedextensionprotocols"
    //     )
    // }
    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    }
    test('get all publish pacakge entry extension protocols', ({ given, when, then, and }) => {
        let entryExtensionProtocolName1, entryExtensionProtocolVersion1, entryExtensionProtocolIconBase641, account1;
        let entryExtensionProtocolName2, entryExtensionProtocolVersion2, entryExtensionProtocolIconBase642, account2;
        // let allPublishExtensionProtocols = [
        //     {
        //         name: "a1-protocol",
        //         account: "meta3d",
        //         version: "0.0.1",
        //         iconBase64: "b1"
        //     },
        //     {
        //         name: "a2-protocol",
        //         account: "user1",
        //         version: "0.0.2",
        //         iconBase64: "b2"
        //     },
        // ]
        _prepare(given);
        given('publish pacakge1 with entry extension protocol1 and account1', () => {
            entryExtensionProtocolName1 = "ep1";
            entryExtensionProtocolVersion1 = "0.0.1";
            entryExtensionProtocolIconBase641 = "epi1";
            account1 = "account1";
        });
        and('publish pacakge2 with entry extension protocol1 and account1', () => {
        });
        and('publish pacakge3 with entry extension protocol2 and account2', () => {
            entryExtensionProtocolName2 = "ep2";
            entryExtensionProtocolVersion2 = "0.0.2";
            entryExtensionProtocolIconBase642 = "epi2";
            account2 = "account2";
        });
        and('prepare funcs', () => {
            _createFuncs(sandbox);
            getDataFunc.withArgs("publishedpackages").returns((0, PromiseTool_1.resolve)([
                {
                    account: account1,
                    entryExtensionProtocolName: entryExtensionProtocolName1,
                    entryExtensionProtocolVersion: entryExtensionProtocolVersion1,
                    entryExtensionProtocolIconBase64: entryExtensionProtocolIconBase641,
                },
                {
                    account: account1,
                    entryExtensionProtocolName: entryExtensionProtocolName1,
                    entryExtensionProtocolVersion: entryExtensionProtocolVersion1,
                    entryExtensionProtocolIconBase64: entryExtensionProtocolIconBase641,
                },
                {
                    account: account2,
                    entryExtensionProtocolName: entryExtensionProtocolName2,
                    entryExtensionProtocolVersion: entryExtensionProtocolVersion2,
                    entryExtensionProtocolIconBase64: entryExtensionProtocolIconBase642,
                }
            ]));
        });
        when('get all publish pacakge entry extension protocols', () => {
        });
        then('should return entry extension protocol1 and entry extension protocol2 that are not duplicate', () => {
            return (0, PackageMarketService_1.getAllPublishPackageEntryExtensionProtocols)(getDataFunc).observe(result => {
                expect(result).toEqual([
                    {
                        account: account1,
                        name: entryExtensionProtocolName1,
                        version: entryExtensionProtocolVersion1,
                        iconBase64: entryExtensionProtocolIconBase641,
                    },
                    {
                        account: account2,
                        name: entryExtensionProtocolName2,
                        version: entryExtensionProtocolVersion2,
                        iconBase64: entryExtensionProtocolIconBase642,
                    }
                ]);
            });
        });
    });
});

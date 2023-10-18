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
    let _createFuncs = (sandbox) => {
        getDataFunc = sandbox.stub();
    };
    // function _getAllPublishExtensionProtocols() {
    //     return getAllPublishProtocolData(
    //         [getMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc],
    //         "publishedextensionprotocols"
    //     )
    // }
    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    };
    test('get all publish pacakge entry extension protocols', ({ given, when, then, and }) => {
        let entryExtensionProtocolName1, entryExtensionProtocolVersion1, entryExtensionProtocolIconBase641, entryExtensionProtocolDisplayName1, entryExtensionProtocolRepoLink1, entryExtensionProtocolDescription1, account1;
        let entryExtensionProtocolName2, entryExtensionProtocolVersion2, entryExtensionProtocolIconBase642, entryExtensionProtocolDisplayName2, entryExtensionProtocolRepoLink2, entryExtensionProtocolDescription2, account2;
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
            entryExtensionProtocolDisplayName1 = "epd1";
            entryExtensionProtocolRepoLink1 = "epl1";
            entryExtensionProtocolDescription1 = "epdp1";
            account1 = "account1";
        });
        and('publish pacakge2 with entry extension protocol1 and account1', () => {
        });
        and('publish pacakge3 with entry extension protocol2 and account2', () => {
            entryExtensionProtocolName2 = "ep2";
            entryExtensionProtocolVersion2 = "0.0.2";
            entryExtensionProtocolIconBase642 = "epi2";
            entryExtensionProtocolDisplayName2 = "epd2";
            entryExtensionProtocolRepoLink2 = "epl2";
            entryExtensionProtocolDescription2 = "epdp2";
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
                    entryExtensionProtocolDisplayName: entryExtensionProtocolDisplayName1,
                    entryExtensionProtocolRepoLink: entryExtensionProtocolRepoLink1,
                    entryExtensionProtocolDescription: entryExtensionProtocolDescription1,
                },
                {
                    account: account1,
                    entryExtensionProtocolName: entryExtensionProtocolName1,
                    entryExtensionProtocolVersion: entryExtensionProtocolVersion1,
                    entryExtensionProtocolIconBase64: entryExtensionProtocolIconBase641,
                    entryExtensionProtocolDisplayName: entryExtensionProtocolDisplayName1,
                    entryExtensionProtocolRepoLink: entryExtensionProtocolRepoLink1,
                    entryExtensionProtocolDescription: entryExtensionProtocolDescription1,
                },
                {
                    account: account2,
                    entryExtensionProtocolName: entryExtensionProtocolName2,
                    entryExtensionProtocolVersion: entryExtensionProtocolVersion2,
                    entryExtensionProtocolIconBase64: entryExtensionProtocolIconBase642,
                    entryExtensionProtocolDisplayName: entryExtensionProtocolDisplayName2,
                    entryExtensionProtocolRepoLink: entryExtensionProtocolRepoLink2,
                    entryExtensionProtocolDescription: entryExtensionProtocolDescription2,
                }
            ]));
        });
        when('get all publish pacakge entry extension protocols', () => {
        });
        then('should get by page', () => {
        });
        and('should return entry extension protocol1 and entry extension protocol2 that are not duplicate', () => {
            return (0, PackageMarketService_1.getAllPublishPackageEntryExtensionProtocols)(getDataFunc, 100, 0).observe(result => {
                expect(getDataFunc).toCalledWith([
                    sinon_1.match.string,
                    100,
                    0
                ]);
                expect(result).toEqual([
                    {
                        account: account1,
                        name: entryExtensionProtocolName1,
                        version: entryExtensionProtocolVersion1,
                        iconBase64: entryExtensionProtocolIconBase641,
                        displayName: entryExtensionProtocolDisplayName1,
                        repoLink: entryExtensionProtocolRepoLink1,
                        description: entryExtensionProtocolDescription1,
                    },
                    {
                        account: account2,
                        name: entryExtensionProtocolName2,
                        version: entryExtensionProtocolVersion2,
                        iconBase64: entryExtensionProtocolIconBase642,
                        displayName: entryExtensionProtocolDisplayName2,
                        repoLink: entryExtensionProtocolRepoLink2,
                        description: entryExtensionProtocolDescription2,
                    }
                ]);
            });
        });
    });
});

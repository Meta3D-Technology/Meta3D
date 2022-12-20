import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { getAllPublishPackageEntryExtensionProtocols } from "../../src/application_layer/shop/PackageShopService";

const feature = loadFeature("./test/features/get_all_publish_package_entry_extension_protocols.feature")

defineFeature(feature, test => {
    let sandbox = null
    let getDataFunc

    function _createFuncs(sandbox) {
        getDataFunc = sandbox.stub()
    }

    // function _getAllPublishExtensionProtocols() {
    //     return getAllPublishProtocolData(
    //         [getShopProtocolCollectionFunc, getDataFromShopProtocolCollectionFunc],
    //         "publishedextensionprotocols"
    //     )
    // }

    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('get all publish pacakge entry extension protocols', ({ given, when, then, and }) => {
        let entryProtocolName1,
            entryProtocolVersion1,
            entryProtocolIconBase641,
            account1
        let entryProtocolName2,
            entryProtocolVersion2,
            entryProtocolIconBase642,
            account2

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

        _prepare(given)

        given('publish pacakge1 with entry extension protocol1 and account1', () => {
            entryProtocolName1 = "ep1"
            entryProtocolVersion1 = "0.0.1"
            entryProtocolIconBase641 = "epi1"
            account1 = "account1"
        });

        and('publish pacakge2 with entry extension protocol1 and account1', () => {
        });

        and('publish pacakge3 with entry extension protocol2 and account2', () => {
            entryProtocolName2 = "ep2"
            entryProtocolVersion2 = "0.0.2"
            entryProtocolIconBase642 = "epi2"
            account2 = "account2"
        });

        and('prepare funcs', () => {
            _createFuncs(sandbox)

            getDataFunc.withArgs("publishedpackages").returns(
                resolve([
                    {
                        account: account1,
                        entryProtocolName: entryProtocolName1,
                        entryProtocolVersion: entryProtocolVersion1,
                        entryProtocolIconBase64: entryProtocolIconBase641,
                    },
                    {
                        account: account1,
                        entryProtocolName: entryProtocolName1,
                        entryProtocolVersion: entryProtocolVersion1,
                        entryProtocolIconBase64: entryProtocolIconBase641,
                    },
                    {
                        account: account2,
                        entryProtocolName: entryProtocolName2,
                        entryProtocolVersion: entryProtocolVersion2,
                        entryProtocolIconBase64: entryProtocolIconBase642,
                    }
                ])
            )
        });

        when('get all publish pacakge entry extension protocols', () => {
        });

        then('should return entry extension protocol1 and entry extension protocol2 that are not duplicate', () => {
            return getAllPublishPackageEntryExtensionProtocols(
                getDataFunc
            ).observe(result => {
                expect(result).toEqual([
                    {
                        account: account1,
                        name: entryProtocolName1,
                        version: entryProtocolVersion1,
                        iconBase64: entryProtocolIconBase641,
                    },
                    {
                        account: account2,
                        name: entryProtocolName2,
                        version: entryProtocolVersion2,
                        iconBase64: entryProtocolIconBase642,
                    }
                ])
            })
        });
    });
})
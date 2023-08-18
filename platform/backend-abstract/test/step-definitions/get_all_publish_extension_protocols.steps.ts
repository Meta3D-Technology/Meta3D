import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { getAllPublishProtocolData } from "../../src/application_layer/market/MarketService";
import { getDataFromMarketProtocolCollection } from "backend-cloudbase/src/application_layer/BackendService";

const feature = loadFeature("./test/features/get_all_publish_extension_protocols.feature")

defineFeature(feature, test => {
    let sandbox = null
    let getMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc

    let _createFuncs = (sandbox) =>  {
        // getMarketProtocolCollectionFunc = sandbox.stub()
        getDataFromMarketProtocolCollectionFunc = getDataFromMarketProtocolCollection
    }

    let _getAllPublishExtensionProtocols = (limitCount, skipCount) =>  {
        return getAllPublishProtocolData(
            [getMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc],
            "publishedextensionprotocols",
            limitCount, skipCount
        )
    }

    let _prepare = (given) =>  {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('get all publish extension protocols', ({ given, when, then, and }) => {
        let allPublishExtensionProtocols = [
            {
                name: "a1-protocol",
                account: "meta3d",
                version: "0.0.1",
                iconBase64: "b1",
                displayName: "d1",
                repoLink: "l1",
                description: "dp1"
            },
            {
                name: "a2-protocol",
                account: "user1",
                version: "0.0.2",
                iconBase64: "b2",
                displayName: "d1",
                repoLink: null,
                description: "dp1"
            },
            {
                name: "a3-protocol",
                account: "user2",
                version: "0.0.2",
                iconBase64: "b3",
                displayName: "d2",
                repoLink: null,
                description: "dp2"
            },
        ]

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getMarketProtocolCollectionFunc = (_, limitCount, skipCount) => {
                return resolve({
                    data: allPublishExtensionProtocols
                        .slice(skipCount, limitCount)
                        .map((protocolData, index) => {
                            return {
                                ...protocolData,
                                id: index.toString()
                            }
                        })
                })
            }

            // getMarketProtocolCollectionFunc.returns(
            //     resolve({
            //         data: allPublishExtensionProtocols.map((protocolData, index) => {
            //             return {
            //                 ...protocolData,
            //                 id: index.toString()
            //             }
            //         })
            //     })
            // )
        });

        and('publish extension protocol1', () => {
        });

        and('publish extension protocol2', () => {
        });

        when('get all publish extension protocols', () => {
        });

        then('should return correct data', () => {
            return _getAllPublishExtensionProtocols(2, 1).observe(result => {
                expect(result).toEqual([allPublishExtensionProtocols[1]])
            })
        });
    });
})
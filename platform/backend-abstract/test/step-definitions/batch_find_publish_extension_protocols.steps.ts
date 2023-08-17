import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { batchFindPublishProtocolData } from "../../src/application_layer/market/MarketService";
import { getDataFromMarketProtocolCollection } from "backend-cloudbase/src/application_layer/BackendService";

const feature = loadFeature("./test/features/batch_find_publish_extension_protocols.feature")

defineFeature(feature, test => {
    let sandbox = null
    let batchFindMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc

    function _createFuncs(sandbox) {
        getDataFromMarketProtocolCollectionFunc = getDataFromMarketProtocolCollection
    }

    function _batchFindPublishExtensionProtocols(protocolNames) {
        return batchFindPublishProtocolData(
            [batchFindMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc],
            "publishedextensionprotocols",
            protocolNames
        )
    }

    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('batch find publish extension protocols', ({ given, when, then, and }) => {
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

            batchFindMarketProtocolCollectionFunc = (_, protocolNames) => {
                return resolve({
                    data: allPublishExtensionProtocols
                        .filter(({ name }) => {
                            return protocolNames.includes(name)
                        })
                        .map((protocolData, index) => {
                            return {
                                ...protocolData,
                                id: index.toString()
                            }
                        })
                })
            }
        });

        and('publish extension protocol1', () => {
        });

        and('publish extension protocol2', () => {
        });

        when('batch find publish extension protocols by [protocol1.name, protocol2.name]', () => {
        });

        then('should return correct data', () => {
            return _batchFindPublishExtensionProtocols([allPublishExtensionProtocols[0].name, allPublishExtensionProtocols[1].name]).observe(result => {
                expect(result).toEqual([allPublishExtensionProtocols[0], allPublishExtensionProtocols[1]])
            })
        });
    });
})
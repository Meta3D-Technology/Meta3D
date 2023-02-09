import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { getAllPublishProtocolData } from "../../src/application_layer/market/MarketService";
import { getDataFromMarketProtocolCollection } from "backend-cloudbase/src/application_layer/BackendService";

const feature = loadFeature("./test/features/get_all_publish_extension_protocols.feature")

defineFeature(feature, test => {
    let sandbox = null
    let getMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc

    function _createFuncs(sandbox) {
        getMarketProtocolCollectionFunc = sandbox.stub()
        getDataFromMarketProtocolCollectionFunc = getDataFromMarketProtocolCollection
    }

    function _getAllPublishExtensionProtocols() {
        return getAllPublishProtocolData(
            [getMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc],
            "publishedextensionprotocols"
        )
    }

    function _prepare(given) {
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
        ]

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getMarketProtocolCollectionFunc.returns(
                resolve({
                    data: allPublishExtensionProtocols.map((protocolData, index) => {
                        return {
                            ...protocolData,
                            id: index.toString()
                        }
                    })
                })
            )
        });

        and('publish extension protocol1', () => {
        });

        and('publish extension protocol2', () => {
        });

        when('get all publish extension protocols', () => {
        });

        then('should return correct data', () => {
            return _getAllPublishExtensionProtocols().observe(result => {
                expect(result).toEqual(allPublishExtensionProtocols)
            })
        });
    });
})
import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { getAllPublishProtocolConfigData } from "../../src/application_layer/shop/ShopService"
import { getDataFromShopProtocolCollection } from "backend-cloudbase/src/application_layer/BackendService";

const feature = loadFeature("./test/features/get_all_publish_contribute_protocol_configs.feature")

defineFeature(feature, test => {
    let sandbox = null
    let getShopProtocolCollectionFunc, getDataFromShopProtocolCollectionFunc

    function _createFuncs(sandbox) {
        getShopProtocolCollectionFunc = sandbox.stub()
        getDataFromShopProtocolCollectionFunc = getDataFromShopProtocolCollection
    }

    function _getAllPublishContributeProtocolConfigs() {
        return getAllPublishProtocolConfigData(
            [getShopProtocolCollectionFunc, getDataFromShopProtocolCollectionFunc],
            "publishedcontributeprotocolconfigs"
        )
    }

    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('get all publish contribute protocol configs', ({ given, when, then, and }) => {
        let allPublishContributeProtocolConfigs = [
            {
                name: "a1-protocol",
                account: "meta3d",
                version: "0.0.1",
                configStr: "b1"
            },
            {
                name: "a2-protocol",
                account: "user1",
                version: "0.0.2",
                configStr: "b2"
            },
        ]

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getShopProtocolCollectionFunc.returns(
                resolve({
                    data: allPublishContributeProtocolConfigs.map((protocolData, index) => {
                        return {
                            ...protocolData,
                            id: index.toString()
                        }
                    })
                })
            )
        });

        and('publish contribute protocol config1', () => {
        });

        and('publish contribute protocol config2', () => {
        });

        when('get all publish contribute protocol configs', () => {
        });

        then('should return correct data', () => {
            return _getAllPublishContributeProtocolConfigs().observe(result => {
                expect(result).toEqual(allPublishContributeProtocolConfigs)
            })
        });
    });
})
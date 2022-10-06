import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { getAllPublishProtocolConfigData } from "../../src/application_layer/shop/ShopService"

const feature = loadFeature("./test/features/get_all_publish_contribute_protocol_configs.feature")

defineFeature(feature, test => {
    let sandbox = null
    let getCollectionFunc

    function _createFuncs(sandbox) {
        getCollectionFunc = sandbox.stub()
    }

    function _getAllPublishContributeProtocolConfigs() {
        return getAllPublishProtocolConfigData(
            getCollectionFunc,
            "publishedContributeProtocolConfigs"
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
                username: "meta3d",
                version: "0.0.1",
                configStr: "b1"
            },
            {
                name: "a2-protocol",
                username: "user1",
                version: "0.0.2",
                configStr: "b2"
            },
        ]

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getCollectionFunc.returns(
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
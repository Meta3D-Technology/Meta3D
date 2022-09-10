import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { getAllPublishProtocolData } from "../../src/application_layer/shop/ShopService"

const feature = loadFeature("./test/features/get_all_publish_extension_protocols.feature")

defineFeature(feature, test => {
    let sandbox = null
    let getDataFunc

    function _createFuncs(sandbox) {
        getDataFunc = sandbox.stub()
    }

    function _getAllPublishExtensionProtocols() {
        return getAllPublishProtocolData(
            getDataFunc,
            "publishedExtensionProtocols"
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
                username: "meta3d",
                version: "0.0.1",
                iconBase64: "b1"
            },
            {
                name: "a2-protocol",
                username: "user1",
                version: "0.0.2",
                iconBase64: "b2"
            },
        ]

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getDataFunc.returns(
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
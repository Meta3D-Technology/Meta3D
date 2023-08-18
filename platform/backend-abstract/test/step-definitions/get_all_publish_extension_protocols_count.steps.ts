import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { getAllPublishProtocolDataCount } from "../../src/application_layer/market/MarketService";

const feature = loadFeature("./test/features/get_all_publish_extension_protocols_count.feature")

defineFeature(feature, test => {
    let sandbox = null
    let getMarketProtocolCollectionCountFunc

    let _createFuncs = (sandbox) =>  {
        getMarketProtocolCollectionCountFunc = sandbox.stub()
    }

    function _getAllPublishExtensionProtocolsCount() {
        return getAllPublishProtocolDataCount(
            getMarketProtocolCollectionCountFunc,
            "publishedextensionprotocols",
        )
    }

    let _prepare = (given) =>  {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('get all publish extension protocols\' count', ({ given, when, then, and }) => {
        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getMarketProtocolCollectionCountFunc.returns(
                resolve(2)
            )
        });

        and('publish extension protocol1', () => {
        });

        and('publish extension protocol2', () => {
        });

        when('get all publish extension protocols\' count', () => {
        });

        then('should return 2', () => {
            return _getAllPublishExtensionProtocolsCount().observe(result => {
                expect(result).toEqual(2)
            })
        });
    });
})
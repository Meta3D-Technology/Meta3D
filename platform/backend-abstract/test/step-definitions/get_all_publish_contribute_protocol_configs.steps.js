"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const MarketService_1 = require("../../src/application_layer/market/MarketService");
const BackendService_1 = require("backend-cloudbase/src/application_layer/BackendService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/get_all_publish_contribute_protocol_configs.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let getMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc;
    function _createFuncs(sandbox) {
        // getMarketProtocolCollectionFunc = sandbox.stub()
        getDataFromMarketProtocolCollectionFunc = BackendService_1.getDataFromMarketProtocolCollection;
    }
    function _getAllPublishContributeProtocolConfigs(limitCount, skipCount) {
        return (0, MarketService_1.getAllPublishProtocolConfigData)([getMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc], "publishedcontributeprotocolconfigs", limitCount, skipCount);
    }
    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
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
            {
                name: "a3-protocol",
                account: "user2",
                version: "0.0.3",
                configStr: "b3"
            },
        ];
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            // getMarketProtocolCollectionFunc.returns(
            //     resolve({
            //         data: allPublishContributeProtocolConfigs.map((protocolData, index) => {
            //             return {
            //                 ...protocolData,
            //                 id: index.toString()
            //             }
            //         })
            //     })
            // )
            getMarketProtocolCollectionFunc = (_, limitCount, skipCount) => {
                return (0, PromiseTool_1.resolve)({
                    data: allPublishContributeProtocolConfigs
                        .slice(skipCount, limitCount)
                        .map((protocolData, index) => {
                        return Object.assign(Object.assign({}, protocolData), { id: index.toString() });
                    })
                });
            };
        });
        and('publish contribute protocol config1', () => {
        });
        and('publish contribute protocol config2', () => {
        });
        when('get all publish contribute protocol configs', () => {
        });
        then('should return correct data', () => {
            // return _getAllPublishContributeProtocolConfigs().observe(result => {
            //     expect(result).toEqual(allPublishContributeProtocolConfigs)
            // })
            return _getAllPublishContributeProtocolConfigs(2, 1).observe(result => {
                expect(result).toEqual([allPublishContributeProtocolConfigs[1]]);
            });
        });
    });
});

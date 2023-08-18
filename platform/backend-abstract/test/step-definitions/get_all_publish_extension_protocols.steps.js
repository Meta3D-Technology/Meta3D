"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const MarketService_1 = require("../../src/application_layer/market/MarketService");
const BackendService_1 = require("backend-cloudbase/src/application_layer/BackendService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/get_all_publish_extension_protocols.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let getMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc;
    let _createFuncs = (sandbox) => {
        // getMarketProtocolCollectionFunc = sandbox.stub()
        getDataFromMarketProtocolCollectionFunc = BackendService_1.getDataFromMarketProtocolCollection;
    };
    let _getAllPublishExtensionProtocols = (limitCount, skipCount) => {
        return (0, MarketService_1.getAllPublishProtocolData)([getMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc], "publishedextensionprotocols", limitCount, skipCount);
    };
    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    };
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
        ];
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getMarketProtocolCollectionFunc = (_, limitCount, skipCount) => {
                return (0, PromiseTool_1.resolve)({
                    data: allPublishExtensionProtocols
                        .slice(skipCount, limitCount)
                        .map((protocolData, index) => {
                        return Object.assign(Object.assign({}, protocolData), { id: index.toString() });
                    })
                });
            };
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
                expect(result).toEqual([allPublishExtensionProtocols[1]]);
            });
        });
    });
});

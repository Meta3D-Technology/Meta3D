"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const MarketService_1 = require("../../src/application_layer/market/MarketService");
const BackendService_1 = require("backend-cloudbase/src/application_layer/BackendService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/batch_find_publish_extension_protocols.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let batchFindMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc;
    let _createFuncs = (sandbox) => {
        getDataFromMarketProtocolCollectionFunc = BackendService_1.getDataFromMarketProtocolCollection;
    };
    let _batchFindPublishExtensionProtocols = (protocolNames) => {
        return (0, MarketService_1.batchFindPublishProtocolData)([batchFindMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc], "publishedextensionprotocols", protocolNames);
    };
    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    };
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
        ];
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            batchFindMarketProtocolCollectionFunc = (_, protocolNames) => {
                return (0, PromiseTool_1.resolve)({
                    data: allPublishExtensionProtocols
                        .filter(({ name }) => {
                        return protocolNames.includes(name);
                    })
                        .map((protocolData, index) => {
                        return Object.assign(Object.assign({}, protocolData), { id: index.toString() });
                    })
                });
            };
        });
        and('publish extension protocol1', () => {
        });
        and('publish extension protocol2', () => {
        });
        when('batch find publish extension protocols by [protocol1.name, protocol2.name]', () => {
        });
        then('should return correct data', () => {
            return _batchFindPublishExtensionProtocols([allPublishExtensionProtocols[0].name, allPublishExtensionProtocols[1].name]).observe(result => {
                expect(result).toEqual([allPublishExtensionProtocols[0], allPublishExtensionProtocols[1]]);
            });
        });
    });
});

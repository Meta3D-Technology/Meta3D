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
    function _createFuncs(sandbox) {
        getMarketProtocolCollectionFunc = sandbox.stub();
        getDataFromMarketProtocolCollectionFunc = BackendService_1.getDataFromMarketProtocolCollection;
    }
    function _getAllPublishExtensionProtocols() {
        return (0, MarketService_1.getAllPublishProtocolData)([getMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc], "publishedextensionprotocols");
    }
    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    }
    test('get all publish extension protocols', ({ given, when, then, and }) => {
        let allPublishExtensionProtocols = [
            {
                name: "a1-protocol",
                account: "meta3d",
                version: "0.0.1",
                iconBase64: "b1"
            },
            {
                name: "a2-protocol",
                account: "user1",
                version: "0.0.2",
                iconBase64: "b2"
            },
        ];
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getMarketProtocolCollectionFunc.returns((0, PromiseTool_1.resolve)({
                data: allPublishExtensionProtocols.map((protocolData, index) => {
                    return Object.assign(Object.assign({}, protocolData), { id: index.toString() });
                })
            }));
        });
        and('publish extension protocol1', () => {
        });
        and('publish extension protocol2', () => {
        });
        when('get all publish extension protocols', () => {
        });
        then('should return correct data', () => {
            return _getAllPublishExtensionProtocols().observe(result => {
                expect(result).toEqual(allPublishExtensionProtocols);
            });
        });
    });
});

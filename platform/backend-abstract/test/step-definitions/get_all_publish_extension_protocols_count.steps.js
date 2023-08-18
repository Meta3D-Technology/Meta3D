"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const MarketService_1 = require("../../src/application_layer/market/MarketService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/get_all_publish_extension_protocols_count.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let getMarketProtocolCollectionCountFunc;
    let _createFuncs = (sandbox) => {
        getMarketProtocolCollectionCountFunc = sandbox.stub();
    };
    function _getAllPublishExtensionProtocolsCount() {
        return (0, MarketService_1.getAllPublishProtocolDataCount)(getMarketProtocolCollectionCountFunc, "publishedextensionprotocols");
    }
    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    };
    test('get all publish extension protocols\' count', ({ given, when, then, and }) => {
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getMarketProtocolCollectionCountFunc.returns((0, PromiseTool_1.resolve)(2));
        });
        and('publish extension protocol1', () => {
        });
        and('publish extension protocol2', () => {
        });
        when('get all publish extension protocols\' count', () => {
        });
        then('should return 2', () => {
            return _getAllPublishExtensionProtocolsCount().observe(result => {
                expect(result).toEqual(2);
            });
        });
    });
});

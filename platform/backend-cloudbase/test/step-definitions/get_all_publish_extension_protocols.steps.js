"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const ShopService_1 = require("../../src/application_layer/shop/ShopService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/get_all_publish_extension_protocols.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let getCollectionFunc;
    function _createFuncs(sandbox) {
        getCollectionFunc = sandbox.stub();
    }
    function _getAllPublishExtensionProtocols() {
        return (0, ShopService_1.getAllPublishProtocolData)(getCollectionFunc, "publishedExtensionProtocols");
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
        ];
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getCollectionFunc.returns((0, PromiseTool_1.resolve)({
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

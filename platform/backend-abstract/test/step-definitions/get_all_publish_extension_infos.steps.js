"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const MarketService_1 = require("../../src/application_layer/market/MarketService");
const BackendService_1 = require("backend-cloudbase/src/application_layer/BackendService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/get_all_publish_extension_infos.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let getMarketImplementCollectionFunc, mapMarketImplementCollectionFunc, getAccountFromMarketImplementCollectionDataFunc, getFileDataFromMarketImplementCollectionDataFunc;
    function _createFuncs(sandbox) {
        getMarketImplementCollectionFunc = sandbox.stub();
        mapMarketImplementCollectionFunc = BackendService_1.mapMarketImplementCollection;
        getAccountFromMarketImplementCollectionDataFunc = BackendService_1.getAccountFromMarketImplementCollectionData;
        getFileDataFromMarketImplementCollectionDataFunc = BackendService_1.getFileDataFromMarketImplementCollectionData;
    }
    function _getAllPublishExtensions(protocolName, protocolVersion) {
        return (0, MarketService_1.getAllPublishImplementInfo)([
            getMarketImplementCollectionFunc,
            mapMarketImplementCollectionFunc,
            getAccountFromMarketImplementCollectionDataFunc,
            getFileDataFromMarketImplementCollectionDataFunc,
        ], "publishedextensions", protocolName, protocolVersion);
    }
    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    }
    test('one extension implement one protocol', ({ given, when, then, and }) => {
        let account = "meta3d";
        let fileVersion1 = "0.1.1";
        let fileVersion2 = "0.1.2";
        let fileVersion3 = "0.1.3";
        let fileName1 = "f1";
        let fileId1 = "i1";
        let fileId2 = "i2";
        let fileId3 = "i3";
        // let fileName2 = "f2"
        // let fileName3 = "f3"
        let allPublishExtensions = null;
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getMarketImplementCollectionFunc.returns((0, PromiseTool_1.resolve)({
                data: [
                    {
                        key: account,
                        fileData: [
                            {
                                fileID: fileId1,
                                protocolName: "test1-protocol",
                                protocolVersion: "^0.2.0",
                                name: fileName1,
                                version: fileVersion1
                            },
                            {
                                fileID: fileId2,
                                protocolName: "test1-protocol",
                                protocolVersion: "^0.1.0",
                                name: fileName1,
                                version: fileVersion2
                            },
                            {
                                fileID: fileId3,
                                protocolName: "test2-protocol",
                                protocolVersion: "^0.1.0",
                                name: fileName1,
                                version: fileVersion3
                            }
                        ]
                    }
                ]
            }));
        });
        and('publish extension1', () => {
        });
        and('publish extension2', () => {
        });
        when('get all publish extension infos', () => {
            return _getAllPublishExtensions("test1-protocol", "0.1.0").observe(result => {
                allPublishExtensions = result;
            });
        });
        then('should return correct data', () => {
            expect(allPublishExtensions).toEqual([
                {
                    name: fileName1,
                    id: fileId2,
                    version: fileVersion2,
                    account
                }
            ]);
        });
    });
    test('two extensions implement one protocol', ({ given, when, then, and }) => {
        let account = "u1";
        let fileVersion1 = "0.1.1";
        let fileVersion2 = "0.1.2";
        let fileName1 = "f1";
        let fileName2 = "f2";
        let fileId1 = "i1";
        let fileId2 = "i2";
        let allPublishExtensions = null;
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getMarketImplementCollectionFunc.returns((0, PromiseTool_1.resolve)({
                data: [
                    {
                        key: account,
                        fileData: [
                            {
                                fileID: fileId1,
                                protocolName: "test1-protocol",
                                protocolVersion: "^0.1.0",
                                name: fileName1,
                                version: fileVersion1
                            },
                            {
                                fileID: fileId2,
                                protocolName: "test1-protocol",
                                protocolVersion: "^0.1.0",
                                name: fileName2,
                                version: fileVersion2
                            },
                        ]
                    }
                ]
            }));
        });
        and('publish extension1 for protocol1', () => {
        });
        and('publish extension2 for protocol1', () => {
        });
        when('get all publish extension infos', () => {
            return _getAllPublishExtensions("test1-protocol", "0.1.0").observe(result => {
                allPublishExtensions = result;
            });
        });
        then('should return correct data', () => {
            expect(allPublishExtensions).toEqual([
                {
                    id: fileId1,
                    name: fileName1,
                    version: fileVersion1,
                    account
                },
                {
                    id: fileId2,
                    name: fileName2,
                    version: fileVersion2,
                    account
                }
            ]);
        });
    });
    test('get empty', ({ given, when, then, and }) => {
        let allPublishExtensions = null;
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getMarketImplementCollectionFunc.returns((0, PromiseTool_1.resolve)({
                data: [
                    {
                        fileData: [
                            {
                                protocolName: "test1-protocol",
                                protocolVersion: "^0.2.0",
                            },
                            {
                                protocolName: "test2-protocol",
                                protocolVersion: "^0.1.0",
                            }
                        ]
                    }
                ]
            }));
        });
        when('get all publish extension infos', () => {
            return _getAllPublishExtensions("test1-protocol", "0.1.0").observe(result => {
                allPublishExtensions = result;
            });
        });
        then('should return empty data', () => {
            expect(allPublishExtensions).toEqual([]);
        });
    });
});

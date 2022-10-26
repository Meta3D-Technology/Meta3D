"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const ShopService_1 = require("../../src/application_layer/shop/ShopService");
const most_1 = require("most");
const BackendService_1 = require("backend-cloudbase/src/application_layer/BackendService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/get_all_publish_extensions.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let getShopImplementCollectionFunc, downloadFileFunc, mapShopImplementCollectionFunc, getAccountFromShopImplementCollectionDataFunc, getFileDataFromShopImplementCollectionDataFunc;
    function _createFuncs(sandbox) {
        getShopImplementCollectionFunc = sandbox.stub();
        downloadFileFunc = sandbox.stub();
        mapShopImplementCollectionFunc = BackendService_1.mapShopImplementCollection;
        getAccountFromShopImplementCollectionDataFunc = BackendService_1.getAccountFromShopImplementCollectionData;
        getFileDataFromShopImplementCollectionDataFunc = BackendService_1.getFileDataFromShopImplementCollectionData;
    }
    function _getAllPublishExtensions(protocolName, protocolVersion) {
        return (0, ShopService_1.getAllPublishData)([
            getShopImplementCollectionFunc,
            mapShopImplementCollectionFunc,
            getAccountFromShopImplementCollectionDataFunc,
            getFileDataFromShopImplementCollectionDataFunc,
            downloadFileFunc
        ], "publishedextensions", protocolName, protocolVersion);
    }
    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    }
    test('one extension implement one protocol', ({ given, when, then, and }) => {
        let account = "meta3d";
        let fileID1 = "id1";
        let fileID2 = "id2";
        let fileID3 = "id3";
        let fileVersion1 = "0.1.1";
        let fileVersion2 = "0.1.2";
        let fileVersion3 = "0.1.3";
        let file1 = new ArrayBuffer(10);
        let allPublishExtensions = null;
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getShopImplementCollectionFunc.returns((0, PromiseTool_1.resolve)({
                data: [
                    {
                        key: account,
                        fileData: [
                            {
                                protocolName: "test1-protocol",
                                protocolVersion: "^0.2.0",
                                fileID: fileID1,
                                version: fileVersion1
                            },
                            {
                                protocolName: "test1-protocol",
                                protocolVersion: "^0.1.0",
                                fileID: fileID2,
                                version: fileVersion2
                            },
                            {
                                protocolName: "test2-protocol",
                                protocolVersion: "^0.1.0",
                                fileID: fileID3,
                                version: fileVersion3
                            }
                        ]
                    }
                ]
            }));
            downloadFileFunc.returns((0, most_1.just)(file1));
        });
        and('publish extension1', () => {
        });
        and('publish extension2', () => {
        });
        when('get all publish extensions', () => {
            return _getAllPublishExtensions("test1-protocol", "0.1.0").observe(result => {
                allPublishExtensions = result;
            });
        });
        then('should return correct data', () => {
            expect(downloadFileFunc).toCalledOnce();
            expect(downloadFileFunc).toCalledWith([
                fileID2
            ]);
            expect(allPublishExtensions).toEqual([
                {
                    id: fileID2,
                    file: file1,
                    version: fileVersion2,
                    account
                }
            ]);
        });
    });
    test('two extensions implement one protocol', ({ given, when, then, and }) => {
        let account = "u1";
        let fileID1 = "id1";
        let fileVersion1 = "0.1.1";
        let fileID2 = "id2";
        let fileVersion2 = "0.1.2";
        let file1 = new ArrayBuffer(10);
        let file2 = new ArrayBuffer(11);
        let allPublishExtensions = null;
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getShopImplementCollectionFunc.returns((0, PromiseTool_1.resolve)({
                data: [
                    {
                        key: account,
                        fileData: [
                            {
                                protocolName: "test1-protocol",
                                protocolVersion: "^0.1.0",
                                fileID: fileID1,
                                version: fileVersion1
                            },
                            {
                                protocolName: "test1-protocol",
                                protocolVersion: "^0.1.0",
                                fileID: fileID2,
                                version: fileVersion2
                            },
                        ]
                    }
                ]
            }));
            downloadFileFunc.withArgs(fileID1).returns((0, most_1.just)(file1));
            downloadFileFunc.withArgs(fileID2).returns((0, most_1.just)(file2));
        });
        and('publish extension1 for protocol1', () => {
        });
        and('publish extension2 for protocol1', () => {
        });
        when('get all publish extensions', () => {
            return _getAllPublishExtensions("test1-protocol", "0.1.0").observe(result => {
                allPublishExtensions = result;
            });
        });
        then('should return correct data', () => {
            expect(downloadFileFunc).toCalledTwice();
            expect(downloadFileFunc.getCall(0)).toCalledWith([
                fileID1
            ]);
            expect(downloadFileFunc.getCall(1)).toCalledWith([
                fileID2
            ]);
            expect(allPublishExtensions).toEqual([
                {
                    id: fileID1,
                    file: file1,
                    version: fileVersion1,
                    account
                },
                {
                    id: fileID2,
                    file: file2,
                    version: fileVersion2,
                    account
                }
            ]);
        });
    });
    test('get empty', ({ given, when, then, and }) => {
        let fileID1 = "id1";
        let fileID3 = "id3";
        let allPublishExtensions = null;
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            getShopImplementCollectionFunc.returns((0, PromiseTool_1.resolve)({
                data: [
                    {
                        fileData: [
                            {
                                protocolName: "test1-protocol",
                                protocolVersion: "^0.2.0",
                                fileID: fileID1
                            },
                            {
                                protocolName: "test2-protocol",
                                protocolVersion: "^0.1.0",
                                fileID: fileID3
                            }
                        ]
                    }
                ]
            }));
        });
        when('get all publish extensions', () => {
            return _getAllPublishExtensions("test1-protocol", "0.1.0").observe(result => {
                allPublishExtensions = result;
            });
        });
        then('should return empty data', () => {
            expect(allPublishExtensions).toEqual([]);
        });
    });
});

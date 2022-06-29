import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { _getAllPublishData } from "../../src/application_layer/shop/ShopService"
import { just } from "most";

const feature = loadFeature("./test/features/get_all_publish_extensions.feature")

defineFeature(feature, test => {
    let sandbox = null
    let getDataFunc, getFileFunc

    function _createFuncs(sandbox) {
        getDataFunc = sandbox.stub()
        getFileFunc = sandbox.stub()
    }

    function _getAllPublishExtensions(protocolName, protocolVersion) {
        return _getAllPublishData(
            [getDataFunc, getFileFunc],
            "publishedExtensions",
            protocolName, protocolVersion
        )
    }

    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('get all publish extension', ({ given, when, then, and }) => {
        let fileID1 = "id1"
        let fileID2 = "id2"
        let fileID3 = "id3"
        let file1 = new ArrayBuffer(10)
        let allPublishExtensions = null

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getDataFunc.returns(
                resolve({
                    data: [
                        {
                            fileData: [
                                {
                                    protocolName: "test1-protocol",
                                    protocolVersion: "^0.2.0",
                                    fileID: fileID1
                                },
                                {
                                    protocolName: "test1-protocol",
                                    protocolVersion: "^0.1.0",
                                    fileID: fileID2
                                },
                                {
                                    protocolName: "test2-protocol",
                                    protocolVersion: "^0.1.0",
                                    fileID: fileID3
                                }
                            ]
                        }
                    ]
                })
            )
            getFileFunc.returns(
                just(file1)
            )
        });

        and('publish extension1', () => {
        });

        and('publish extension2', () => {
        });

        when('get all publish extensions', () => {
            return _getAllPublishExtensions(
                "test1-protocol", "0.1.0"
            ).observe(result => {
                allPublishExtensions = result
            })
        });

        then('should return correct data', () => {
            expect(getFileFunc).toCalledOnce()
            expect(getFileFunc).toCalledWith([
                fileID2
            ])
            expect(
                allPublishExtensions
            ).toEqual([
                {
                    id: fileID2,
                    file: file1
                }
            ])
        });
    });

    test('get empty', ({ given, when, then, and }) => {
        let fileID1 = "id1"
        let fileID3 = "id3"
        let allPublishExtensions = null

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getDataFunc.returns(
                resolve({
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
                })
            )
        });

        when('get all publish extensions', () => {
            return _getAllPublishExtensions(
                "test1-protocol", "0.1.0"
            ).observe(result => {
                allPublishExtensions = result
            })
        });

        then('should return empty data', () => {
            expect(
                allPublishExtensions
            ).toEqual([])
        });
    })
})
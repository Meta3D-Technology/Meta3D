import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { empty, just } from "most";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { publishElementContribute } from "../../src/application_layer/publish/PublishElementContributeService";

const feature = loadFeature("./test/features/publish_element_contribute.feature")

defineFeature(feature, test => {
    let sandbox = null
    let logFunc, errorFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc

    function _createFuncs(sandbox, errorFuncStub = console.error) {
        logFunc = sandbox.stub()
        errorFunc = errorFuncStub
        hasDataFunc = sandbox.stub()
        uploadFileFunc = sandbox.stub()
        getDataFunc = sandbox.stub()
        updateDataFunc = sandbox.stub()
    }

    function _publish(
        username = "u1",
        packageData = [
            "",
            "",
            "",
            "",
        ],
        contributeBinaryFile = new ArrayBuffer(0)
    ) {
        return publishElementContribute(
            [logFunc, errorFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc],
            username,
            packageData,
            contributeBinaryFile
        )
    }

    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('if publisher is not registered, throw error', ({ given, and, when, then }) => {
        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox, sandbox.stub())

        });

        and('make publisher not be registered', () => {
            hasDataFunc.returns(
                just(false)
            )
        });

        when('publish', () => {
            return _publish()
        });

        then(/^should error:                 "(.*)"$/, (arg0) => {
            expect(
                errorFunc.getCall(0).args[1].message
            ).toEqual(
                arg0
            )
        });
    });

    test('upload file and add to collection', ({ given, when, then, and }) => {
        let username = "meta3d"
        let name = "test1"
        let version = "0.0.2"
        let protocolName = "test1-protocol"
        let protocolVersion = "^0.0.1"
        let binaryFile = new ArrayBuffer(10)
        let fileID1 = "id1"

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            hasDataFunc.returns(
                just(true)
            )
            uploadFileFunc.returns(
                just({ fileID: fileID1 })
            )
            getDataFunc.returns(
                resolve({
                    data: [
                        {
                            fileData: []
                        }
                    ]
                })
            )
        });

        when('publish', () => {
            return _publish(
                username,
                [
                    name,
                    version,
                    protocolName,
                    protocolVersion,
                ],
                binaryFile
            )
        });

        then('should upload file', () => {
            expect(uploadFileFunc).toCalledWith([
                logFunc,
                "contributes/test1_0.0.2.arrayBuffer",
                binaryFile
            ])
        });

        and('should add to collection', () => {
            expect(updateDataFunc).toCalledWith([
                "publishedContributes",
                { "username": "meta3d" },
                {
                    "fileData": [{
                        "protocolName": "test1-protocol", "protocolVersion": "^0.0.1",
                        "version": "0.0.2",
                        "fileID": fileID1
                    }]
                }
            ])
        });
    });

    test('if element contribute with the same publisher, version, protocol name exist, throw error', ({ given, when, then, and }) => {
        let username = "meta3d"
        let name = "test1"
        let version = "0.0.2"
        let protocolName = "test1-protocol"
        let protocolVersion = "^0.0.1"
        let binaryFile = new ArrayBuffer(10)
        let fileID1 = "id1"

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox, sandbox.stub())

            hasDataFunc.returns(
                just(true)
            )
            uploadFileFunc.returns(
                empty()
            )
            getDataFunc.onCall(0).returns(
                resolve({
                    data: [
                        {
                            fileData: []
                        }
                    ]
                })
            )
            getDataFunc.onCall(1).returns(
                resolve({
                    data: [
                        {
                            fileData: [
                                {
                                    protocolName: "test1-protocol",
                                    version: "0.0.2"
                                }
                            ]
                        }
                    ]
                })
            )
        });

        and('publish', () => {
            return _publish(
                username,
                [
                    name,
                    version,
                    protocolName,
                    protocolVersion,
                ],
                binaryFile
            )
        });

        when('publish with the same publisher, version, protocol name', () => {
            return _publish(
                username,
                [
                    name,
                    version,
                    protocolName,
                    protocolVersion,
                ],
                binaryFile
            )
        });

        then('should error', () => {
            expect(
                errorFunc.getCall(0).args[1].message
            ).toEqual(
                "version: 0.0.2 already exist, please update version"
            )
        });
    });
})
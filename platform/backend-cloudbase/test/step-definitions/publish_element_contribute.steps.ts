import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { empty, just } from "most";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { publishElementContribute } from "../../src/application_layer/assemble_space/element_assemble/PublishElementContributeService";

const feature = loadFeature("./test/features/publish_element_contribute.feature")

defineFeature(feature, test => {
    let sandbox = null
    let logFunc, errorFunc, uploadFileFunc, getDataFunc, updateDataFunc

    function _createFuncs(sandbox, errorFuncStub = console.error) {
        logFunc = sandbox.stub()
        errorFunc = errorFuncStub
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
            [logFunc, (message) => {
                errorFunc(message)
                throw new Error(message)
            }, uploadFileFunc, getDataFunc, updateDataFunc],
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

            uploadFileFunc.returns(
                just(fileID1)
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
            ).drain()
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
                        "protocolName": protocolName, "protocolVersion": protocolVersion,
                        "name": name,
                        "version": version,
                        "fileID": fileID1
                    }]
                }
            ])
        });
    });

    test('if element contribute with the same publisher, name, version exist, throw error', ({ given, when, then, and }) => {
        let username = "meta3d"
        let name = "test1"
        let version = "0.0.2"
        // let protocolName = "test1-protocol"
        // let protocolVersion = "^0.0.1"
        let binaryFile = new ArrayBuffer(10)

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox, sandbox.stub())

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
                                    name: name,
                                    version: version
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
                    // protocolName,
                    // protocolVersion,
                    "",
                    ""
                ],
                binaryFile
            ).drain()
        });

        when('publish with the same publisher, name, version', () => {
            return _publish(
                username,
                [
                    name,
                    version,
                    // protocolName,
                    // protocolVersion,
                    "",
                    ""
                ],
                binaryFile
            ).drain().catch(e => { }
            )
        });

        then('should error', () => {
            expect(
                errorFunc.getCall(0).args[0]
            ).toEqual(
                "version: 0.0.2 already exist, please update version"
            )
        });

        and('not upload file', () => {
            expect(
                uploadFileFunc.callCount
            ).toEqual(
                1
            )
        });
    });
})
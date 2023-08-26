import { loadFeature, defineFeature } from "jest-cucumber"
import { publish } from "../../src/Publish"
import { createSandbox, match } from "sinon";
import { empty, just } from "most";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { addMarketImplementDataToDataFromMarketImplementCollectionData, buildMarketImplementAccountData, getDataFromMarketImplementAccountData, getFileID, isContain, parseMarketCollectionDataBodyForNodejs } from "meta3d-tool-utils/src/publish/CloudbaseService";

const feature = loadFeature("./test/features/publish_extension.feature")

defineFeature(feature, test => {
    let sandbox = null
    let readFileSyncFunc, logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasAccountFunc, uploadFileFunc, getMarketImplementAccountDataFunc, updateMarketImplementDataFunc, getDataFromMarketImplementAccountDataFunc, isContainFunc, buildMarketImplementAccountDataFunc, addMarketImplementDataToDataFromMarketImplementCollectionDataFunc, getFileIDFunc, parseMarketCollectionDataBodyFunc

    let _createFuncs = (sandbox, errorFuncStub = console.error) => {
        readFileSyncFunc = sandbox.stub()
        logFunc = sandbox.stub()
        errorFunc = errorFuncStub
        readJsonFunc = sandbox.stub()
        generateFunc = sandbox.stub()
        initFunc = sandbox.stub()
        hasAccountFunc = sandbox.stub()
        uploadFileFunc = sandbox.stub()
        getMarketImplementAccountDataFunc = sandbox.stub()
        updateMarketImplementDataFunc = sandbox.stub()
        getDataFromMarketImplementAccountDataFunc = getDataFromMarketImplementAccountData
        isContainFunc = isContain
        buildMarketImplementAccountDataFunc = buildMarketImplementAccountData
        addMarketImplementDataToDataFromMarketImplementCollectionDataFunc = addMarketImplementDataToDataFromMarketImplementCollectionData
        getFileIDFunc = getFileID
        parseMarketCollectionDataBodyFunc = parseMarketCollectionDataBodyForNodejs
    }

    function _buildPackageJson(name = "test1",
        version = "0.0.1",
        protocol = { name: "test1-protocol" }, publisher = "meta3d",
        // dependentExtensionProtocolNameMap = {
        // }, dependentContributeProtocolNameMap = {},
        dependencies: any = {
            "test1-protocol": "^0.0.1"
        },
        packageDependencies: any = {
            "test1-package-protocol": "^0.0.1"
        },
        displayName = "d1",
        repoLink = "",
        description = "dp1",
    ) {
        return {
            name, version, protocol, publisher,
            displayName,
            repoLink,
            description,
            // dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap,
            packageDependencies,
            dependencies
        }
    }

    let _publishExtension = (packageFilePath = "", distFilePath = "") => {
        return publish(
            [readFileSyncFunc, logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasAccountFunc, uploadFileFunc, getMarketImplementAccountDataFunc, updateMarketImplementDataFunc, getDataFromMarketImplementAccountDataFunc, isContainFunc, buildMarketImplementAccountDataFunc, addMarketImplementDataToDataFromMarketImplementCollectionDataFunc, getFileIDFunc, parseMarketCollectionDataBodyFunc],
            packageFilePath, distFilePath,
            "extension"
        )
    }

    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = createSandbox()

            delete (global as any).window
        });
    }

    test('if publisher is not registered, throw error', ({ given, and, when, then }) => {
        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox, sandbox.stub())

            readJsonFunc.returns(
                just({})
            )
            initFunc.returns(
                just({})
            )
        });

        and('make publisher not be registered', () => {
            hasAccountFunc.returns(
                just(false)
            )
        });

        when('publish extension', () => {
            return _publishExtension()
        });

        then(/^should error: "(.*)"$/, (arg0) => {
            expect(
                errorFunc.getCall(0).args[1].message
            ).toEqual(
                arg0
            )
        });
    });

    test('define window for generateFunc', ({ given, and, when, then }) => {

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox, sandbox.stub())

            readJsonFunc.returns(
                just(_buildPackageJson())
            )
            initFunc.returns(
                just({})
            )
            getMarketImplementAccountDataFunc.returns(
                resolve([{
                    fileData: []
                }, []])
            )
            hasAccountFunc.returns(
                just(true)
            )
            uploadFileFunc.returns(
                empty()
            )
        });

        and('make generateFunc use window', () => {
            delete (global as any).window

            generateFunc = (_1, _2) => {
                (global as any).window.a = 1

                return new ArrayBuffer(0)
            }
        });

        when('publish extension', () => {
            return _publishExtension()
        });

        then('should not error', () => {
            expect(
                errorFunc
            ).not.toCalled()
        });
    });

    test('upload file and add to collection', ({ given, when, then, and }) => {
        let app = { "app": true }
        let distFileContent = "dist"
        let generatedResult = new ArrayBuffer(0)
        let fileID1 = "id1"
        let marketImplementCollectionData = []

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            readJsonFunc.returns(
                just(_buildPackageJson(
                    "test1",
                    "0.0.2",
                    { name: "test1-protocol" }, "meta3d",
                    // {
                    //     meta3dTest1ExtensionProtocolName: {
                    //         "protocolName": "meta3d-extension-test1-protocol"
                    //     }
                    // }, {},
                    {
                        "test1-protocol": "^0.0.1",
                        "meta3d-extension-test1-protocol": "^0.3.4"
                    },
                    {
                        "test1-package-protocol": "^0.0.1"
                    },
                    "d1",
                    "l1",
                    "dp1",
                ))
            )
            initFunc.returns(
                just(app)
            )
            hasAccountFunc.returns(
                just(true)
            )
            readFileSyncFunc.returns(distFileContent)
            generateFunc.returns(generatedResult)
            uploadFileFunc.returns(
                just({ fileID: fileID1 })
            )
            getMarketImplementAccountDataFunc.returns(
                resolve([{
                    fileData: []
                }, marketImplementCollectionData])
            )
        });

        when('publish extension', () => {
            return _publishExtension()
        });

        then('should upload generated file', () => {
            expect(generateFunc).toCalledWith([
                {
                    "name": "test1",
                    "version": "0.0.2",
                    "account": "meta3d",
                    "displayName": "d1",
                    "repoLink": "l1",
                    "description": "dp1",
                    "protocol": {
                        "name": "test1-protocol",
                        "version": "^0.0.1"
                    },
                    "dependentPackageStoredInAppProtocolNameMap": {
                        "test1-package-protocol": "^0.0.1"
                    },
                    "dependentBlockProtocolNameMap": {
                        "meta3d-extension-test1-protocol": "^0.3.4"
                    }
                },
                distFileContent
            ])
            expect(uploadFileFunc).toCalledWith([
                app,
                "extensions/test1_0.0.2.arrayBuffer",
                generatedResult
            ])
        });

        and('should add to collection', () => {
            expect(updateMarketImplementDataFunc).toCalledWith([
                app,
                "publishedextensions",
                "meta3d",
                {
                    "key": "meta3d",
                    "fileData": [{
                        "protocolName": "test1-protocol", "protocolVersion": "^0.0.1",
                        "name": "test1",
                        "version": "0.0.2",
                        "displayName": "d1",
                        "repoLink": "l1",
                        "description": "dp1",
                        "fileID": fileID1
                    }]
                },
                marketImplementCollectionData
            ])
        });
    });

    test('handle nullable package json fields', ({ given, when, then, and }) => {
        let app = { "app": true }
        let distFileContent = "dist"
        let generatedResult = new ArrayBuffer(0)
        let fileID1 = "id1"
        let marketImplementCollectionData = []

        _prepare(given)

        given('prepare funcs that package json not has displayName, repoLink, description', () => {
            _createFuncs(sandbox)

            readJsonFunc.returns(
                just(
                    {
                        name: "test1", version: "0.0.2",
                        protocol: { name: "test1-protocol" }, publisher: "meta3d",
                        dependentBlockProtocolNameMap: {},
                        dependentPackageStoredInAppProtocolNameMap: {},
                        dependencies: {
                            "test1-protocol": "^0.0.1"
                        },
                    }
                )
            )
            initFunc.returns(
                just(app)
            )
            hasAccountFunc.returns(
                just(true)
            )
            readFileSyncFunc.returns(distFileContent)
            generateFunc.returns(generatedResult)
            uploadFileFunc.returns(
                just({ fileID: fileID1 })
            )
            getMarketImplementAccountDataFunc.returns(
                resolve([{
                    fileData: []
                }, marketImplementCollectionData])
            )
        });

        when('publish extension', () => {
            return _publishExtension()
        });

        then('should use default value', () => {
            expect(generateFunc).toCalledWith([
                {
                    "name": "test1",
                    "version": "0.0.2",
                    "account": "meta3d",
                    "displayName": "test1",
                    "repoLink": "",
                    "description": "",
                    "protocol": { "name": "test1-protocol", "version": "^0.0.1" }, "dependentBlockProtocolNameMap": {},
                    "dependentPackageStoredInAppProtocolNameMap": {}
                },
                distFileContent
            ])
            expect(updateMarketImplementDataFunc).toCalledWith([
                app,
                "publishedextensions",
                "meta3d",
                {
                    "key": "meta3d",
                    "fileData": [{
                        "protocolName": "test1-protocol", "protocolVersion": "^0.0.1",
                        "name": "test1",
                        "version": "0.0.2",
                        "displayName": "test1",
                        "repoLink": "",
                        "description": "",
                        "fileID": fileID1
                    }]
                },
                marketImplementCollectionData
            ])
        });
    });

    // test('update fileID in collection if exist', ({ given, and, when, then }) => {
    //     let app = { "a": true }
    //     let distFileContent1 = "dist1"
    //     let distFileContent2 = "dist2"
    //     let generatedResult1 = new ArrayBuffer(0)
    //     let generatedResult2 = new ArrayBuffer(1)
    //     let fileID1 = "id1"
    //     let fileID2 = "id2"

    //     _prepare(given)

    //     given('prepare funcs', () => {
    //         _createFuncs(sandbox)

    //         readJsonFunc.returns(
    //             just(_buildPackageJson(
    //                 "test1",
    //                 "0.0.2",
    //                 { name: "test1-protocol" }, "meta3d",
    //                 {
    //                 }, {},
    //                 {
    //                     "test1-protocol": "^0.0.1"
    //                 }
    //             ))
    //         )
    //         initFunc.returns(
    //             just(app)
    //         )
    //         hasAccountFunc.returns(
    //             just(true)
    //         )
    //         readFileSyncFunc.onCall(0).returns(distFileContent1)
    //         readFileSyncFunc.onCall(1).returns(distFileContent2)
    //         generateFunc.onCall(0).returns(generatedResult1)
    //         generateFunc.onCall(1).returns(generatedResult2)
    //         uploadFileFunc.onCall(0).returns(
    //             just({ fileID: fileID1 })
    //         )
    //         uploadFileFunc.onCall(1).returns(
    //             just({ fileID: fileID2 })
    //         )
    //         getMarketImplementAccountDataFunc.onCall(0).returns(
    //             resolve({
    //                 data: [
    //                     {
    //                         fileData: []
    //                     }
    //                 ]
    //             })
    //         )
    //         getMarketImplementAccountDataFunc.onCall(1).returns(
    //             resolve({
    //                 data: [
    //                     {
    //                         fileData: [
    //                             {
    //                                 protocolName: "test1-protocol",
    //                                 version: "0.0.2"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             })
    //         )
    //     });

    //     and('publish extension', () => {
    //         return _publishExtension()
    //     });

    //     when('publish extension with same protocolName and version but different dist file', () => {
    //         return _publishExtension()
    //     });

    //     then('should upload generated file', () => {
    //         expect(uploadFileFunc.getCall(1)).toCalledWith([
    //             app,
    //             "extensions/test1_0.0.2.arrayBuffer",
    //             Buffer.from(generatedResult2)
    //         ])
    //     });

    //     and('should update fileID in collection', () => {
    //         expect(updateMarketImplementDataFunc.getCall(1)).toCalledWith([
    //             app,
    //             "publishedextensions",
    //             { "account": "meta3d" },
    //             {
    //                 "fileData": [{
    //                     "protocolName": "test1-protocol", "protocolVersion": "^0.0.1",
    //                     "version": "0.0.2",
    //                     "fileID": fileID2
    //                 }]
    //             }
    //         ])
    //     });
    // });

    test('if extension with the same publisher, name, version, protocol name exist, throw error', ({ given, when, then, and }) => {
        let app = { "app": true }
        let distFileContent = "dist"
        let generatedResult = new ArrayBuffer(0)
        let fileID1 = "id1"

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox, sandbox.stub())

            readJsonFunc.returns(
                just(_buildPackageJson(
                    "test1",
                    "0.0.2",
                    { name: "test1-protocol" }, "meta3d",
                    // {
                    // }, {},
                    {
                        "test1-protocol": "^0.0.1"
                    }
                ))
            )
            initFunc.returns(
                just(app)
            )
            hasAccountFunc.returns(
                just(true)
            )
            readFileSyncFunc.returns(distFileContent)
            generateFunc.returns(generatedResult)
            uploadFileFunc.returns(
                empty()
            )
            getMarketImplementAccountDataFunc.onCall(0).returns(
                resolve([{
                    fileData: []
                }, []])
            )
            getMarketImplementAccountDataFunc.onCall(1).returns(
                resolve([{
                    fileData: [
                        {
                            protocolName: "test1-protocol",
                            name: "test1",
                            version: "0.0.2"
                        }
                    ]
                }, []])
            )
        });

        and('publish extension', () => {
            return _publishExtension()
        });

        when('publish extension with the same publisher, name, version, protocol name', () => {
            return _publishExtension()
        });

        then('should error', () => {
            expect(
                errorFunc.getCall(0).args[1].message
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
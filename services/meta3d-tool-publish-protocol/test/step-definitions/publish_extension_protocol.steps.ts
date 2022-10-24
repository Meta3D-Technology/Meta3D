import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { empty, just } from "most";
import { publish } from "../../src/Publish"
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { addShopProtocolDataToDataFromShopProtocolCollectionData, getDataFromShopProtocolCollection, isContain } from "meta3d-tool-utils/src/publish/CloudbaseService";

const feature = loadFeature("./test/features/publish_extension_protocol.feature")

defineFeature(feature, test => {
    let sandbox = null
    let readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasAccountFunc, getShopProtocolCollectionFunc, isContainFunc, addDataToShopProtocolCollectionFunc, addShopProtocolDataToDataFromShopProtocolCollectionDataFunc, getDataFromShopProtocolCollectionFunc

    function _createFuncs(sandbox, errorFuncStub = console.error) {
        readFileSyncFunc = sandbox.stub()
        logFunc = sandbox.stub()
        errorFunc = errorFuncStub
        readJsonFunc = sandbox.stub()
        initFunc = sandbox.stub()
        hasAccountFunc = sandbox.stub()
        getShopProtocolCollectionFunc = sandbox.stub()
        isContainFunc = isContain
        addDataToShopProtocolCollectionFunc = sandbox.stub()
        addShopProtocolDataToDataFromShopProtocolCollectionDataFunc = addShopProtocolDataToDataFromShopProtocolCollectionData
        getDataFromShopProtocolCollectionFunc = getDataFromShopProtocolCollection
    }

    function _buildPackageJson(name = "test1-protocol",
        version = "0.0.1",
        account = "0xf60") {
        return { name, version, publisher: account }
    }

    function _publishExtensionProtocol(packageFilePath = "", iconPath = "a.png") {
        return publish(
            [readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasAccountFunc, getShopProtocolCollectionFunc, isContainFunc, addDataToShopProtocolCollectionFunc, addShopProtocolDataToDataFromShopProtocolCollectionDataFunc, getDataFromShopProtocolCollectionFunc],
            packageFilePath, iconPath,
            "extension"
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

        when('publish extension protocol', () => {
            return _publishExtensionProtocol()
        });

        then(/^should error: "(.*)"$/, (arg0) => {
            expect(
                errorFunc.getCall(0).args[1].message
            ).toEqual(
                arg0
            )
        });
    });

    test('add to collection', ({ given, when, then, and }) => {
        let app = {}
        let iconContent = "v91"
        let collectionData = {
            data: []
        }

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            readJsonFunc.returns(
                just(_buildPackageJson(
                    "test1-protocol",
                    "0.0.2",
                    "meta3d",
                ))
            )
            initFunc.returns(
                just(app)
            )
            hasAccountFunc.returns(
                just(true)
            )
            readFileSyncFunc.returns(iconContent)
            getShopProtocolCollectionFunc.returns(
                resolve(collectionData)
            )
        });

        when('publish extension protocol', () => {
            return _publishExtensionProtocol()
        });

        then('should add to collection', () => {
            expect(addDataToShopProtocolCollectionFunc).toCalledWith([
                app,
                addShopProtocolDataToDataFromShopProtocolCollectionDataFunc,
                "publishedextensionprotocols",
                "publishedextensionprotocols",
                getDataFromShopProtocolCollectionFunc(collectionData),
                {
                    "name": "test1-protocol",
                    "version": "0.0.2",
                    "account": "meta3d",
                    "iconBase64": "data:image/png;base64, " + iconContent
                }
            ])
        });
    });

    // test('update icon base64 in collection if exist', ({ given, and, when, then }) => {
    //     let app = {}
    //     let iconContent1 = "i1"
    //     let iconContent2 = "i2"

    //     _prepare(given)

    //     given('prepare funcs', () => {
    //         _createFuncs(sandbox)

    //         readJsonFunc.returns(
    //             just(_buildPackageJson(
    //                 "test1-protocol",
    //                 "0.0.2",
    //                 "meta3d"
    //             ))
    //         )
    //         initFunc.returns(
    //             just(app)
    //         )
    //         hasAccountFunc.returns(
    //             just(true)
    //         )
    //         readFileSyncFunc.onCall(0).returns(iconContent1)
    //         readFileSyncFunc.onCall(1).returns(iconContent2)
    //         getShopProtocolCollectionFunc.onCall(0).returns(
    //             resolve({
    //                 data: []
    //             })
    //         )
    //         getShopProtocolCollectionFunc.onCall(1).returns(
    //             resolve({
    //                 data: [
    //                     {
    //                         name: "test1-protocol",
    //                         version: "0.0.2",
    //                         account: "meta3d"
    //                     }
    //                 ]
    //             })
    //         )
    //     });

    //     and('publish extension protocol', () => {
    //         return _publishExtensionProtocol()
    //     });

    //     when('publish extension protocol with same name and version but different icon', () => {
    //         return _publishExtensionProtocol()
    //     });

    //     then('should update icon base64 in collection', () => {
    //         expect(addDataToShopProtocolCollectionFunc.getCall(1)).toCalledWith([
    //             app,
    //             "publishedextensionprotocols",
    //             {
    //                 "protocols": [{
    //                     "name": "test1-protocol",
    //                     "version": "0.0.2",
    //                     "account": "meta3d",
    //                     "iconBase64": "data:image/png;base64, " + iconContent2
    //                 }]
    //             }
    //         ])
    //     });
    // });

    test('if extension protocol exist, throw error', ({ given, and, when, then }) => {
        let app = {}

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox, sandbox.stub())

            readJsonFunc.returns(
                just(_buildPackageJson(
                    "test1-protocol",
                    "0.0.2",
                    "meta3d"
                ))
            )
            initFunc.returns(
                just(app)
            )
            hasAccountFunc.returns(
                just(true)
            )
            getShopProtocolCollectionFunc.onCall(0).returns(
                resolve({
                    data: []
                })
            )
            getShopProtocolCollectionFunc.onCall(1).returns(
                resolve({
                    data: [
                        {
                            name: "test1-protocol",
                            version: "0.0.2",
                            account: "meta3d"
                        }
                    ]
                })
            )
        });

        and('publish extension protocol', () => {
            return _publishExtensionProtocol()
        });

        when('publish extension protocol with same name and version', () => {
            return _publishExtensionProtocol()
        });

        then('should error', () => {
            expect(
                errorFunc.getCall(0).args[1].message
            ).toEqual(
                "version: 0.0.2 already exist, please update version"
            )
        });
    });

    test('icon\'s format should be png', ({ given, and, when, then }) => {
        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox, sandbox.stub())

            readJsonFunc.returns(
                just(_buildPackageJson())
            )
            initFunc.returns(
                just({})
            )
            hasAccountFunc.returns(
                just(true)
            )
        });

        when('publish extension protocol with jpeg icon', () => {
            return _publishExtensionProtocol("", "a.jpeg")
        });

        then(/^should error: "(.*)"$/, (arg0) => {
            expect(
                errorFunc.getCall(0).args[1].message
            ).toEqual(
                arg0
            )
        });
    });
})
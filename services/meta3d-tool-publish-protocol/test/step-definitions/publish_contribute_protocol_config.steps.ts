import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { empty, just } from "most";
import { publishConfig } from "../../src/Publish"
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { addDataToBody, isContain } from "meta3d-tool-utils/src/publish/CloudbaseService";

const feature = loadFeature("./test/features/publish_contribute_protocol_config.feature")

defineFeature(feature, test => {
    let sandbox = null
    let readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasDataFunc, getCollectionFunc, isContainFunc, addDataFunc, addDataToBodyFunc

    function _createFuncs(sandbox, errorFuncStub = console.error) {
        readFileSyncFunc = sandbox.stub()
        logFunc = sandbox.stub()
        errorFunc = errorFuncStub
        readJsonFunc = sandbox.stub()
        initFunc = sandbox.stub()
        hasDataFunc = sandbox.stub()
        getCollectionFunc = sandbox.stub()
        isContainFunc = isContain
        addDataFunc = sandbox.stub()
        addDataToBodyFunc = addDataToBody

    }

    function _buildPackageJson(name = "test1-protocol",
        version = "0.0.1",
        account = "0xf60") {
        return { name, version, publisher: account }
    }

    function _publishContributeProtocolConfig(packageFilePath = "", distFilePath = "main.js") {
        return publishConfig(
            [readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasDataFunc, getCollectionFunc, isContainFunc, addDataFunc, addDataToBodyFunc],
            packageFilePath, distFilePath,
            "contribute"
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
            hasDataFunc.returns(
                just(false)
            )
        });

        when('publish contribute protocol config', () => {
            return _publishContributeProtocolConfig()
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
        let distFileContent = "config content"
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
            hasDataFunc.returns(
                just(true)
            )
            readFileSyncFunc.returns(distFileContent)
            getCollectionFunc.returns(
                resolve(collectionData)
            )
        });

        when('publish contribute protocol config', () => {
            return _publishContributeProtocolConfig()
        });

        then('should add to collection', () => {
            expect(addDataFunc).toCalledWith([
                app,
                addDataToBodyFunc,
                "publishedcontributeprotocolconfigs",
                "publishedcontributeprotocolconfigs",
                collectionData,
                {
                    "name": "test1-protocol",
                    "version": "0.0.2",
                    "account": "meta3d",
                    "configStr": distFileContent
                }
            ])
        });
    });

    test('if contribute protocol config exist, throw error', ({ given, and, when, then }) => {
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
            hasDataFunc.returns(
                just(true)
            )
            getCollectionFunc.onCall(0).returns(
                resolve({
                    data: []
                })
            )
            getCollectionFunc.onCall(1).returns(
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

        and('publish contribute protocol config', () => {
            return _publishContributeProtocolConfig()
        });

        when('publish contribute protocol config with same name and version', () => {
            return _publishContributeProtocolConfig()
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
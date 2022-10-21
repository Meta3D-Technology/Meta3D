import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { empty, just } from "most";
import { publishConfig } from "../../src/Publish"
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"

const feature = loadFeature("./test/features/publish_contribute_protocol_config.feature")

defineFeature(feature, test => {
    let sandbox = null
    let readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasDataFunc, getCollectionFunc, addDataFunc

    function _createFuncs(sandbox, errorFuncStub = console.error) {
        readFileSyncFunc = sandbox.stub()
        logFunc = sandbox.stub()
        errorFunc = errorFuncStub
        readJsonFunc = sandbox.stub()
        initFunc = sandbox.stub()
        hasDataFunc = sandbox.stub()
        getCollectionFunc = sandbox.stub()
        addDataFunc = sandbox.stub()
    }

    function _buildPackageJson(name = "test1-protocol",
        version = "0.0.1",
        username = "meta3d") {
        return { name, version, publisher: username }
    }

    function _publishContributeProtocolConfig(packageFilePath = "", distFilePath = "main.js") {
        return publishConfig(
            [readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasDataFunc, getCollectionFunc, addDataFunc],
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

        then(/^should error:                 "(.*)"$/, (arg0) => {
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
                resolve({
                    data: []
                })
            )
        });

        when('publish contribute protocol config', () => {
            return _publishContributeProtocolConfig()
        });

        then('should add to collection', () => {
            expect(addDataFunc).toCalledWith([
                app,
                "publishedcontributeprotocolconfigs",
                {
                    "name": "test1-protocol",
                    "version": "0.0.2",
                    "username": "meta3d",
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
                            username: "meta3d"
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
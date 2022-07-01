import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { _register, _checkUserName } from "../../src/application_layer/user/RegisterService"
import { just } from "most";

const feature = loadFeature("./test/features/register.feature")

defineFeature(feature, test => {
    let sandbox = null

    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('register', ({ given, when, then, and }) => {
        let username = "u1"
        let password = "p1"
        let addDataFunc

        function _createFuncs(sandbox) {
            addDataFunc = sandbox.stub()
        }

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            addDataFunc.returns(
                resolve(null)
            )
        });

        when('register', () => {
            return _register(addDataFunc, username, password)
        });

        then('should add username, password to collection', () => {
            expect(addDataFunc).toCalledWith([
                "user",
                {
                    username,
                    password
                }
            ])
        });

        and('create user empty data', () => {
            expect(addDataFunc).toCalledWith([
                "publishedExtensions",
                {
                    username,
                    fileData: []
                }
            ])
            expect(addDataFunc).toCalledWith([
                "publishedContributes",
                {
                    username,
                    fileData: []
                }
            ])
            expect(addDataFunc).toCalledWith([
                "publishedExtensionProtocols",
                {
                    username,
                    protocols: []
                }
            ])
            expect(addDataFunc).toCalledWith([
                "publishedContributeProtocols",
                {
                    username,
                    protocols: []
                }
            ])
        });
    });

    test('check username fail', ({ given, and, when, then }) => {
        let username = "u1"
        let notHasDataFunc

        function _createFuncs(sandbox) {
            notHasDataFunc = sandbox.stub()
        }

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)
        });

        and('register', () => {
            notHasDataFunc.withArgs("user", { username: username }).returns(
                just(false)
            )
        });

        when('check username', () => {
        });

        then('should fail', () => {
            return _checkUserName(notHasDataFunc, username).observe(result => {
                expect(result).toBeFalsy
            })
        })
    });

    test('check username success', ({ given, and, when, then }) => {
        let username = "u1"
        let notHasDataFunc

        function _createFuncs(sandbox) {
            notHasDataFunc = sandbox.stub()
        }

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            notHasDataFunc.withArgs("user", { username: username }).returns(
                just(true)
            )
        });

        when('check username', () => {
        });

        then('should success', () => {
            return _checkUserName(notHasDataFunc, username).observe(result => {
                expect(result).toBeTruthy
            })
        })
    });
})
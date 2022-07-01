import { loadFeature, defineFeature } from "jest-cucumber"
import { just } from "most";
import { createSandbox } from "sinon";
import { _isLoginSuccess } from "../../src/application_layer/user/LoginService"

const feature = loadFeature("./test/features/login.feature")

defineFeature(feature, test => {
    let sandbox = null
    let notHasDataFunc

    function _createFuncs(sandbox) {
        notHasDataFunc = sandbox.stub()
    }

    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('login fail: user not be registered', ({ given, when, then }) => {
        let username = "u1"
        let password = "p1"

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            notHasDataFunc.withArgs("user", { username }).returns(
                just(true)
            )
        });

        when('login', () => {
        });

        then('should fail', () => {
            return _isLoginSuccess(notHasDataFunc, username, password).observe(result => {
                expect(result).toEqual([false, "用户名未注册"])
            })
        });
    });

    test('login fail: password wrong', ({ given, and, when, then }) => {
        let username = "u1"
        let password = "p1"

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            notHasDataFunc.withArgs("user", { username, password }).returns(
                just(true)
            )
        });

        and('register', () => {
            notHasDataFunc.withArgs("user", { username }).returns(
                just(false)
            )
        });

        when('login with wrong password', () => {
        });

        then('should fail', () => {
            return _isLoginSuccess(notHasDataFunc, username, password).observe(result => {
                expect(result).toEqual([false, "密码不正确"])
            })
        });
    });

    test('login success', ({ given, and, when, then }) => {
        let username = "u1"
        let password = "p1"

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            notHasDataFunc.withArgs("user", { username, password }).returns(
                just(false)
            )
        });

        and('register', () => {
            notHasDataFunc.withArgs("user", { username }).returns(
                just(false)
            )
        });

        when('login', () => {
        });

        then('should success', () => {
            return _isLoginSuccess(notHasDataFunc, username, password).observe(result => {
                expect(result).toEqual([true, null])
            })
        });
    });
})
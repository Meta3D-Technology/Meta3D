"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const most_1 = require("most");
const sinon_1 = require("sinon");
const LoginService_1 = require("../../src/application_layer/user/LoginService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/login.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let notHasDataFunc;
    function _createFuncs(sandbox) {
        notHasDataFunc = sandbox.stub();
    }
    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    }
    test('login fail: user not be registered', ({ given, when, then }) => {
        let username = "u1";
        let password = "p1";
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            notHasDataFunc.withArgs("user", { username }).returns((0, most_1.just)(true));
        });
        when('login', () => {
        });
        then('should fail', () => {
            return (0, LoginService_1.isLoginSuccess)(notHasDataFunc, username, password).observe(result => {
                expect(result).toEqual([false, "用户名未注册"]);
            });
        });
    });
    test('login fail: password wrong', ({ given, and, when, then }) => {
        let username = "u1";
        let password = "p1";
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            notHasDataFunc.withArgs("user", { username, password }).returns((0, most_1.just)(true));
        });
        and('register', () => {
            notHasDataFunc.withArgs("user", { username }).returns((0, most_1.just)(false));
        });
        when('login with wrong password', () => {
        });
        then('should fail', () => {
            return (0, LoginService_1.isLoginSuccess)(notHasDataFunc, username, password).observe(result => {
                expect(result).toEqual([false, "密码不正确"]);
            });
        });
    });
    test('login success', ({ given, and, when, then }) => {
        let username = "u1";
        let password = "p1";
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            notHasDataFunc.withArgs("user", { username, password }).returns((0, most_1.just)(false));
        });
        and('register', () => {
            notHasDataFunc.withArgs("user", { username }).returns((0, most_1.just)(false));
        });
        when('login', () => {
        });
        then('should success', () => {
            return (0, LoginService_1.isLoginSuccess)(notHasDataFunc, username, password).observe(result => {
                expect(result).toEqual([true, null]);
            });
        });
    });
});

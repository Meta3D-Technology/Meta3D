"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const LoginService_1 = require("../../src/application_layer/user/LoginService");
const most_1 = require("most");
// import { getElementAssembleData } from "../../src/application_layer/assemble_space/element_assemble/GetElementDataService";
// import { getDataFromMarketImplementAccountData } from "meta3d-backend-cloudbase";
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/login.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let hasDataFunc;
    let _createFuncs = (sandbox) => {
        hasDataFunc = sandbox.stub();
    };
    let _isLoginSuccess = (account) => {
        return (0, LoginService_1.isLoginSuccess)(hasDataFunc, account);
    };
    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    };
    test('login fail', ({ given, when, then, and }) => {
        let account = "u1";
        let data;
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            hasDataFunc.returns((0, most_1.just)(false));
        });
        when('get is u1 login success', () => {
            return _isLoginSuccess(account).observe(result => {
                data = result;
            });
        });
        then('should return false data', () => {
            expect(data).toEqual([false, "用户名未注册"]);
        });
    });
    test('login success', ({ given, when, then, and }) => {
        let account = "u1";
        let data;
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            hasDataFunc.returns((0, most_1.just)(false));
            hasDataFunc.withArgs(sinon_1.match.string, account).returns((0, most_1.just)(true));
        });
        and('register user u1', () => {
        });
        when('get is u1 login success', () => {
            return _isLoginSuccess(account).observe(result => {
                data = result;
            });
        });
        then('should return true data', () => {
            expect(data).toEqual([true, null]);
        });
    });
});
//# sourceMappingURL=login.steps.js.map
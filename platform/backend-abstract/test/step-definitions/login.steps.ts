import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox, match } from "sinon";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { isLoginSuccess } from "../../src/application_layer/user/LoginService";
import { just } from "most";
// import { getElementAssembleData } from "../../src/application_layer/assemble_space/element_assemble/GetElementDataService";
// import { getDataFromMarketImplementAccountData } from "meta3d-backend-cloudbase";

const feature = loadFeature("./test/features/login.feature")

defineFeature(feature, test => {
    let sandbox = null
    let hasDataFunc

    let _createFuncs = (sandbox) =>  {
        hasDataFunc = sandbox.stub()
    }

    let _isLoginSuccess = (account) =>  {
        return isLoginSuccess(
            hasDataFunc,
            account
        )
    }

    let _prepare = (given) =>  {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('login fail', ({ given, when, then, and }) => {
        let account = "u1"
        let data

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            hasDataFunc.returns(
                just(false)
            )
        });

        when('get is u1 login success', () => {
            return _isLoginSuccess(
                account
            ).observe(result => {
                data = result
            })
        });

        then('should return false data', () => {
            expect(data).toEqual([false, "邮箱未注册"])
        });
    });


    test('login success', ({ given, when, then, and }) => {
        let account = "u1"
        let data

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            hasDataFunc.returns(
                just(false)
            )
            hasDataFunc.withArgs(match.string, account).returns(
                just(true)
            )
        });

        and('register user u1', () => {
        });

        when('get is u1 login success', () => {
            return _isLoginSuccess(
                account
            ).observe(result => {
                data = result
            })
        });

        then('should return true data', () => {
            expect(data).toEqual([true, null])
        });
    });
})
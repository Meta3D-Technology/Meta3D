"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const RegisterService_1 = require("../../src/application_layer/user/RegisterService");
const most_1 = require("most");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/register.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    }
    test('register', ({ given, when, then, and }) => {
        let username = "u1";
        let password = "p1";
        let addDataFunc;
        function _createFuncs(sandbox) {
            addDataFunc = sandbox.stub();
        }
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            addDataFunc.returns((0, PromiseTool_1.resolve)(null));
        });
        when('register', () => {
            return (0, RegisterService_1.register)(addDataFunc, username, password);
        });
        then('should add username, password to collection', () => {
            expect(addDataFunc).toCalledWith([
                "user",
                {
                    username,
                    password
                }
            ]);
        });
        and('create user empty data', () => {
            expect(addDataFunc).toCalledWith([
                "publishedExtensions",
                {
                    username,
                    fileData: []
                }
            ]);
            expect(addDataFunc).toCalledWith([
                "publishedContributes",
                {
                    username,
                    fileData: []
                }
            ]);
            // expect(addDataFunc).toCalledWith([
            //     "publishedExtensionProtocols",
            //     {
            //         username,
            //         protocols: []
            //     }
            // ])
            // expect(addDataFunc).toCalledWith([
            //     "publishedContributeProtocols",
            //     {
            //         username,
            //         protocols: []
            //     }
            // ])
        });
    });
    test('check username fail', ({ given, and, when, then }) => {
        let username = "u1";
        let notHasDataFunc;
        function _createFuncs(sandbox) {
            notHasDataFunc = sandbox.stub();
        }
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
        });
        and('register', () => {
            notHasDataFunc.withArgs("user", { username: username }).returns((0, most_1.just)(false));
        });
        when('check username', () => {
        });
        then('should fail', () => {
            return (0, RegisterService_1.checkUserName)(notHasDataFunc, username).observe(result => {
                expect(result).toBeFalsy;
            });
        });
    });
    test('check username success', ({ given, and, when, then }) => {
        let username = "u1";
        let notHasDataFunc;
        function _createFuncs(sandbox) {
            notHasDataFunc = sandbox.stub();
        }
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            notHasDataFunc.withArgs("user", { username: username }).returns((0, most_1.just)(true));
        });
        when('check username', () => {
        });
        then('should success', () => {
            return (0, RegisterService_1.checkUserName)(notHasDataFunc, username).observe(result => {
                expect(result).toBeTruthy;
            });
        });
    });
});

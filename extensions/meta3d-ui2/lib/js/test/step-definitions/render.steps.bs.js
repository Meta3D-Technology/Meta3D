'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Sinon$1 = require("sinon");
var Caml_option = require("rescript/lib/js/caml_option.js");
var JestCucumber = require("jest-cucumber");
var MainTool$Meta3dUi2 = require("../tool/MainTool.bs.js");
var SinonTool$Meta3dUi2 = require("../tool/SinonTool.bs.js");
var Operators$Meta3dBsJestCucumber = require("meta3d-bs-jest-cucumber/lib/js/src/Operators.bs.js");
var CucumberAsync$Meta3dBsJestCucumber = require("meta3d-bs-jest-cucumber/lib/js/src/CucumberAsync.bs.js");
var ImguiRendererServiceTool$Meta3dUi2 = require("../tool/ImguiRendererServiceTool.bs.js");

var feature = JestCucumber.loadFeature("./test/features/render.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var sandbox = {
          contents: 1
        };
        var _prepare = function (given) {
          return Curry._2(given, "prepare sandbox", (function (param) {
                        sandbox.contents = Sinon$1.sandbox.create();
                        
                      }));
        };
        test("if not show, not exec", (function (param) {
                var and = param.and;
                var state = {
                  contents: 1
                };
                var elementName1 = "e1";
                var getExtensionStateStub = {
                  contents: 1
                };
                var execFunc1Stub = {
                  contents: 1
                };
                _prepare(param.given);
                Curry._2(and, "register element func1", (function (param) {
                        state.contents = MainTool$Meta3dUi2.createState(undefined);
                        execFunc1Stub.contents = Sinon.createEmptyStub(sandbox.contents);
                        state.contents = MainTool$Meta3dUi2.registerElement(sandbox, state.contents, execFunc1Stub.contents, elementName1, undefined, undefined, undefined, undefined);
                        
                      }));
                Curry._2(and, "hide it", (function (param) {
                        state.contents = MainTool$Meta3dUi2.hide(state.contents, elementName1);
                        
                      }));
                Curry._2(and, "prepare api", (function (param) {
                        var __x = Sinon.createEmptyStub(sandbox.contents);
                        getExtensionStateStub.contents = Sinon.returns(state.contents, __x);
                        
                      }));
                CucumberAsync$Meta3dBsJestCucumber.execStep(param.when, "render", (function (param) {
                        return MainTool$Meta3dUi2.render(sandbox, undefined, undefined, Caml_option.some(getExtensionStateStub.contents), undefined, undefined, undefined, undefined, undefined, undefined);
                      }));
                return Curry._2(param.then, "not exec func1", (function (param) {
                              return Operators$Meta3dBsJestCucumber.$eq(expect(Sinon.getCallCount(execFunc1Stub.contents)), 0);
                            }));
              }));
        test("else, invoke imgui renderer's before exec and exec and mark state not change by ascending order and invoke imgui renderer's after exec", (function (param) {
                var and = param.and;
                var state = {
                  contents: 1
                };
                var elementName1 = "e1";
                var elementName2 = "e2";
                var imguiRendererService = {
                  contents: 1
                };
                var getExtensionServiceStub = {
                  contents: 1
                };
                var getExtensionStateStub = {
                  contents: 1
                };
                var setExtensionStateStub = {
                  contents: 1
                };
                var beforeExecStub = {
                  contents: 1
                };
                var afterExecStub = {
                  contents: 1
                };
                var execFunc1Stub = {
                  contents: 1
                };
                var execFunc2Stub = {
                  contents: 1
                };
                _prepare(param.given);
                Curry._2(and, "prepare imgui renderer service", (function (param) {
                        beforeExecStub.contents = Sinon.returns(13, Sinon.createEmptyStub(sandbox.contents));
                        afterExecStub.contents = Sinon.returns(14, Sinon.createEmptyStub(sandbox.contents));
                        imguiRendererService.contents = ImguiRendererServiceTool$Meta3dUi2.buildService(sandbox, undefined, undefined, undefined, beforeExecStub.contents, afterExecStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                        
                      }));
                Curry._2(and, "register element func1 with exec order=1", (function (param) {
                        state.contents = MainTool$Meta3dUi2.createState(undefined);
                        var __x = Sinon.createEmptyStub(sandbox.contents);
                        execFunc1Stub.contents = Sinon.returns(Promise.resolve(1), __x);
                        state.contents = MainTool$Meta3dUi2.registerElement(sandbox, state.contents, execFunc1Stub.contents, elementName1, 1, undefined, undefined, undefined);
                        
                      }));
                Curry._2(and, "register element func2 with exec order=0", (function (param) {
                        var __x = Sinon.createEmptyStub(sandbox.contents);
                        execFunc2Stub.contents = Sinon.returns(Promise.resolve(1), __x);
                        state.contents = MainTool$Meta3dUi2.registerElement(sandbox, state.contents, execFunc2Stub.contents, elementName2, 0, undefined, undefined, undefined);
                        
                      }));
                Curry._2(and, "mark their states change", (function (param) {
                        state.contents = MainTool$Meta3dUi2.markStateChange(state.contents, elementName1);
                        state.contents = MainTool$Meta3dUi2.markStateChange(state.contents, elementName2);
                        
                      }));
                Curry._2(and, "show them", (function (param) {
                        state.contents = MainTool$Meta3dUi2.show(state.contents, elementName1);
                        state.contents = MainTool$Meta3dUi2.show(state.contents, elementName2);
                        
                      }));
                Curry._2(and, "prepare api", (function (param) {
                        var __x = Sinon.createEmptyStub(sandbox.contents);
                        getExtensionServiceStub.contents = Sinon.returns(imguiRendererService.contents, __x);
                        getExtensionStateStub.contents = Sinon.createEmptyStub(sandbox.contents);
                        var __x$1 = getExtensionStateStub.contents;
                        Sinon.returns(state.contents, __x$1);
                        Sinon.returns(12, Sinon.onCall(1, getExtensionStateStub.contents));
                        Sinon.returns(13, Sinon.onCall(3, getExtensionStateStub.contents));
                        setExtensionStateStub.contents = Sinon.createEmptyStub(sandbox.contents);
                        
                      }));
                CucumberAsync$Meta3dBsJestCucumber.execStep(param.when, "render", (function (param) {
                        return MainTool$Meta3dUi2.render(sandbox, Caml_option.some(getExtensionServiceStub.contents), undefined, Caml_option.some(getExtensionStateStub.contents), Caml_option.some(setExtensionStateStub.contents), undefined, undefined, undefined, 10.0, undefined);
                      }));
                Curry._2(param.then, "invoke imgui renderer's before exec with time", (function (param) {
                        return Operators$Meta3dBsJestCucumber.$eq(expect([
                                        Sinon.getCallCount(beforeExecStub.contents),
                                        Sinon.calledBefore(beforeExecStub.contents, execFunc2Stub.contents),
                                        SinonTool$Meta3dUi2.calledWithArg2(Sinon.getCall(0, beforeExecStub.contents), 12, 10.0)
                                      ]), [
                                    1,
                                    true,
                                    true
                                  ]);
                      }));
                Curry._2(and, "exec func2 and func1", (function (param) {
                        return Operators$Meta3dBsJestCucumber.$eq(expect([
                                        Sinon.getCallCount(execFunc1Stub.contents),
                                        Sinon.getCallCount(execFunc2Stub.contents),
                                        Sinon.calledBefore(execFunc2Stub.contents, execFunc1Stub.contents)
                                      ]), [
                                    1,
                                    1,
                                    true
                                  ]);
                      }));
                Curry._2(and, "mark their states not change", (function (param) {
                        var state = SinonTool$Meta3dUi2.getArg(setExtensionStateStub.contents, 2, 2, undefined);
                        return Operators$Meta3dBsJestCucumber.$eq(expect([
                                        MainTool$Meta3dUi2.isStateChange(state, elementName1),
                                        MainTool$Meta3dUi2.isStateChange(state, elementName2)
                                      ]), [
                                    false,
                                    false
                                  ]);
                      }));
                return Curry._2(and, "invoke imgui renderer's after exec", (function (param) {
                              return Operators$Meta3dBsJestCucumber.$eq(expect([
                                              Sinon.getCallCount(afterExecStub.contents),
                                              Sinon.calledAfter(afterExecStub.contents, execFunc1Stub.contents),
                                              SinonTool$Meta3dUi2.calledWith(Sinon.getCall(0, afterExecStub.contents), 13)
                                            ]), [
                                          1,
                                          true,
                                          true
                                        ]);
                            }));
              }));
        return test("render imgui renderer", (function (param) {
                      var and = param.and;
                      var imguiRendererExtensionName = "imguiRendererExtensionName";
                      var imguiRendererService = {
                        contents: 1
                      };
                      var renderStub = {
                        contents: 1
                      };
                      var getExtensionServiceStub = {
                        contents: 1
                      };
                      var getExtensionStateStub = {
                        contents: 1
                      };
                      var setExtensionStateStub = {
                        contents: 1
                      };
                      _prepare(param.given);
                      Curry._2(and, "prepare imgui renderer service", (function (param) {
                              renderStub.contents = Sinon.createEmptyStub(sandbox.contents);
                              imguiRendererService.contents = ImguiRendererServiceTool$Meta3dUi2.buildService(sandbox, undefined, undefined, renderStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                              
                            }));
                      Curry._2(and, "prepare api", (function (param) {
                              var __x = Sinon.createEmptyStub(sandbox.contents);
                              getExtensionServiceStub.contents = Sinon.returns(imguiRendererService.contents, __x);
                              getExtensionStateStub.contents = Sinon.createEmptyStub(sandbox.contents);
                              var __x$1 = getExtensionStateStub.contents;
                              Sinon.returns(MainTool$Meta3dUi2.createState(undefined), __x$1);
                              setExtensionStateStub.contents = Sinon.createEmptyStub(sandbox.contents);
                              
                            }));
                      CucumberAsync$Meta3dBsJestCucumber.execStep(param.when, "render", (function (param) {
                              var __x = MainTool$Meta3dUi2.render(sandbox, Caml_option.some(getExtensionServiceStub.contents), undefined, Caml_option.some(getExtensionStateStub.contents), Caml_option.some(setExtensionStateStub.contents), undefined, imguiRendererExtensionName, undefined, undefined, undefined);
                              return __x.then(function (meta3dState) {
                                          return Promise.resolve(meta3dState);
                                        });
                            }));
                      Curry._2(param.then, "render imgui renderer", (function (param) {
                              var __x = getExtensionStateStub.contents;
                              var __x$1 = getExtensionServiceStub.contents;
                              return Operators$Meta3dBsJestCucumber.$eq(expect([
                                              Sinon.getCallCount(Sinon.withTwoArgs(Sinon$1.match.any, imguiRendererExtensionName, __x)),
                                              Sinon.getCallCount(Sinon.withTwoArgs(Sinon$1.match.any, imguiRendererExtensionName, __x$1)),
                                              Sinon.getCallCount(renderStub.contents)
                                            ]), [
                                          2,
                                          2,
                                          1
                                        ]);
                            }));
                      return Curry._2(and, "update imgui renderer state", (function (param) {
                                    return Operators$Meta3dBsJestCucumber.$eq(expect(SinonTool$Meta3dUi2.calledWithArg3(Sinon.getCall(3, setExtensionStateStub.contents), Sinon$1.match.any, imguiRendererExtensionName, Sinon$1.match.any)), true);
                                  }));
                    }));
      }));

exports.feature = feature;
/* feature Not a pure module */

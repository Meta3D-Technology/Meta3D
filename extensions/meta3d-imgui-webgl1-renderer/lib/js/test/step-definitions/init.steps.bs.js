'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Sinon$1 = require("sinon");
var Caml_option = require("rescript/lib/js/caml_option.js");
var JestCucumber = require("jest-cucumber");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Operators$Meta3dBsJestCucumber = require("meta3d-bs-jest-cucumber/lib/js/src/Operators.bs.js");
var MainTool$Meta3dImguiWebgl1Renderer = require("../tool/MainTool.bs.js");
var SinonTool$Meta3dImguiWebgl1Renderer = require("../tool/SinonTool.bs.js");
var ShaderData$Meta3dImguiWebgl1Renderer = require("../../src/ShaderData.bs.js");
var WebGL1ServiceTool$Meta3dImguiWebgl1Renderer = require("../tool/WebGL1ServiceTool.bs.js");

var feature = JestCucumber.loadFeature("./test/features/init.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var sandbox = {
          contents: 1
        };
        var state = {
          contents: 1
        };
        var webgl1Service = {
          contents: 1
        };
        var _prepare = function (given) {
          return Curry._2(given, "prepare sandbox", (function (param) {
                        sandbox.contents = Sinon$1.sandbox.create();
                        
                      }));
        };
        test("get webgl1 context", (function (param) {
                var given = param.given;
                var getContextStub = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(param.and, "prepare webgl1 service", (function (param) {
                        getContextStub.contents = Sinon.returns(2, Sinon.createEmptyStub(sandbox.contents));
                        webgl1Service.contents = WebGL1ServiceTool$Meta3dImguiWebgl1Renderer.buildService(sandbox, getContextStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                        
                      }));
                Curry._2(given, "prepare canvas", (function (param) {
                        
                      }));
                Curry._2(param.when, "init", (function (param) {
                        state.contents = MainTool$Meta3dImguiWebgl1Renderer.init(sandbox, webgl1Service.contents, undefined, false, 10, undefined);
                        
                      }));
                return Curry._2(param.then, "get webgl context with config", (function (param) {
                              return Operators$Meta3dBsJestCucumber.$eq(expect([
                                              state.contents.gl,
                                              SinonTool$Meta3dImguiWebgl1Renderer.calledWithArg2(Sinon.getCall(0, getContextStub.contents), 10, {
                                                    alpha: true,
                                                    depth: true,
                                                    stencil: false,
                                                    antialias: true,
                                                    premultipliedAlpha: true,
                                                    preserveDrawingBuffer: false
                                                  })
                                            ]), [
                                          2,
                                          true
                                        ]);
                            }));
              }));
        test("create program", (function (param) {
                var createProgramStub = {
                  contents: 1
                };
                _prepare(param.given);
                Curry._2(param.and, "prepare webgl1 service", (function (param) {
                        createProgramStub.contents = Sinon.returns(2, Sinon.createEmptyStub(sandbox.contents));
                        webgl1Service.contents = WebGL1ServiceTool$Meta3dImguiWebgl1Renderer.buildService(sandbox, undefined, createProgramStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                        
                      }));
                Curry._2(param.when, "init", (function (param) {
                        state.contents = MainTool$Meta3dImguiWebgl1Renderer.init(sandbox, webgl1Service.contents, undefined, undefined, undefined, undefined);
                        
                      }));
                return Curry._2(param.then, "create no texture program", (function (param) {
                              return Operators$Meta3dBsJestCucumber.$eq(expect([
                                              OptionSt$Meta3dCommonlib.getExn(state.contents.noTextureShaderData).program,
                                              Sinon.getCallCount(createProgramStub.contents)
                                            ]), [
                                          2,
                                          1
                                        ]);
                            }));
              }));
        test("init shader", (function (param) {
                var createShaderStub = {
                  contents: 1
                };
                var shaderSourceStub = {
                  contents: 1
                };
                _prepare(param.given);
                Curry._2(param.and, "prepare webgl1 service", (function (param) {
                        createShaderStub.contents = Sinon.returns(2, Sinon.onCall(1, Sinon.returns(1, Sinon.onCall(0, Sinon.createEmptyStub(sandbox.contents)))));
                        shaderSourceStub.contents = Sinon.createEmptyStub(sandbox.contents);
                        webgl1Service.contents = WebGL1ServiceTool$Meta3dImguiWebgl1Renderer.buildService(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, shaderSourceStub.contents, undefined, createShaderStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                        
                      }));
                Curry._2(param.when, "init", (function (param) {
                        state.contents = MainTool$Meta3dImguiWebgl1Renderer.init(sandbox, webgl1Service.contents, undefined, undefined, undefined, undefined);
                        
                      }));
                return Curry._2(param.then, "init no texture shader", (function (param) {
                              return Operators$Meta3dBsJestCucumber.$eq(expect([
                                              SinonTool$Meta3dImguiWebgl1Renderer.calledWithArg3(Sinon.getCall(0, shaderSourceStub.contents), 1, ShaderData$Meta3dImguiWebgl1Renderer.vs_noTexture, Sinon$1.match.any),
                                              SinonTool$Meta3dImguiWebgl1Renderer.calledWithArg3(Sinon.getCall(1, shaderSourceStub.contents), 2, ShaderData$Meta3dImguiWebgl1Renderer.fs_noTexture, Sinon$1.match.any)
                                            ]), [
                                          true,
                                          true
                                        ]);
                            }));
              }));
        test("send no texture program uniform data", (function (param) {
                var and = param.and;
                var given = param.given;
                var canvas = {
                  width: 100,
                  height: 200
                };
                var createProgramStub = {
                  contents: 1
                };
                var useProgramStub = {
                  contents: 1
                };
                var getUniformLocationStub = {
                  contents: 1
                };
                var uniformMatrix4fvStub = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(and, "prepare webgl1 service", (function (param) {
                        createProgramStub.contents = Sinon.returns(1, Sinon.createEmptyStub(sandbox.contents));
                        useProgramStub.contents = Sinon.createEmptyStub(sandbox.contents);
                        getUniformLocationStub.contents = Sinon.returns(11, Sinon.withTwoArgs(1, "u_projectionMat", Sinon.createEmptyStub(sandbox.contents)));
                        uniformMatrix4fvStub.contents = Sinon.createEmptyStub(sandbox.contents);
                        webgl1Service.contents = WebGL1ServiceTool$Meta3dImguiWebgl1Renderer.buildService(sandbox, undefined, createProgramStub.contents, undefined, useProgramStub.contents, uniformMatrix4fvStub.contents, undefined, undefined, undefined, undefined, getUniformLocationStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                        
                      }));
                Curry._2(given, "prepare canvas", (function (param) {
                        
                      }));
                Curry._2(param.when, "init", (function (param) {
                        state.contents = MainTool$Meta3dImguiWebgl1Renderer.init(sandbox, webgl1Service.contents, undefined, undefined, Caml_option.some(canvas), undefined);
                        
                      }));
                Curry._2(param.then, "use program", (function (param) {
                        return Operators$Meta3dBsJestCucumber.$eq(expect([
                                        Sinon.getCallCount(useProgramStub.contents),
                                        SinonTool$Meta3dImguiWebgl1Renderer.calledWithArg2(Sinon.getCall(0, useProgramStub.contents), 1, Sinon$1.match.any)
                                      ]), [
                                    1,
                                    true
                                  ]);
                      }));
                return Curry._2(and, "send ortho projection matrix data", (function (param) {
                              return Operators$Meta3dBsJestCucumber.$eq(expect(SinonTool$Meta3dImguiWebgl1Renderer.calledWithArg3(uniformMatrix4fvStub.contents, 11, new Float32Array([
                                                      0.019999999552965164,
                                                      0,
                                                      0,
                                                      0,
                                                      0,
                                                      -0.009999999776482582,
                                                      0,
                                                      0,
                                                      0,
                                                      0,
                                                      -1,
                                                      0,
                                                      -1,
                                                      1,
                                                      -0,
                                                      1
                                                    ]), Sinon$1.match.any)), true);
                            }));
              }));
        test("get attribute location", (function (param) {
                var createProgramStub = {
                  contents: 1
                };
                var getAttribLocationStub = {
                  contents: 1
                };
                _prepare(param.given);
                Curry._2(param.and, "prepare webgl1 service", (function (param) {
                        createProgramStub.contents = Sinon.returns(1, Sinon.createEmptyStub(sandbox.contents));
                        getAttribLocationStub.contents = Sinon.createEmptyStub(sandbox.contents);
                        var __x = getAttribLocationStub.contents;
                        Sinon.returns(2, Sinon.withThreeArgs(1, "a_position", Sinon$1.match.any, __x));
                        var __x$1 = getAttribLocationStub.contents;
                        Sinon.returns(3, Sinon.withThreeArgs(1, "a_color", Sinon$1.match.any, __x$1));
                        webgl1Service.contents = WebGL1ServiceTool$Meta3dImguiWebgl1Renderer.buildService(sandbox, undefined, createProgramStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, getAttribLocationStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                        
                      }));
                Curry._2(param.when, "init", (function (param) {
                        state.contents = MainTool$Meta3dImguiWebgl1Renderer.init(sandbox, webgl1Service.contents, undefined, undefined, undefined, undefined);
                        
                      }));
                return Curry._2(param.then, "get a_position, a_color location", (function (param) {
                              return Operators$Meta3dBsJestCucumber.$eq(expect([
                                              OptionSt$Meta3dCommonlib.getExn(state.contents.noTextureShaderData).aPositonLocation,
                                              OptionSt$Meta3dCommonlib.getExn(state.contents.noTextureShaderData).aColorLocation
                                            ]), [
                                          2,
                                          3
                                        ]);
                            }));
              }));
        return test("create and init vao buffers", (function (param) {
                      var and = param.and;
                      var createBufferStub = {
                        contents: 1
                      };
                      var bindBufferStub = {
                        contents: 1
                      };
                      var getArrayBufferStub = {
                        contents: 1
                      };
                      var bufferFloat32DataStub = {
                        contents: 1
                      };
                      var getDynamicDrawStub = {
                        contents: 1
                      };
                      var getElementArrayBufferStub = {
                        contents: 1
                      };
                      var bufferUint16DataStub = {
                        contents: 1
                      };
                      _prepare(param.given);
                      Curry._2(and, "prepare webgl1 service", (function (param) {
                              createBufferStub.contents = Sinon.createEmptyStub(sandbox.contents);
                              Sinon.returns(1, Sinon.onCall(0, createBufferStub.contents));
                              Sinon.returns(2, Sinon.onCall(1, createBufferStub.contents));
                              Sinon.returns(3, Sinon.onCall(2, createBufferStub.contents));
                              bindBufferStub.contents = Sinon.createEmptyStub(sandbox.contents);
                              bufferFloat32DataStub.contents = Sinon.createEmptyStub(sandbox.contents);
                              bufferUint16DataStub.contents = Sinon.createEmptyStub(sandbox.contents);
                              getArrayBufferStub.contents = Sinon.returns(10, Sinon.createEmptyStub(sandbox.contents));
                              getElementArrayBufferStub.contents = Sinon.returns(11, Sinon.createEmptyStub(sandbox.contents));
                              getDynamicDrawStub.contents = Sinon.returns(15, Sinon.createEmptyStub(sandbox.contents));
                              webgl1Service.contents = WebGL1ServiceTool$Meta3dImguiWebgl1Renderer.buildService(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, createBufferStub.contents, bindBufferStub.contents, bufferFloat32DataStub.contents, bufferUint16DataStub.contents, undefined, getArrayBufferStub.contents, getElementArrayBufferStub.contents, undefined, getDynamicDrawStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                              
                            }));
                      Curry._2(param.when, "init", (function (param) {
                              state.contents = MainTool$Meta3dImguiWebgl1Renderer.init(sandbox, webgl1Service.contents, undefined, undefined, undefined, undefined);
                              
                            }));
                      Curry._2(param.then, "create and init position buffer", (function (param) {
                              return Operators$Meta3dBsJestCucumber.$eq(expect([
                                              Sinon.getCallCount(Sinon.withTwoArgs(10, 1, bindBufferStub.contents)),
                                              Sinon.getArgs(Sinon.getCall(0, bufferFloat32DataStub.contents))
                                            ]), [
                                          1,
                                          {
                                            hd: 10,
                                            tl: {
                                              hd: new Float32Array([]),
                                              tl: {
                                                hd: 15,
                                                tl: {
                                                  hd: undefined,
                                                  tl: /* [] */0
                                                }
                                              }
                                            }
                                          }
                                        ]);
                            }));
                      Curry._2(and, "create and init color buffer", (function (param) {
                              return Operators$Meta3dBsJestCucumber.$eq(expect([
                                              Sinon.getCallCount(Sinon.withTwoArgs(10, 2, bindBufferStub.contents)),
                                              Sinon.getArgs(Sinon.getCall(1, bufferFloat32DataStub.contents))
                                            ]), [
                                          1,
                                          {
                                            hd: 10,
                                            tl: {
                                              hd: new Float32Array([]),
                                              tl: {
                                                hd: 15,
                                                tl: {
                                                  hd: undefined,
                                                  tl: /* [] */0
                                                }
                                              }
                                            }
                                          }
                                        ]);
                            }));
                      return Curry._2(and, "create and init index buffer", (function (param) {
                                    return Operators$Meta3dBsJestCucumber.$eq(expect([
                                                    Sinon.getCallCount(Sinon.withTwoArgs(11, 3, bindBufferStub.contents)),
                                                    Sinon.getArgs(Sinon.getCall(0, bufferUint16DataStub.contents))
                                                  ]), [
                                                1,
                                                {
                                                  hd: 11,
                                                  tl: {
                                                    hd: new Uint16Array([]),
                                                    tl: {
                                                      hd: 15,
                                                      tl: {
                                                        hd: undefined,
                                                        tl: /* [] */0
                                                      }
                                                    }
                                                  }
                                                }
                                              ]);
                                  }));
                    }));
      }));

exports.feature = feature;
/* feature Not a pure module */

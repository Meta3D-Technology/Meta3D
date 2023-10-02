'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Sinon$1 = require("sinon");
var Caml_option = require("rescript/lib/js/caml_option.js");
var JestCucumber = require("jest-cucumber");
var MainTool$Meta3dUi = require("../tool/MainTool.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var Operators$Meta3dBsJestCucumber = require("meta3d-bs-jest-cucumber/lib/js/src/Operators.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

var feature = JestCucumber.loadFeature("./test/features/redo_undo.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var sandbox = {
          contents: 1
        };
        var _buildActionContribute = function (deepCopy) {
          return {
                  restore: (function (param, targetActionState) {
                      return targetActionState;
                    }),
                  deepCopy: deepCopy
                };
        };
        var _prepare = function (given) {
          return Curry._2(given, "prepare sandbox", (function (param) {
                        sandbox.contents = Sinon$1.sandbox.create();
                      }));
        };
        test("restore action state", (function (param) {
                var and = param.and;
                var given = param.given;
                var s1 = {
                  contents: 1
                };
                var ms1 = {
                  contents: 1
                };
                var ms2 = {
                  contents: 1
                };
                var elementState1 = {
                  contents: 1
                };
                var as1 = {
                  data1: []
                };
                var uiExtensionProtocolName = "meta3d-ui-protocol";
                var getExtensionServiceStub = {
                  contents: 1
                };
                var _getExtensionState = ImmutableHashMap$Meta3dCommonlib.getExn;
                var _setExtensionState = ImmutableHashMap$Meta3dCommonlib.set;
                _prepare(given);
                Curry._2(given, "create state s1", (function (param) {
                        s1.contents = MainTool$Meta3dUi.createState(undefined);
                      }));
                Curry._2(and, "create meta3d state ms1 which has s1", (function (param) {
                        ms1.contents = ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), uiExtensionProtocolName, s1.contents);
                      }));
                Curry._2(and, "register element1 with elementState1 which has action a1's state as as1", (function (param) {
                        elementState1.contents = {
                          a1: as1
                        };
                        s1.contents = MainTool$Meta3dUi.registerElement(s1.contents, 1, "e1", undefined, Caml_option.some(elementState1.contents), undefined);
                        ms1.contents = ImmutableHashMap$Meta3dCommonlib.set(ms1.contents, uiExtensionProtocolName, s1.contents);
                      }));
                Curry._2(and, "prepare api", (function (param) {
                        var a1 = _buildActionContribute(function (actionState) {
                              return {
                                      data1: ArraySt$Meta3dCommonlib.copy(actionState.data1)
                                    };
                            });
                        var __x = Sinon.createEmptyStub(sandbox.contents);
                        var eventService = {
                          getAllActionContributes: Sinon.returns([[
                                  "a1",
                                  a1
                                ]], __x)
                        };
                        ms1.contents = ImmutableHashMap$Meta3dCommonlib.set(ms1.contents, "meta3d-event-protocol", 1);
                        getExtensionServiceStub.contents = Sinon.returns(eventService, Sinon.createEmptyStub(sandbox.contents));
                      }));
                Curry._2(and, "deep copy ms1 as ms2", (function (param) {
                        ms2.contents = MainTool$Meta3dUi.deepCopy(sandbox, ms1.contents, getExtensionServiceStub.contents, undefined, Caml_option.some(_getExtensionState), Caml_option.some(_setExtensionState), undefined, undefined, undefined, undefined);
                      }));
                Curry._2(and, "change as1's state to as2 with ms2", (function (param) {
                        var elementState1InMs2 = MainTool$Meta3dUi.getCurrentElementState(ImmutableHashMap$Meta3dCommonlib.getExn(ms2.contents, uiExtensionProtocolName));
                        var as1InMs2 = elementState1InMs2.a1;
                        ArraySt$Meta3dCommonlib.push(as1InMs2.data1, 1);
                      }));
                Curry._2(param.when, "restore ms2 to ms1", (function (param) {
                        MainTool$Meta3dUi.restore(sandbox, ms2.contents, ms1.contents, getExtensionServiceStub.contents, undefined, Caml_option.some(_getExtensionState), Caml_option.some(_setExtensionState), undefined, undefined, undefined, undefined);
                      }));
                Curry._2(param.then, "a1's state should be as1", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(as1.data1), []);
                      }));
              }));
      }));

exports.feature = feature;
/* feature Not a pure module */

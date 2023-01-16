'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Sinon = require("sinon");
var Caml_array = require("rescript/lib/js/caml_array.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var JestCucumber = require("jest-cucumber");
var MainTool$Meta3dUi = require("../tool/MainTool.bs.js");
var ReducerTool$Meta3dUi = require("../tool/ReducerTool.bs.js");
var NullableSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/NullableSt.bs.js");
var NumberTool$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/test/bdd/NumberTool.bs.js");
var Operators$Meta3dBsJestCucumber = require("meta3d-bs-jest-cucumber/lib/js/src/Operators.bs.js");

var feature = JestCucumber.loadFeature("./test/features/dispatch.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var sandbox = {
          contents: 1
        };
        var state = {
          contents: 1
        };
        var _prepare = function (given, and) {
          Curry._2(given, "prepare sandbox", (function (param) {
                  sandbox.contents = Sinon.sandbox.create();
                }));
          return Curry._2(and, "create state", (function (param) {
                        state.contents = MainTool$Meta3dUi.createState(undefined);
                      }));
        };
        test("if element state change, update data", (function (param) {
                var and = param.and;
                var given = param.given;
                var elementName1 = "e1";
                var elementState1 = {
                  contents: 1
                };
                _prepare(given, and);
                Curry._2(given, "register element1 with reducer1 and elementState1 whose data1 = 1", (function (param) {
                        elementState1.contents = {
                          data1: 1
                        };
                        state.contents = MainTool$Meta3dUi.registerElement(state.contents, 1, elementName1, undefined, Caml_option.some(elementState1.contents), Caml_option.some(NullableSt$Meta3dCommonlib.$$return(ReducerTool$Meta3dUi.buildReducers("role1", [{
                                            actionName: "action1",
                                            updatedElementStateFieldName: "data1"
                                          }], undefined))), undefined);
                      }));
                Curry._2(param.when, /^dispatch action to set data(\d+) to (\d+)$/, (function (param) {
                        NumberTool$Meta3dCommonlib.getExnAndConvertArgumentsToNumber(Caml_option.undefined_to_opt(typeof arguments === "undefined" ? undefined : arguments));
                        state.contents = MainTool$Meta3dUi.dispatch(state.contents, "action1", "role1", (function (v) {
                                return 10;
                              }));
                      }));
                Curry._2(param.then, "mark state change", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.isStateChange(state.contents, elementName1)), true);
                      }));
                Curry._2(and, /^data(\d+) should be (\d+)$/, (function (param) {
                        var $$arguments = NumberTool$Meta3dCommonlib.getExnAndConvertArgumentsToNumber(Caml_option.undefined_to_opt(typeof arguments === "undefined" ? undefined : arguments));
                        Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.getElementState(state.contents, elementName1).data1), Caml_array.get($$arguments, 1));
                      }));
              }));
        test("else, not update data", (function (param) {
                var and = param.and;
                var given = param.given;
                var elementName1 = "e1";
                var elementState1 = {
                  contents: 1
                };
                _prepare(given, and);
                Curry._2(given, "register element1 with reducer1 and elementState1 whose data1 = 10", (function (param) {
                        elementState1.contents = {
                          data1: 10
                        };
                        state.contents = MainTool$Meta3dUi.registerElement(state.contents, 1, elementName1, undefined, Caml_option.some(elementState1.contents), Caml_option.some(NullableSt$Meta3dCommonlib.$$return(ReducerTool$Meta3dUi.buildReducers("role1", [{
                                            actionName: "action1",
                                            updatedElementStateFieldName: "data1"
                                          }], undefined))), undefined);
                      }));
                Curry._2(param.when, /^dispatch action to set data(\d+) to (\d+)$/, (function (param) {
                        NumberTool$Meta3dCommonlib.getExnAndConvertArgumentsToNumber(Caml_option.undefined_to_opt(typeof arguments === "undefined" ? undefined : arguments));
                        state.contents = MainTool$Meta3dUi.dispatch(state.contents, "action1", "role1", (function (v) {
                                return 10;
                              }));
                      }));
                Curry._2(param.then, "mark state not change", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.isStateChange(state.contents, elementName1)), false);
                      }));
                Curry._2(and, "data1 should not change", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.getElementState(state.contents, elementName1).data1), 10);
                      }));
              }));
      }));

exports.feature = feature;
/* feature Not a pure module */

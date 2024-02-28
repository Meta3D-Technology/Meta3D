'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Sinon$1 = require("sinon");
var Caml_option = require("rescript/lib/js/caml_option.js");
var JestCucumber = require("jest-cucumber");
var MainTool$Meta3dUi = require("../tool/MainTool.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var NullableSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/NullableSt.bs.js");
var Operators$Meta3dBsJestCucumber = require("meta3d-bs-jest-cucumber/lib/js/src/Operators.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

var feature = JestCucumber.loadFeature("./test/features/redo_undo.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var sandbox = {
          contents: 1
        };
        var s1 = {
          contents: 1
        };
        var ms1 = {
          contents: 1
        };
        var ms2 = {
          contents: 1
        };
        var eventExtensionProtocolName = "meta3d-event-protocol";
        var uiExtensionProtocolName = "meta3d-ui-protocol";
        var _buildActionContribute = function (deepCopy, restoreOpt, param) {
          var restore = restoreOpt !== undefined ? Caml_option.valFromOption(restoreOpt) : (function (param, targetActionState) {
                return targetActionState;
              });
          return {
                  restore: restore,
                  deepCopy: deepCopy
                };
        };
        var _prepare = function (given) {
          return Curry._2(given, "prepare sandbox", (function (param) {
                        sandbox.contents = Sinon$1.sandbox.create();
                      }));
        };
        var _getExtensionState = ImmutableHashMap$Meta3dCommonlib.getExn;
        var _setExtensionState = ImmutableHashMap$Meta3dCommonlib.set;
        var _prepareState = function (given, and) {
          Curry._2(given, "create state s1", (function (param) {
                  s1.contents = MainTool$Meta3dUi.createState(undefined);
                }));
          return Curry._2(and, "create meta3d state ms1 which has s1", (function (param) {
                        ms1.contents = ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), uiExtensionProtocolName, s1.contents);
                      }));
        };
        test("if action has restore func, restore action state", (function (param) {
                var and = param.and;
                var given = param.given;
                var elementState1 = {
                  contents: 1
                };
                var as1 = {
                  data1: []
                };
                var getExtensionServiceStub = {
                  contents: 1
                };
                _prepare(given);
                _prepareState(given, and);
                Curry._2(given, "register element1 with elementState1 which has action a1's state as as1", (function (param) {
                        elementState1.contents = {
                          a1: as1
                        };
                        s1.contents = MainTool$Meta3dUi.registerElement(s1.contents, 1, "e1", undefined, Caml_option.some(elementState1.contents), undefined);
                        ms1.contents = ImmutableHashMap$Meta3dCommonlib.set(ms1.contents, uiExtensionProtocolName, s1.contents);
                      }));
                Curry._2(and, "prepare api", (function (param) {
                        var a1 = _buildActionContribute((function (actionState) {
                                return {
                                        data1: ArraySt$Meta3dCommonlib.copy(actionState.data1)
                                      };
                              }), undefined, undefined);
                        var __x = Sinon.createEmptyStub(sandbox.contents);
                        var eventService = {
                          getAllActionContributes: Sinon.returns([[
                                  "a1",
                                  a1
                                ]], __x)
                        };
                        ms1.contents = ImmutableHashMap$Meta3dCommonlib.set(ms1.contents, eventExtensionProtocolName, 1);
                        getExtensionServiceStub.contents = Sinon.returns(eventService, Sinon.createEmptyStub(sandbox.contents));
                      }));
                Curry._2(and, "deep copy ms1 as ms2", (function (param) {
                        ms2.contents = MainTool$Meta3dUi.deepCopy(sandbox, ms1.contents, getExtensionServiceStub.contents, undefined, undefined, Caml_option.some(_getExtensionState), Caml_option.some(_setExtensionState), undefined, undefined, undefined, undefined);
                      }));
                Curry._2(and, "change as1's state to as2 with ms2", (function (param) {
                        var elementState1InMs2 = MainTool$Meta3dUi.getCurrentElementState(ImmutableHashMap$Meta3dCommonlib.getExn(ms2.contents, uiExtensionProtocolName));
                        var as1InMs2 = elementState1InMs2.a1;
                        ArraySt$Meta3dCommonlib.push(as1InMs2.data1, 1);
                      }));
                Curry._2(param.when, "restore ms2 to ms1", (function (param) {
                        MainTool$Meta3dUi.restore(sandbox, ms2.contents, ms1.contents, getExtensionServiceStub.contents, undefined, undefined, Caml_option.some(_getExtensionState), Caml_option.some(_setExtensionState), undefined, undefined, undefined, undefined);
                      }));
                Curry._2(param.then, "a1's state should be as1", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(as1.data1), []);
                      }));
              }));
        test("if action not has restore func, not restore action state", (function (param) {
                var and = param.and;
                var given = param.given;
                var elementState1 = {
                  contents: 1
                };
                var as1 = {
                  data1: []
                };
                var getExtensionServiceStub = {
                  contents: 1
                };
                _prepare(given);
                _prepareState(given, and);
                Curry._2(given, "register element1 with elementState1 which has action a1's state as as1", (function (param) {
                        elementState1.contents = {
                          a1: as1
                        };
                        s1.contents = MainTool$Meta3dUi.registerElement(s1.contents, 1, "e1", undefined, Caml_option.some(elementState1.contents), undefined);
                        ms1.contents = ImmutableHashMap$Meta3dCommonlib.set(ms1.contents, uiExtensionProtocolName, s1.contents);
                      }));
                Curry._2(and, "prepare api", (function (param) {
                        var a1 = _buildActionContribute(NullableSt$Meta3dCommonlib.getEmpty(undefined), Caml_option.some(NullableSt$Meta3dCommonlib.getEmpty(undefined)), undefined);
                        var __x = Sinon.createEmptyStub(sandbox.contents);
                        var eventService = {
                          getAllActionContributes: Sinon.returns([[
                                  "a1",
                                  a1
                                ]], __x)
                        };
                        ms1.contents = ImmutableHashMap$Meta3dCommonlib.set(ms1.contents, eventExtensionProtocolName, 1);
                        getExtensionServiceStub.contents = Sinon.returns(eventService, Sinon.createEmptyStub(sandbox.contents));
                      }));
                Curry._2(and, "deep copy ms1 as ms2", (function (param) {
                        ms2.contents = MainTool$Meta3dUi.deepCopy(sandbox, ms1.contents, getExtensionServiceStub.contents, undefined, undefined, Caml_option.some(_getExtensionState), Caml_option.some(_setExtensionState), undefined, undefined, undefined, undefined);
                      }));
                Curry._2(and, "change as1's state to as2 with ms2", (function (param) {
                        var elementState1InMs2 = MainTool$Meta3dUi.getCurrentElementState(ImmutableHashMap$Meta3dCommonlib.getExn(ms2.contents, uiExtensionProtocolName));
                        var as1InMs2 = elementState1InMs2.a1;
                        ArraySt$Meta3dCommonlib.push(as1InMs2.data1, 1);
                      }));
                Curry._2(param.when, "restore ms2 to ms1", (function (param) {
                        MainTool$Meta3dUi.restore(sandbox, ms2.contents, ms1.contents, getExtensionServiceStub.contents, undefined, undefined, Caml_option.some(_getExtensionState), Caml_option.some(_setExtensionState), undefined, undefined, undefined, undefined);
                      }));
                Curry._2(param.then, "a1's state should be as2", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(as1.data1), [1]);
                      }));
              }));
        test("not restore ui control state", (function (param) {
                var and = param.and;
                var given = param.given;
                var resultMs = {
                  contents: 1
                };
                var c1Label = "c1";
                var cs1 = {
                  data1: []
                };
                var elementState1 = {
                  contents: 1
                };
                var getExtensionServiceStub = {
                  contents: 1
                };
                _prepare(given);
                _prepareState(given, and);
                Curry._2(given, "add ui control c1's state as cs1 to s1", (function (param) {
                        s1.contents = MainTool$Meta3dUi.setUIControlState(s1.contents, c1Label, cs1);
                      }));
                Curry._2(and, "register element1 with elementState1", (function (param) {
                        elementState1.contents = 1;
                        s1.contents = MainTool$Meta3dUi.registerElement(s1.contents, 1, "e1", undefined, Caml_option.some(elementState1.contents), undefined);
                        ms1.contents = ImmutableHashMap$Meta3dCommonlib.set(ms1.contents, uiExtensionProtocolName, s1.contents);
                      }));
                Curry._2(and, "prepare api", (function (param) {
                        var __x = Sinon.createEmptyStub(sandbox.contents);
                        var eventService = {
                          getAllActionContributes: Sinon.returns([], __x)
                        };
                        ms1.contents = ImmutableHashMap$Meta3dCommonlib.set(ms1.contents, eventExtensionProtocolName, 1);
                        getExtensionServiceStub.contents = Sinon.returns(eventService, Sinon.createEmptyStub(sandbox.contents));
                      }));
                Curry._2(and, "deep copy ms1 as ms2", (function (param) {
                        ms2.contents = MainTool$Meta3dUi.deepCopy(sandbox, ms1.contents, getExtensionServiceStub.contents, undefined, undefined, Caml_option.some(_getExtensionState), Caml_option.some(_setExtensionState), undefined, undefined, undefined, undefined);
                      }));
                Curry._2(and, "change cs1's state to cs2 with ms2", (function (param) {
                        var cs1InMs2 = MainTool$Meta3dUi.getUIControlState(ImmutableHashMap$Meta3dCommonlib.getExn(ms2.contents, uiExtensionProtocolName), c1Label);
                        ms2.contents = ImmutableHashMap$Meta3dCommonlib.set(ms2.contents, uiExtensionProtocolName, MainTool$Meta3dUi.setUIControlState(ImmutableHashMap$Meta3dCommonlib.getExn(ms2.contents, uiExtensionProtocolName), c1Label, {
                                  data1: ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.copy(cs1InMs2.data1), 1)
                                }));
                      }));
                Curry._2(param.when, "restore ms2 to ms1", (function (param) {
                        resultMs.contents = MainTool$Meta3dUi.restore(sandbox, ms2.contents, ms1.contents, getExtensionServiceStub.contents, undefined, undefined, Caml_option.some(_getExtensionState), Caml_option.some(_setExtensionState), undefined, undefined, undefined, undefined);
                      }));
                Curry._2(param.then, "c1's state should be cs2", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.getUIControlState(ImmutableHashMap$Meta3dCommonlib.getExn(resultMs.contents, uiExtensionProtocolName), c1Label).data1), [1]);
                      }));
              }));
      }));

exports.feature = feature;
/* feature Not a pure module */

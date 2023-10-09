'use strict';

var Curry = require("rescript/lib/js/curry.js");
var JestCucumber = require("jest-cucumber");
var MainTool$Meta3dUi = require("../tool/MainTool.bs.js");
var NullableSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/NullableSt.bs.js");
var Operators$Meta3dBsJestCucumber = require("meta3d-bs-jest-cucumber/lib/js/src/Operators.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

var feature = JestCucumber.loadFeature("./test/features/custom_control.feature");

JestCucumber.defineFeature(feature, (function (test) {
        test("register custom control", (function (param) {
                var state = {
                  contents: 1
                };
                var uiControlName = "c1";
                Curry._2(param.when, "register a custom control", (function (param) {
                        state.contents = MainTool$Meta3dUi.registerUIControl(uiControlName, 5, undefined, undefined);
                      }));
                Curry._2(param.then, "get custom control func should return it's func", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.getUIControlFuncExn(state.contents, uiControlName)), 5);
                      }));
              }));
        test("get custom control's state", (function (param) {
                var when = param.when;
                var state = {
                  contents: 1
                };
                var uiControlName = "c1";
                var c1State = ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "a", 1);
                Curry._2(when, "set custom control's state to s1", (function (param) {
                        state.contents = MainTool$Meta3dUi.createState(undefined);
                        state.contents = MainTool$Meta3dUi.setUIControlState(state.contents, uiControlName, c1State);
                      }));
                Curry._2(when, "get custom control's state", (function (param) {
                        
                      }));
                Curry._2(param.then, "return s1", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.getUIControlState(state.contents, uiControlName)), NullableSt$Meta3dCommonlib.$$return(c1State));
                      }));
              }));
      }));

exports.feature = feature;
/* feature Not a pure module */

'use strict';

var Curry = require("rescript/lib/js/curry.js");
var JestCucumber = require("jest-cucumber");
var MainTool$Meta3dUi2 = require("../tool/MainTool.bs.js");
var Operators$Meta3dBsJestCucumber = require("meta3d-bs-jest-cucumber/lib/js/src/Operators.bs.js");

var feature = JestCucumber.loadFeature("./test/features/custom_control.feature");

JestCucumber.defineFeature(feature, (function (test) {
        return test("register custom control", (function (param) {
                      var state = {
                        contents: 1
                      };
                      var uiControlName = "c1";
                      Curry._2(param.when, "register a custom control", (function (param) {
                              state.contents = MainTool$Meta3dUi2.registerUIControl(uiControlName, 5, undefined, undefined);
                              
                            }));
                      return Curry._2(param.then, "get custom control should return it", (function (param) {
                                    return Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi2.getUIControlExn(state.contents, uiControlName)), 5);
                                  }));
                    }));
      }));

exports.feature = feature;
/* feature Not a pure module */

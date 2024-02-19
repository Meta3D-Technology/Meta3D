'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Sinon$1 = require("sinon");
var JestCucumber = require("jest-cucumber");
var FileTool$Meta3dEventData = require("../tool/FileTool.bs.js");
var Operators$Meta3dBsJestCucumber = require("meta3d-bs-jest-cucumber/lib/js/src/Operators.bs.js");
var ParseEventData$Meta3dEventData = require("../../src/ParseEventData.bs.js");
var ExportEventData$Meta3dEventDataUtils = require("meta3d-event-data-utils/lib/js/src/ExportEventData.bs.js");

var feature = JestCucumber.loadFeature("./test/features/event_data.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var sandbox = {
          contents: 1
        };
        var _buildEventData = function (inputData, nameOpt, param) {
          var name = nameOpt !== undefined ? nameOpt : "e1";
          return {
                  name: name,
                  isOnlyRead: false,
                  inputData: inputData
                };
        };
        var _prepare = function (given) {
          return Curry._2(given, "prepare", (function (param) {
                        sandbox.contents = Sinon$1.sandbox.create();
                        FileTool$Meta3dEventData.buildFakeTextDecoder(FileTool$Meta3dEventData.convertUint8ArrayToBuffer);
                        return FileTool$Meta3dEventData.buildFakeTextEncoder();
                      }));
        };
        test("parse event data", (function (param) {
                var given = param.given;
                var allEvents = {
                  contents: 1
                };
                var b1 = {
                  contents: 1
                };
                var result = {
                  contents: 1
                };
                var eventData = new ArrayBuffer(10);
                _prepare(given);
                Curry._2(given, "prepare all events include import event event which has eventData as input data", (function (param) {
                        allEvents.contents = [
                          _buildEventData([], "AddCubeEvent", undefined),
                          _buildEventData([eventData], "ImportEventEvent", undefined)
                        ];
                      }));
                Curry._2(param.and, "generate event data buffer as b1", (function (param) {
                        var randomStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        Sinon.returns(22, randomStub);
                        b1.contents = ExportEventData$Meta3dEventDataUtils._generateEventDataBuffer(randomStub, allEvents.contents);
                      }));
                Curry._2(param.when, "parse b1", (function (param) {
                        result.contents = ParseEventData$Meta3dEventData.parse(b1.contents);
                      }));
                Curry._2(param.then, "should get all events", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(result.contents), allEvents.contents);
                      }));
              }));
      }));

exports.feature = feature;
/* feature Not a pure module */

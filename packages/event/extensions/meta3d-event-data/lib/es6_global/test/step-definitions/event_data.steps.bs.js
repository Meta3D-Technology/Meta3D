

import * as Curry from "../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/meta3d-bs-sinon/lib/es6_global/src/sinon.bs.js";
import * as Sinon$1 from "sinon";
import * as JestCucumber from "jest-cucumber";
import * as FileTool$Meta3dEventData from "../tool/FileTool.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";
import * as ParseEventData$Meta3dEventData from "../../src/ParseEventData.bs.js";
import * as ExportEventData$Meta3dEventDataUtils from "../../../../../../../../node_modules/meta3d-event-data-utils/lib/es6_global/src/ExportEventData.bs.js";

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

export {
  feature ,
}
/* feature Not a pure module */

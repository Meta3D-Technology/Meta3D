

import * as Curry from "../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/meta3d-bs-sinon/lib/es6_global/src/sinon.bs.js";
import * as Sinon$1 from "sinon";
import * as Meta3d_jest from "../../../../../../../node_modules/meta3d-bs-jest/lib/es6_global/src/meta3d_jest.bs.js";
import * as MainTool$Meta3dEvent from "../../tool/event_manager/MainTool.bs.js";
import * as TestTool$Meta3dEvent from "../../tool/event_manager/TestTool.bs.js";
import * as BrowserDoService$Meta3dEvent from "../../../src/event_manager/service/browser/BrowserDoService.bs.js";
import * as ContainerManager$Meta3dEvent from "../../../src/event_manager/data/ContainerManager.bs.js";
import * as EventExtensionTool$Meta3dEvent from "../../tool/api/EventExtensionTool.bs.js";

Meta3d_jest.describe("BrowserAPI", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(undefined);
        beforeEach(function () {
              sandbox.contents = Sinon$1.sandbox.create();
              return TestTool$Meta3dEvent.prepareState(undefined);
            });
        afterEach(function () {
              return Sinon.restoreSandbox(sandbox.contents);
            });
        Meta3d_jest.describe("setBrowser", (function (param) {
                Meta3d_jest.test("set browser", (function (param) {
                        MainTool$Meta3dEvent.setBrowser(/* IOS */3);
                        return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(BrowserDoService$Meta3dEvent.getBrowser(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)))), /* IOS */3);
                      }));
              }));
      }));

export {
  
}
/*  Not a pure module */

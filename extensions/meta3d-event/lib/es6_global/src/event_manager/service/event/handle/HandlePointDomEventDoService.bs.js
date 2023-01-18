

import * as Curry from "../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_option from "../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as CanvasDoService$Meta3dEvent from "../../dom/CanvasDoService.bs.js";
import * as HandleDomEventDoService$Meta3dEvent from "./HandleDomEventDoService.bs.js";

function getLocationInView(domEvent, getLocationFunc, state) {
  var canvas = CanvasDoService$Meta3dEvent.getCanvas(state);
  if (canvas === undefined) {
    return [
            0,
            0
          ];
  }
  var match = CanvasDoService$Meta3dEvent.getOffset(Caml_option.valFromOption(canvas));
  var match$1 = Curry._2(getLocationFunc, domEvent, state);
  return [
          match$1[0] - match[0] | 0,
          match$1[1] - match[1] | 0
        ];
}

function getMovementDelta($$location, lastXYTuple, state) {
  var lastX = lastXYTuple[0];
  if (lastX !== undefined) {
    var lastY = lastXYTuple[1];
    if (lastY !== undefined) {
      return [
              $$location[0] - lastX | 0,
              $$location[1] - lastY | 0
            ];
    }
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "HandlePointDomEventDoService.res",
            17,
            2
          ],
          Error: new Error()
        };
  }
  if (lastXYTuple[1] === undefined) {
    return [
            0,
            0
          ];
  }
  throw {
        RE_EXN_ID: "Match_failure",
        _1: [
          "HandlePointDomEventDoService.res",
          17,
          2
        ],
        Error: new Error()
      };
}

var preventDefault = HandleDomEventDoService$Meta3dEvent.preventDefault;

export {
  getLocationInView ,
  getMovementDelta ,
  preventDefault ,
  
}
/* No side effect */

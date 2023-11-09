'use strict';

var Js_array = require("rescript/lib/js/js_array.js");

function clone(state, countRange, sourceGeometry) {
  return [
          state,
          Js_array.map((function (param) {
                  return sourceGeometry;
                }), countRange)
        ];
}

exports.clone = clone;
/* No side effect */

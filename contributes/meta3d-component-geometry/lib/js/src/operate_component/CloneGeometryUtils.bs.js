'use strict';


function clone(state, countRange, sourceGeometry) {
  return [
          state,
          countRange.map(function (param) {
                return sourceGeometry;
              })
        ];
}

exports.clone = clone;
/* No side effect */

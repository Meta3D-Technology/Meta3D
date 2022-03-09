'use strict';


function batchRemoveFromArray(arr, targets) {
  return arr.filter(function (value) {
              return !targets.includes(value);
            });
}

exports.batchRemoveFromArray = batchRemoveFromArray;
/* No side effect */

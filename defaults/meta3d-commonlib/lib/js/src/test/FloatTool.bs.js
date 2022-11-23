'use strict';


function truncateFloatValue(value, digit) {
  return Number(value[""](digit));
}

exports.truncateFloatValue = truncateFloatValue;
/* No side effect */

'use strict';


function isUndefined(value) {
  return value === undefined;
}

function isEmpty(value) {
  if (value === null) {
    return true;
  } else {
    return value === undefined;
  }
}

function isNotInMap(value) {
  return value === undefined;
}

function isInMap(value) {
  return value !== undefined;
}

exports.isUndefined = isUndefined;
exports.isEmpty = isEmpty;
exports.isNotInMap = isNotInMap;
exports.isInMap = isInMap;
/* No side effect */

'use strict';


function decodeUint8Array(arg1, obj) {
  return obj.decode(arg1);
}

function decodeArrayBuffer(arg1, obj) {
  return obj.decode(arg1);
}

exports.decodeUint8Array = decodeUint8Array;
exports.decodeArrayBuffer = decodeArrayBuffer;
/* No side effect */

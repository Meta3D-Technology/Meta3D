'use strict';


function newArrayBuffer(totalByteLength) {
  return new ArrayBuffer(totalByteLength);
}

exports.newArrayBuffer = newArrayBuffer;
/* No side effect */

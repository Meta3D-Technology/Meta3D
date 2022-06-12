'use strict';

var DataViewCommon$Meta3d = require("./DataViewCommon.bs.js");
var TypeArrayUtils$Meta3d = require("./TypeArrayUtils.bs.js");

function alignedLength(value) {
  if (value === 0) {
    return value;
  }
  var multiple = value % 4;
  if (multiple !== 0) {
    return value + (4 - multiple | 0) | 0;
  } else {
    return value;
  }
}

function copyUint8ArrayToArrayBuffer(byteOffset, param, dataView) {
  var uint8Array = param[2];
  var uint8ArrayAlignedByteLength = param[1];
  var emptyUint8Data = param[0];
  var resultByteOffset = byteOffset + uint8ArrayAlignedByteLength | 0;
  var byteOffset$1 = byteOffset;
  var uint8ArrayByteLength = uint8Array.length;
  for(var i = 0; i < uint8ArrayAlignedByteLength; ++i){
    var value = i >= uint8ArrayByteLength ? emptyUint8Data : TypeArrayUtils$Meta3d.getUint8_1(i, uint8Array);
    byteOffset$1 = DataViewCommon$Meta3d.writeUint8_1(byteOffset$1, value, dataView);
  }
  return resultByteOffset;
}

exports.alignedLength = alignedLength;
exports.copyUint8ArrayToArrayBuffer = copyUint8ArrayToArrayBuffer;
/* No side effect */

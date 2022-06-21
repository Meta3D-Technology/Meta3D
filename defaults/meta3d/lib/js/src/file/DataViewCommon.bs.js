'use strict';


function create(arrayBuffer) {
  return new DataView(arrayBuffer);
}

function getFloat(offset, dataView) {
  return [
          dataView.getFloat32(offset, 1),
          offset + 4 | 0
        ];
}

function getUint16_1(offset, dataView) {
  return [
          dataView.getUint16(offset, 1),
          offset + 2 | 0
        ];
}

function getUint32_1(offset, dataView) {
  return [
          dataView.getUint32(offset, 1),
          offset + 4 | 0
        ];
}

function getUint8_1(offset, dataView) {
  return [
          dataView.getUint8(offset),
          offset + 1 | 0
        ];
}

function writeUint8_1(offset, value, dataView) {
  dataView.setUint8(offset, value);
  return offset + 1 | 0;
}

function writeUint16_1(offset, value, dataView) {
  dataView.setUint16(offset, value, 1);
  return offset + 2 | 0;
}

function writeUint32_1(offset, value, dataView) {
  dataView.setUint32(offset, value, 1);
  return offset + 4 | 0;
}

exports.create = create;
exports.getFloat = getFloat;
exports.getUint16_1 = getUint16_1;
exports.getUint32_1 = getUint32_1;
exports.getUint8_1 = getUint8_1;
exports.writeUint8_1 = writeUint8_1;
exports.writeUint16_1 = writeUint16_1;
exports.writeUint32_1 = writeUint32_1;
/* No side effect */

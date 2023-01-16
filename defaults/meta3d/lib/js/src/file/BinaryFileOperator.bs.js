'use strict';

var Js_typed_array = require("rescript/lib/js/js_typed_array.js");
var BufferUtils$Meta3d = require("./BufferUtils.bs.js");
var TextEncoder$Meta3d = require("./TextEncoder.bs.js");
var DataViewCommon$Meta3d = require("./DataViewCommon.bs.js");
var TypeArrayUtils$Meta3d = require("./TypeArrayUtils.bs.js");
var Tuple2$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/tuple/Tuple2.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");

function _buildEmptyEncodedUint8Data(param) {
  var encoder = new TextEncoder();
  var emptyUint8DataArr = TextEncoder$Meta3d.encodeUint8Array(" ", encoder);
  return TypeArrayUtils$Meta3d.getUint8_1(0, emptyUint8DataArr);
}

function _writeHeader(dataLength, byteLengthArr, dataView) {
  var byteOffset = DataViewCommon$Meta3d.writeUint32_1(0, dataLength, dataView);
  return ArraySt$Meta3dCommonlib.reduceOneParam(byteLengthArr, (function (byteOffset, byteLength) {
                return DataViewCommon$Meta3d.writeUint32_1(byteOffset, byteLength, dataView);
              }), byteOffset);
}

function _writeDataArr(byteOffset, dataArr, alignedByteLengthArr, emptyEncodedUint8Data, dataView) {
  return ArraySt$Meta3dCommonlib.reduceOneParami(dataArr, (function (byteOffset, data, index) {
                return BufferUtils$Meta3d.copyUint8ArrayToArrayBuffer(byteOffset, [
                            emptyEncodedUint8Data,
                            ArraySt$Meta3dCommonlib.getExn(alignedByteLengthArr, index),
                            data
                          ], dataView);
              }), byteOffset);
}

function _getDataLengthByteLengthInHeader(param) {
  return 4;
}

function _getDataByteOffsetInHeader(dataIndex) {
  return 4 + (dataIndex << 2) | 0;
}

function _getHeaderByteLength(dataLength) {
  return 4 + (dataLength << 2) | 0;
}

function generate(dataArr) {
  var dataLength = ArraySt$Meta3dCommonlib.length(dataArr);
  var match = ArraySt$Meta3dCommonlib.reduceOneParam(dataArr, (function (param, data) {
          var byteLength = data.byteLength;
          var alignedByteLength = BufferUtils$Meta3d.alignedLength(byteLength);
          return [
                  param[0] + alignedByteLength | 0,
                  ArraySt$Meta3dCommonlib.push(param[1], byteLength),
                  ArraySt$Meta3dCommonlib.push(param[2], alignedByteLength)
                ];
        }), [
        _getHeaderByteLength(dataLength),
        [],
        []
      ]);
  var binaryFile = new ArrayBuffer(match[0]);
  var dataView = DataViewCommon$Meta3d.create(binaryFile);
  _writeDataArr(_writeHeader(dataLength, match[1], dataView), dataArr, match[2], _buildEmptyEncodedUint8Data(undefined), dataView);
  return binaryFile;
}

function load(binaryFile) {
  var dataView = DataViewCommon$Meta3d.create(binaryFile);
  var match = DataViewCommon$Meta3d.getUint32_1(0, dataView);
  var dataLength = match[0];
  return Tuple2$Meta3dCommonlib.getLast(ArraySt$Meta3dCommonlib.reduceOneParam(ArraySt$Meta3dCommonlib.range(0, dataLength - 1 | 0), (function (param, dataIndex) {
                    var byteOffset = param[0];
                    var match = DataViewCommon$Meta3d.getUint32_1(_getDataByteOffsetInHeader(dataIndex), dataView);
                    var byteLength = match[0];
                    return [
                            byteOffset + BufferUtils$Meta3d.alignedLength(byteLength) | 0,
                            ArraySt$Meta3dCommonlib.push(param[1], new Uint8Array(Js_typed_array.$$ArrayBuffer.slice(_getHeaderByteLength(dataLength) + byteOffset | 0, (_getHeaderByteLength(dataLength) + byteOffset | 0) + byteLength | 0, binaryFile)))
                          ];
                  }), [
                  0,
                  []
                ]));
}

exports._buildEmptyEncodedUint8Data = _buildEmptyEncodedUint8Data;
exports._writeHeader = _writeHeader;
exports._writeDataArr = _writeDataArr;
exports._getDataLengthByteLengthInHeader = _getDataLengthByteLengthInHeader;
exports._getDataByteOffsetInHeader = _getDataByteOffsetInHeader;
exports._getHeaderByteLength = _getHeaderByteLength;
exports.generate = generate;
exports.load = load;
/* No side effect */

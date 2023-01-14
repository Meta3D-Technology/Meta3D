

import * as BufferUtils$Meta3d from "./BufferUtils.bs.js";
import * as DataViewCommon$Meta3d from "./DataViewCommon.bs.js";
import * as TypeArrayUtils$Meta3d from "./TypeArrayUtils.bs.js";
import * as Tuple2$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/tuple/Tuple2.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";

function _buildEmptyEncodedUint8Data(param) {
  var encoder = new TextEncoder();
  var emptyUint8DataArr = encoder.encode(" ");
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
                            ArraySt$Meta3dCommonlib.push(param[1], new Uint8Array(binaryFile.slice(_getHeaderByteLength(dataLength) + byteOffset | 0, (_getHeaderByteLength(dataLength) + byteOffset | 0) + byteLength | 0)))
                          ];
                  }), [
                  0,
                  []
                ]));
}

export {
  _buildEmptyEncodedUint8Data ,
  _writeHeader ,
  _writeDataArr ,
  _getDataLengthByteLengthInHeader ,
  _getDataByteOffsetInHeader ,
  _getHeaderByteLength ,
  generate ,
  load ,
  
}
/* No side effect */

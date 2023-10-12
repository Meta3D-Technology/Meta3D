

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_math from "../../../../../node_modules/rescript/lib/es6/js_math.js";
import * as TextEncoder$Meta3d from "../../../../../node_modules/meta3d/lib/es6_global/src/file/TextEncoder.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as BinaryFileOperator$Meta3d from "../../../../../node_modules/meta3d/lib/es6_global/src/file/BinaryFileOperator.bs.js";
import * as DownloadUtils$Meta3dFileUtils from "../../../../../node_modules/meta3d-file-utils/lib/es6_global/src/DownloadUtils.bs.js";

function _generateId(random) {
  return Js_math.floor_int(Curry._1(random, undefined) * 10000000.0);
}

var _isArrayBuffer = (function (data){
return data instanceof ArrayBuffer
});

var _isOutsideImmutableData = _isArrayBuffer;

function _generateEventDataBuffer(random, allEvents) {
  var encoder = new TextEncoder();
  var match = ArraySt$Meta3dCommonlib.reduceOneParam(allEvents, (function (param, eventData) {
          var match = ArraySt$Meta3dCommonlib.reduceOneParam(eventData.inputData, (function (param, singleInputData) {
                  var newInputData = param[2];
                  var outsideImmutableDataArr = param[1];
                  var outsideImmutableDataIdArr = param[0];
                  if (!_isArrayBuffer(singleInputData)) {
                    return [
                            outsideImmutableDataIdArr,
                            outsideImmutableDataArr,
                            ArraySt$Meta3dCommonlib.push(newInputData, singleInputData)
                          ];
                  }
                  var id = _generateId(random);
                  return [
                          ArraySt$Meta3dCommonlib.push(outsideImmutableDataIdArr, id),
                          ArraySt$Meta3dCommonlib.push(outsideImmutableDataArr, singleInputData),
                          ArraySt$Meta3dCommonlib.push(newInputData, id)
                        ];
                }), [
                param[0],
                param[1],
                []
              ]);
          return [
                  match[0],
                  match[1],
                  ArraySt$Meta3dCommonlib.push(param[2], {
                        name: eventData.name,
                        isOnlyRead: eventData.isOnlyRead,
                        inputData: match[2]
                      })
                ];
        }), [
        [],
        [],
        []
      ]);
  return BinaryFileOperator$Meta3d.generate([
              TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(match[2]), encoder),
              TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(match[0]), encoder),
              new Uint8Array(BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.map(match[1], (function (data) {
                              return new Uint8Array(data);
                            }))))
            ]);
}

function $$export(allEvents) {
  DownloadUtils$Meta3dFileUtils.createAndDownloadBlobFile(_generateEventDataBuffer((function (prim) {
              return Math.random();
            }), allEvents), "eventData", "arraybuffer");
}

export {
  _generateId ,
  _isArrayBuffer ,
  _isOutsideImmutableData ,
  _generateEventDataBuffer ,
  $$export ,
}
/* No side effect */

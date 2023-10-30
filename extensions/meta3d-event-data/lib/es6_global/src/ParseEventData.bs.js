

import * as Js_array from "../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as TextDecoder$Meta3d from "../../../../../node_modules/meta3d/lib/es6_global/src/file/TextDecoder.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as BinaryFileOperator$Meta3d from "../../../../../node_modules/meta3d/lib/es6_global/src/file/BinaryFileOperator.bs.js";

function parse(eventData) {
  var decoder = new TextDecoder("utf-8");
  var match = BinaryFileOperator$Meta3d.load(eventData);
  if (match.length !== 3) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "ParseEventData.res",
            6,
            6
          ],
          Error: new Error()
        };
  }
  var allEventsUint8 = match[0];
  var outsideImmutableDataIdUint8 = match[1];
  var outsideImmutableDataUint8 = match[2];
  var outsideImmutableDataIdArr = JSON.parse(TextDecoder$Meta3d.decodeUint8Array(outsideImmutableDataIdUint8, decoder));
  var outsideImmutableDataArr = ArraySt$Meta3dCommonlib.map(BinaryFileOperator$Meta3d.load(outsideImmutableDataUint8.buffer), (function (data) {
          return data.buffer;
        }));
  return ArraySt$Meta3dCommonlib.map(JSON.parse(TextDecoder$Meta3d.decodeUint8Array(allEventsUint8, decoder)), (function (eventData) {
                return {
                        name: eventData.name,
                        isOnlyRead: eventData.isOnlyRead,
                        inputData: ArraySt$Meta3dCommonlib.map(eventData.inputData, (function (singleInputData) {
                                var index = Js_array.indexOf(singleInputData, outsideImmutableDataIdArr);
                                if (index !== -1) {
                                  return ArraySt$Meta3dCommonlib.getExn(outsideImmutableDataArr, index);
                                } else {
                                  return singleInputData;
                                }
                              }))
                      };
              }));
}

export {
  parse ,
}
/* No side effect */

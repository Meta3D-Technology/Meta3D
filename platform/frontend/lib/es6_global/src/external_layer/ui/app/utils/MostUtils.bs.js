

import * as Most from "most";
import * as Caml_array from "../../../../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as Js_promise from "../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as Most$Meta3dBsMostDefault from "../../../../../../../../../node_modules/meta3d-bs-most-default/lib/es6_global/src/most.bs.js";

var _isFromEventStream = (function(stream){ var source = stream.source; return !!source.event && !!source.source; });

function concatArray(streamArr) {
  var match = streamArr.length;
  if (match !== 0) {
    return ArraySt$Meta3dCommonlib.reduceOneParam(ArraySt$Meta3dCommonlib.sliceFrom(streamArr, 1), (function (stream1, stream2) {
                  _isFromEventStream(stream1) === true;
                  return Most$Meta3dBsMostDefault.concat(stream2, stream1);
                }), Caml_array.get(streamArr, 0));
  } else {
    return Most.just(1);
  }
}

function toPromise(stream) {
  var result = {
    contents: 1
  };
  var __x = Most.observe((function (value) {
          result.contents = value;
        }), stream);
  return Js_promise.then_((function (param) {
                return Promise.resolve(result.contents);
              }), __x);
}

export {
  _isFromEventStream ,
  concatArray ,
  toPromise ,
}
/* most Not a pure module */

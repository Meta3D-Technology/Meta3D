

import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_exn from "../../../../../../../../../../node_modules/rescript/lib/es6/js_exn.js";
import * as Caml_js_exceptions from "../../../../../../../../../../node_modules/rescript/lib/es6/caml_js_exceptions.js";
import * as Antd__Message$Frontend from "./externals/antd/Antd__Message.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

function success(message, durationOpt) {
  Antd__Message$Frontend.getMessageAPI(undefined).open({
        type: "success",
        content: message,
        duration: OptionSt$Meta3dCommonlib.getWithDefault(durationOpt, 5)
      });
}

function warn(message, durationOpt) {
  console.warn(message);
  Antd__Message$Frontend.getMessageAPI(undefined).open({
        type: "warning",
        content: message,
        duration: OptionSt$Meta3dCommonlib.getWithDefault(durationOpt, 5)
      });
}

function error(message, durationOpt) {
  console.error(message);
  Antd__Message$Frontend.getMessageAPI(undefined).open({
        type: "error",
        content: message,
        duration: OptionSt$Meta3dCommonlib.getWithDefault(durationOpt, 5)
      });
}

function errorWithExn(error, durationOpt) {
  console.error(error);
  Antd__Message$Frontend.getMessageAPI(undefined).open({
        type: "error",
        content: OptionSt$Meta3dCommonlib.getExn(error.message),
        duration: OptionSt$Meta3dCommonlib.getWithDefault(durationOpt, 5)
      });
}

function showCatchedErrorMessage(func, durationOpt) {
  try {
    return Curry._1(func, undefined);
  }
  catch (raw_obj){
    var obj = Caml_js_exceptions.internalToOCamlException(raw_obj);
    if (obj.RE_EXN_ID === Js_exn.$$Error) {
      return errorWithExn(obj._1, durationOpt);
    }
    throw obj;
  }
}

function showCatchedErrorMessageWithFunc(func, handleErrorFunc, durationOpt) {
  try {
    return Curry._1(func, undefined);
  }
  catch (raw_obj){
    var obj = Caml_js_exceptions.internalToOCamlException(raw_obj);
    if (obj.RE_EXN_ID === Js_exn.$$Error) {
      Curry._1(handleErrorFunc, undefined);
      return errorWithExn(obj._1, durationOpt);
    }
    throw obj;
  }
}

function showCatchedErrorMessageAndReturn(func, handleErrorReturnFunc, durationOpt) {
  try {
    return func();
  }
  catch (raw_obj){
    var obj = Caml_js_exceptions.internalToOCamlException(raw_obj);
    if (obj.RE_EXN_ID === Js_exn.$$Error) {
      errorWithExn(obj._1, durationOpt);
      return handleErrorReturnFunc();
    }
    throw obj;
  }
}

function swallowCatchedError(func, warnMessage) {
  try {
    return Curry._1(func, undefined);
  }
  catch (raw_obj){
    var obj = Caml_js_exceptions.internalToOCamlException(raw_obj);
    if (obj.RE_EXN_ID === Js_exn.$$Error) {
      return warn(warnMessage, undefined);
    }
    throw obj;
  }
}

export {
  success ,
  warn ,
  error ,
  errorWithExn ,
  showCatchedErrorMessage ,
  showCatchedErrorMessageWithFunc ,
  showCatchedErrorMessageAndReturn ,
  swallowCatchedError ,
}
/* No side effect */



import * as Sinon from "../../../../../../node_modules/meta3d-bs-sinon/lib/es6_global/src/sinon.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

var _defer = (function(timeout, returnedData) {
     return new Promise((resolve, reject)=>{
     setTimeout(function(){
       resolve(returnedData)
     }, timeout)
     });
   });

function calledWith(stub, arg) {
  return stub.calledWith(arg);
}

function calledWithArg2(stub, arg1, arg2) {
  return stub.calledWith(arg1, arg2);
}

function calledWithArg3(stub, arg1, arg2, arg3) {
  return stub.calledWith(arg1, arg2, arg3);
}

function calledWithArg4(stub, arg1, arg2, arg3, arg4) {
  return stub.calledWith(arg1, arg2, arg3, arg4);
}

function calledWithArg5(stub, arg1, arg2, arg3, arg4, arg5) {
  return stub.calledWith(arg1, arg2, arg3, arg4, arg5);
}

function calledWithArg6(stub, arg1, arg2, arg3, arg4, arg5, arg6) {
  return stub.calledWith(arg1, arg2, arg3, arg4, arg5, arg6);
}

function deferReturns(timeout, returnedData, stub) {
  return Sinon.returns(_defer(timeout, returnedData), stub);
}

var createMethodStub = (function(sandbox, obj, method) {
    /* sandbox.stub(obj, method); */

    obj[method] =  sandbox.stub();

    return obj[method];
});

function getFirstArg(stub, callIndexOpt, param) {
  var callIndex = callIndexOpt !== undefined ? callIndexOpt : 0;
  return OptionSt$Meta3dCommonlib.getExn(ListSt$Meta3dCommonlib.head(Sinon.getArgs(Sinon.getCall(callIndex, stub))));
}

function getArg(stub, callIndexOpt, argIndexOpt, param) {
  var callIndex = callIndexOpt !== undefined ? callIndexOpt : 0;
  var argIndex = argIndexOpt !== undefined ? argIndexOpt : 0;
  return OptionSt$Meta3dCommonlib.getExn(ListSt$Meta3dCommonlib.nth(Sinon.getArgs(Sinon.getCall(callIndex, stub)), argIndex));
}

function getAllArgsJson(stub, callIndex) {
  return JSON.stringify(ListSt$Meta3dCommonlib.toArray(Sinon.getArgs(Sinon.getCall(callIndex, stub))));
}

export {
  _defer ,
  calledWith ,
  calledWithArg2 ,
  calledWithArg3 ,
  calledWithArg4 ,
  calledWithArg5 ,
  calledWithArg6 ,
  deferReturns ,
  createMethodStub ,
  getFirstArg ,
  getArg ,
  getAllArgsJson ,
  
}
/* Sinon Not a pure module */

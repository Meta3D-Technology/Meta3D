

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Log$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";

function _compileShader(param, gl, glslSource, shader, isDebug) {
  var getCompileStatus = param.getCompileStatus;
  var getShaderInfoLog = param.getShaderInfoLog;
  var getShaderParameter = param.getShaderParameter;
  Curry._3(param.shaderSource, shader, glslSource, gl);
  Curry._2(param.compileShader, shader, gl);
  Log$Meta3dCommonlib.debugWithFunc((function (param) {
          if (Curry._3(getShaderParameter, shader, Curry._1(getCompileStatus, gl), gl) !== false) {
            return ;
          }
          var message = Curry._2(getShaderInfoLog, shader, gl);
          var partial_arg = "" + message;
          Log$Meta3dCommonlib.debug((function (param) {
                  return Log$Meta3dCommonlib.buildDebugMessage("shader info log", partial_arg, param);
                }), isDebug);
          var partial_arg$1 = "" + glslSource;
          return Log$Meta3dCommonlib.debug((function (param) {
                        return Log$Meta3dCommonlib.buildDebugMessage("glsl source", partial_arg$1, param);
                      }), isDebug);
        }), isDebug);
  return shader;
}

function _linkProgram(param, program, gl, isDebug) {
  var getProgramInfoLog = param.getProgramInfoLog;
  var getProgramParameter = param.getProgramParameter;
  var getLinkStatus = param.getLinkStatus;
  Curry._2(param.linkProgram, program, gl);
  Log$Meta3dCommonlib.debugWithFunc((function (param) {
          if (Curry._3(getProgramParameter, program, Curry._1(getLinkStatus, gl), gl) !== false) {
            return ;
          }
          var message = Curry._2(getProgramInfoLog, program, gl);
          return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("link program error", "" + message, "", "", ""));
        }), isDebug);
  
}

function initShader(webgl1Service, vsSource, fsSource, gl, isDebug, program) {
  var deleteShader = webgl1Service.deleteShader;
  var attachShader = webgl1Service.attachShader;
  var createShader = webgl1Service.createShader;
  var vs = _compileShader(webgl1Service, gl, vsSource, Curry._2(createShader, Curry._1(webgl1Service.getVertexShader, gl), gl), isDebug);
  var fs = _compileShader(webgl1Service, gl, fsSource, Curry._2(createShader, Curry._1(webgl1Service.getFragmentShader, gl), gl), isDebug);
  Curry._3(attachShader, program, vs, gl);
  Curry._3(attachShader, program, fs, gl);
  Curry._4(webgl1Service.bindAttribLocation, program, 0, "a_position", gl);
  _linkProgram(webgl1Service, program, gl, isDebug);
  Curry._2(deleteShader, vs, gl);
  Curry._2(deleteShader, fs, gl);
  return program;
}

export {
  _compileShader ,
  _linkProgram ,
  initShader ,
  
}
/* No side effect */

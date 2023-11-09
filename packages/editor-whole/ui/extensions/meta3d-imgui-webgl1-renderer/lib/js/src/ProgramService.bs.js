'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");

function _compileShader(param, gl, glslSource, shader, isDebug) {
  var getCompileStatus = param.getCompileStatus;
  var getShaderInfoLog = param.getShaderInfoLog;
  var getShaderParameter = param.getShaderParameter;
  param.shaderSource(shader, glslSource, gl);
  param.compileShader(shader, gl);
  Log$Meta3dCommonlib.debugWithFunc((function (param) {
          if (getShaderParameter(shader, getCompileStatus(gl), gl) !== false) {
            return ;
          }
          var message = getShaderInfoLog(shader, gl);
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
  param.linkProgram(program, gl);
  Log$Meta3dCommonlib.debugWithFunc((function (param) {
          if (getProgramParameter(program, getLinkStatus(gl), gl) !== false) {
            return ;
          }
          var message = getProgramInfoLog(program, gl);
          return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("link program error", "" + message, "", "", ""));
        }), isDebug);
  
}

function initShader(webgl1Service, vsSource, fsSource, gl, isDebug, program) {
  var deleteShader = webgl1Service.deleteShader;
  var attachShader = webgl1Service.attachShader;
  var createShader = webgl1Service.createShader;
  var vs = _compileShader(webgl1Service, gl, vsSource, createShader(webgl1Service.getVertexShader(gl), gl), isDebug);
  var fs = _compileShader(webgl1Service, gl, fsSource, createShader(webgl1Service.getFragmentShader(gl), gl), isDebug);
  attachShader(program, vs, gl);
  attachShader(program, fs, gl);
  webgl1Service.bindAttribLocation(program, 0, "a_position", gl);
  _linkProgram(webgl1Service, program, gl, isDebug);
  deleteShader(vs, gl);
  deleteShader(fs, gl);
  return program;
}

exports._compileShader = _compileShader;
exports._linkProgram = _linkProgram;
exports.initShader = initShader;
/* No side effect */

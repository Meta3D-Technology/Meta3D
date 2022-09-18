

import * as Caml_option from "../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as BufferDataIMGUIService$Meta3dImguiWebgl1Renderer from "./BufferDataIMGUIService.bs.js";

function createEmptyDrawData(param) {
  return {
          noTextureDrawData: {
            verticeArr: [],
            colorArr: [],
            indexArr: []
          }
        };
}

function _getGl(param) {
  return OptionSt$Meta3dCommonlib.getExn(param.gl);
}

function _unbindVAO(param, gl) {
  var ext = OptionSt$Meta3dCommonlib.fromNullable(param.getExtension("OES_vertex_array_object", gl));
  if (ext !== undefined) {
    return param.bindVertexArrayOES(null, Caml_option.valFromOption(ext));
  }
  
}

function _backupGlState(param, gl, state) {
  var isEnabled = param.isEnabled;
  var getParameter = param.getParameter;
  return {
          isDebug: state.isDebug,
          drawData: state.drawData,
          gl: state.gl,
          noTextureShaderData: state.noTextureShaderData,
          lastWebglData: {
            lastProgram: OptionSt$Meta3dCommonlib.fromNullable(getParameter(param.getCurrentProgram(gl), gl)),
            lastElementArrayBuffer: getParameter(param.getBindingElementArrayBuffer(gl), gl),
            lastArrayBuffer: getParameter(param.getBindingArrayBuffer(gl), gl),
            lastIsEnableDepthTest: isEnabled(param.getDepthTest(gl), gl),
            lastIsEnableBlend: isEnabled(param.getBlend(gl), gl)
          }
        };
}

function _buildAllDrawData(state) {
  var match = OptionSt$Meta3dCommonlib.getExn(state.drawData);
  return [
          state,
          match.noTextureDrawData
        ];
}

function _setGlState(param, gl) {
  param.disable(param.getDepthTest(gl), gl);
  param.enable(param.getBlend(gl), gl);
  return param.blendFunc(param.getSrcAlpha(gl), param.getOneMinusSrcAlpha(gl), gl);
}

function _drawElements(param, count, countOffset, gl) {
  if (count === 0) {
    return gl;
  } else {
    param.drawElements(param.getTriangles(gl), count, param.getUnsignedShort(gl), countOffset, gl);
    return gl;
  }
}

function _drawNoTexture(webgl1Service, drawElementData, gl) {
  return _drawElements(webgl1Service, drawElementData.count, 0, gl);
}

function _renderNoTexture(webgl1Service, noTextureDrawData, state, gl) {
  var noTextureShaderData = OptionSt$Meta3dCommonlib.getExn(state.noTextureShaderData);
  webgl1Service.useProgram(noTextureShaderData.program, gl);
  var match = BufferDataIMGUIService$Meta3dImguiWebgl1Renderer.bufferNoTextureDataAndSend(webgl1Service, gl, noTextureDrawData, state);
  return _drawNoTexture(webgl1Service, match[1], gl);
}

function _restoreGlState(param, state, gl) {
  var getBlend = param.getBlend;
  var getDepthTest = param.getDepthTest;
  var disable = param.disable;
  var enable = param.enable;
  var bindBuffer = param.bindBuffer;
  var match = OptionSt$Meta3dCommonlib.getExn(state.lastWebglData);
  var lastProgram = match.lastProgram;
  bindBuffer(param.getElementArrayBuffer(gl), match.lastElementArrayBuffer, gl);
  bindBuffer(param.getArrayBuffer(gl), match.lastArrayBuffer, gl);
  if (lastProgram !== undefined) {
    param.useProgram(Caml_option.valFromOption(lastProgram), gl);
  }
  if (match.lastIsEnableDepthTest) {
    enable(getDepthTest(gl), gl);
  } else {
    disable(getDepthTest(gl), gl);
  }
  if (match.lastIsEnableBlend) {
    enable(getBlend(gl), gl);
  } else {
    disable(getBlend(gl), gl);
  }
  return state;
}

function render(state, meta3dState, webgl1Service) {
  var state_isDebug = state.isDebug;
  var state_drawData = {
    noTextureDrawData: {
      verticeArr: [],
      colorArr: [],
      indexArr: []
    }
  };
  var state_gl = state.gl;
  var state_noTextureShaderData = state.noTextureShaderData;
  var state_lastWebglData = state.lastWebglData;
  var state$1 = {
    isDebug: state_isDebug,
    drawData: state_drawData,
    gl: state_gl,
    noTextureShaderData: state_noTextureShaderData,
    lastWebglData: state_lastWebglData
  };
  var gl = OptionSt$Meta3dCommonlib.getExn(state_gl);
  _unbindVAO(webgl1Service, gl);
  var state$2 = _backupGlState(webgl1Service, gl, state$1);
  var match = _buildAllDrawData(state$2);
  var state$3 = match[0];
  _setGlState(webgl1Service, gl);
  _restoreGlState(webgl1Service, state$3, _renderNoTexture(webgl1Service, match[1], state$3, gl));
  return state$3;
}

export {
  createEmptyDrawData ,
  _getGl ,
  _unbindVAO ,
  _backupGlState ,
  _buildAllDrawData ,
  _setGlState ,
  _drawElements ,
  _drawNoTexture ,
  _renderNoTexture ,
  _restoreGlState ,
  render ,
  
}
/* No side effect */



import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
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
  var ext = OptionSt$Meta3dCommonlib.fromNullable(Curry._2(param.getExtension, "OES_vertex_array_object", gl));
  if (ext !== undefined) {
    return Curry._2(param.bindVertexArrayOES, null, Caml_option.valFromOption(ext));
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
            lastProgram: OptionSt$Meta3dCommonlib.fromNullable(Curry._2(getParameter, Curry._1(param.getCurrentProgram, gl), gl)),
            lastElementArrayBuffer: Curry._2(getParameter, Curry._1(param.getBindingElementArrayBuffer, gl), gl),
            lastArrayBuffer: Curry._2(getParameter, Curry._1(param.getBindingArrayBuffer, gl), gl),
            lastIsEnableDepthTest: Curry._2(isEnabled, Curry._1(param.getDepthTest, gl), gl),
            lastIsEnableBlend: Curry._2(isEnabled, Curry._1(param.getBlend, gl), gl)
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
  Curry._2(param.disable, Curry._1(param.getDepthTest, gl), gl);
  Curry._2(param.enable, Curry._1(param.getBlend, gl), gl);
  return Curry._3(param.blendFunc, Curry._1(param.getSrcAlpha, gl), Curry._1(param.getOneMinusSrcAlpha, gl), gl);
}

function _drawElements(param, count, countOffset, gl) {
  if (count === 0) {
    return gl;
  } else {
    Curry._5(param.drawElements, Curry._1(param.getTriangles, gl), count, Curry._1(param.getUnsignedShort, gl), countOffset, gl);
    return gl;
  }
}

function _drawNoTexture(webgl1Service, drawElementData, gl) {
  return _drawElements(webgl1Service, drawElementData.count, 0, gl);
}

function _renderNoTexture(webgl1Service, noTextureDrawData, state, gl) {
  var noTextureShaderData = OptionSt$Meta3dCommonlib.getExn(state.noTextureShaderData);
  Curry._2(webgl1Service.useProgram, noTextureShaderData.program, gl);
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
  Curry._3(bindBuffer, Curry._1(param.getElementArrayBuffer, gl), match.lastElementArrayBuffer, gl);
  Curry._3(bindBuffer, Curry._1(param.getArrayBuffer, gl), match.lastArrayBuffer, gl);
  if (lastProgram !== undefined) {
    Curry._2(param.useProgram, Caml_option.valFromOption(lastProgram), gl);
  }
  if (match.lastIsEnableDepthTest) {
    Curry._2(enable, Curry._1(getDepthTest, gl), gl);
  } else {
    Curry._2(disable, Curry._1(getDepthTest, gl), gl);
  }
  if (match.lastIsEnableBlend) {
    Curry._2(enable, Curry._1(getBlend, gl), gl);
  } else {
    Curry._2(disable, Curry._1(getBlend, gl), gl);
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

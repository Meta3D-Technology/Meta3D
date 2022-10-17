

import * as NullableSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";

function getExtensionService(api, param) {
  return {
          getContext: (function (canvas, contextConfigJsObj) {
              return canvas.getContext("webgl", contextConfigJsObj);
            }),
          createProgram: (function (gl) {
              return gl.createProgram();
            }),
          linkProgram: (function (program, gl) {
              return gl.linkProgram(program);
            }),
          useProgram: (function (program, gl) {
              return gl.useProgram(program);
            }),
          uniformMatrix4fv: (function ($$location, value, gl) {
              return gl.uniformMatrix4fv($$location, false, value);
            }),
          uniform1i: (function ($$location, value, gl) {
              return gl.uniform1i($$location, value);
            }),
          uniform1f: (function ($$location, value, gl) {
              return gl.uniform1f($$location, value);
            }),
          uniform3f: (function ($$location, value1, value2, value3, gl) {
              return gl.uniform3f($$location, value1, value2, value3);
            }),
          getAttribLocation: (function (program, name, gl) {
              return gl.getAttribLocation(program, name);
            }),
          getUniformLocation: (function (program, name, gl) {
              return gl.getUniformLocation(program, name);
            }),
          shaderSource: (function (shader, shaderSource, gl) {
              return gl.shaderSource(shader, shaderSource);
            }),
          compileShader: (function (shader, gl) {
              return gl.compileShader(shader);
            }),
          createShader: (function (shaderType, gl) {
              return gl.createShader(shaderType);
            }),
          getParameter: (function (pname, gl) {
              return gl.getParameter(pname);
            }),
          getLinkStatus: (function (gl) {
              return gl.LINK_STATUS;
            }),
          getShaderParameter: (function (shader, parameterName, gl) {
              return gl.getShaderParameter(shader, parameterName);
            }),
          getProgramParameter: (function (program, parameterName, gl) {
              return gl.getProgramParameter(program, parameterName);
            }),
          getShaderInfoLog: (function (shader, gl) {
              return NullableSt$Meta3dCommonlib.getWithDefault(gl.getShaderInfoLog(shader), "");
            }),
          getProgramInfoLog: (function (program, gl) {
              return NullableSt$Meta3dCommonlib.getWithDefault(gl.getProgramInfoLog(program), "");
            }),
          attachShader: (function (program, shader, gl) {
              return gl.attachShader(program, shader);
            }),
          deleteShader: (function (shader, gl) {
              return gl.deleteShader(shader);
            }),
          bindAttribLocation: (function (program, index, name, gl) {
              return gl.bindAttribLocation(program, index, name);
            }),
          getCompileStatus: (function (gl) {
              return gl.COMPILE_STATUS;
            }),
          getVertexShader: (function (gl) {
              return gl.VERTEX_SHADER;
            }),
          getFragmentShader: (function (gl) {
              return gl.FRAGMENT_SHADER;
            }),
          createBuffer: (function (gl) {
              return gl.createBuffer();
            }),
          bindBuffer: (function (arrayBufferType, buffer, gl) {
              return gl.bindBuffer(arrayBufferType, buffer);
            }),
          bufferFloat32Data: (function (arrayBufferType, bufferData, arrayBufferUpdateType, gl) {
              return gl.bufferData(arrayBufferType, bufferData, arrayBufferUpdateType);
            }),
          bufferUint16Data: (function (arrayBufferType, bufferData, arrayBufferUpdateType, gl) {
              return gl.bufferData(arrayBufferType, bufferData, arrayBufferUpdateType);
            }),
          bufferUint32Data: (function (arrayBufferType, bufferData, arrayBufferUpdateType, gl) {
              return gl.bufferData(arrayBufferType, bufferData, arrayBufferUpdateType);
            }),
          getArrayBuffer: (function (gl) {
              return gl.ARRAY_BUFFER;
            }),
          getElementArrayBuffer: (function (gl) {
              return gl.ELEMENT_ARRAY_BUFFER;
            }),
          getStaticDraw: (function (gl) {
              return gl.STATIC_DRAW;
            }),
          getDynamicDraw: (function (gl) {
              return gl.DYNAMIC_DRAW;
            }),
          disableVertexAttribArray: (function (index, gl) {
              return gl.disableVertexAttribArray(index);
            }),
          vertexAttribPointer: (function (attributeLocation, size, _type, normalized, stride, offset, gl) {
              return gl.vertexAttribPointer(attributeLocation, size, _type, normalized, stride, offset);
            }),
          enableVertexAttribArray: (function (attributeLocation, gl) {
              return gl.enableVertexAttribArray(attributeLocation);
            }),
          getExtension: (function (name, gl) {
              return gl.getExtension(name);
            }),
          drawElements: (function (mode, count, _type, offset, gl) {
              return gl.drawElements(mode, count, _type, offset);
            }),
          clearColor: (function (red, green, blue, alpha, gl) {
              return gl.clearColor(red, green, blue, alpha);
            }),
          clear: (function (mask, gl) {
              return gl.clear(mask);
            }),
          getColorBufferBit: (function (gl) {
              return gl.COLOR_BUFFER_BIT;
            }),
          getDepthBufferBit: (function (gl) {
              return gl.DEPTH_BUFFER_BIT;
            }),
          getStencilBufferBit: (function (gl) {
              return gl.STENCIL_BUFFER_BIT;
            }),
          enable: (function (capability, gl) {
              return gl.enable(capability);
            }),
          disable: (function (capability, gl) {
              return gl.disable(capability);
            }),
          getFloat: (function (gl) {
              return gl.FLOAT;
            }),
          getDepthTest: (function (gl) {
              return gl.DEPTH_TEST;
            }),
          getStencilTest: (function (gl) {
              return gl.STENCIL_TEST;
            }),
          getBlend: (function (gl) {
              return gl.BLEND;
            }),
          getCullFace: (function (gl) {
              return gl.CULL_FACE;
            }),
          getFrontAndBack: (function (gl) {
              return gl.FRONT_AND_BACK;
            }),
          getBack: (function (gl) {
              return gl.BACK;
            }),
          getFront: (function (gl) {
              return gl.FRONT;
            }),
          getCurrentProgram: (function (gl) {
              return gl.CURRENT_PROGRAM;
            }),
          getBindingElementArrayBuffer: (function (gl) {
              return gl.ELEMENT_ARRAY_BUFFER_BINDING;
            }),
          getBindingArrayBuffer: (function (gl) {
              return gl.ARRAY_BUFFER_BINDING;
            }),
          getSrcAlpha: (function (gl) {
              return gl.SRC_ALPHA;
            }),
          getOneMinusSrcAlpha: (function (gl) {
              return gl.ONE_MINUS_SRC_ALPHA;
            }),
          isEnabled: (function (capability, gl) {
              return gl.isEnabled(capability);
            }),
          bindVertexArrayOES: (function (arrayObject, gl) {
              return gl.bindVertexArrayOES(arrayObject);
            }),
          blendFunc: (function (sfactor, dfactor, gl) {
              return gl.blendFunc(sfactor, dfactor);
            }),
          getTriangles: (function (gl) {
              return gl.TRIANGLES;
            }),
          getTriangleFan: (function (gl) {
              return gl.TRIANGLE_FAN;
            }),
          getUnsignedInt: (function (gl) {
              return gl.UNSIGNED_INT;
            }),
          getUnsignedShort: (function (gl) {
              return gl.UNSIGNED_SHORT;
            })
        };
}

function createExtensionState(param) {
  
}

function getExtensionLife(param, param$1) {
  return {
          onRegister: null,
          onStart: null,
          onInit: null,
          onUpdate: null
        };
}

export {
  getExtensionService ,
  createExtensionState ,
  getExtensionLife ,
  
}
/* No side effect */
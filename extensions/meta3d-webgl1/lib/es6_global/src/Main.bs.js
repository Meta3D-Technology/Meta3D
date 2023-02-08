

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
              gl.linkProgram(program);
            }),
          useProgram: (function (program, gl) {
              gl.useProgram(program);
            }),
          uniformMatrix4fv: (function ($$location, value, gl) {
              gl.uniformMatrix4fv($$location, false, value);
            }),
          uniform1i: (function ($$location, value, gl) {
              gl.uniform1i($$location, value);
            }),
          uniform1f: (function ($$location, value, gl) {
              gl.uniform1f($$location, value);
            }),
          uniform3f: (function ($$location, value1, value2, value3, gl) {
              gl.uniform3f($$location, value1, value2, value3);
            }),
          getAttribLocation: (function (program, name, gl) {
              return gl.getAttribLocation(program, name);
            }),
          getUniformLocation: (function (program, name, gl) {
              return gl.getUniformLocation(program, name);
            }),
          shaderSource: (function (shader, shaderSource, gl) {
              gl.shaderSource(shader, shaderSource);
            }),
          compileShader: (function (shader, gl) {
              gl.compileShader(shader);
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
              gl.attachShader(program, shader);
            }),
          deleteShader: (function (shader, gl) {
              gl.deleteShader(shader);
            }),
          bindAttribLocation: (function (program, index, name, gl) {
              gl.bindAttribLocation(program, index, name);
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
              gl.bindBuffer(arrayBufferType, buffer);
            }),
          bufferFloat32Data: (function (arrayBufferType, bufferData, arrayBufferUpdateType, gl) {
              gl.bufferData(arrayBufferType, bufferData, arrayBufferUpdateType);
            }),
          bufferUint16Data: (function (arrayBufferType, bufferData, arrayBufferUpdateType, gl) {
              gl.bufferData(arrayBufferType, bufferData, arrayBufferUpdateType);
            }),
          bufferUint32Data: (function (arrayBufferType, bufferData, arrayBufferUpdateType, gl) {
              gl.bufferData(arrayBufferType, bufferData, arrayBufferUpdateType);
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
              gl.disableVertexAttribArray(index);
            }),
          vertexAttribPointer: (function (attributeLocation, size, _type, normalized, stride, offset, gl) {
              gl.vertexAttribPointer(attributeLocation, size, _type, normalized, stride, offset);
            }),
          enableVertexAttribArray: (function (attributeLocation, gl) {
              gl.enableVertexAttribArray(attributeLocation);
            }),
          getExtension: (function (name, gl) {
              gl.getExtension(name);
            }),
          drawElements: (function (mode, count, _type, offset, gl) {
              gl.drawElements(mode, count, _type, offset);
            }),
          clearColor: (function (red, green, blue, alpha, gl) {
              gl.clearColor(red, green, blue, alpha);
            }),
          clear: (function (mask, gl) {
              gl.clear(mask);
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
          viewport: (function (x, y, width, height, gl) {
              gl.viewport(x, y, width, height);
            }),
          scissor: (function (x, y, width, height, gl) {
              gl.scissor(x, y, width, height);
            }),
          enable: (function (capability, gl) {
              gl.enable(capability);
            }),
          disable: (function (capability, gl) {
              gl.disable(capability);
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
          getScissorTest: (function (gl) {
              return gl.SCISSOR_TEST;
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
              gl.bindVertexArrayOES(arrayObject);
            }),
          blendFunc: (function (sfactor, dfactor, gl) {
              gl.blendFunc(sfactor, dfactor);
            }),
          getTriangles: (function (gl) {
              return gl.TRIANGLES;
            }),
          getTriangleFan: (function (gl) {
              return gl.TRIANGLE_FAN;
            }),
          getUnsignedByte: (function (gl) {
              return gl.UNSIGNED_BYTE;
            }),
          getUnsignedInt: (function (gl) {
              return gl.UNSIGNED_INT;
            }),
          getUnsignedShort: (function (gl) {
              return gl.UNSIGNED_SHORT;
            }),
          bindTexture: (function (mode, texture, gl) {
              gl.bindTexture(mode, texture);
            }),
          createTexture: (function (gl) {
              return gl.createTexture();
            }),
          texImage2D: (function (target, level, internalformat, width, height, border, format, type_, pixels, gl) {
              gl.texImage2D(target, level, internalformat, width, height, border, format, type_, pixels);
            }),
          texParameteri: (function (target, pname, param, gl) {
              gl.texParameteri(target, pname, param);
            }),
          getTexture2DType: (function (gl) {
              return gl.TEXTURE_2D;
            }),
          getRGBAType: (function (gl) {
              return gl.RGBA;
            }),
          getDrawingBufferWidth: (function (gl) {
              return gl.drawingBufferWidth;
            }),
          getDrawingBufferHeight: (function (gl) {
              return gl.drawingBufferHeight;
            }),
          getTextureMinFilterType: (function (gl) {
              return gl.TEXTURE_MIN_FILTER;
            }),
          getLinearType: (function (gl) {
              return gl.LINEAR;
            }),
          getTextureWrapSType: (function (gl) {
              return gl.TEXTURE_WRAP_S;
            }),
          getTextureWrapTType: (function (gl) {
              return gl.TEXTURE_WRAP_T;
            }),
          getClampToEdgeType: (function (gl) {
              return gl.CLAMP_TO_EDGE;
            }),
          getFrameBufferType: (function (gl) {
              return gl.FRAMEBUFFER;
            }),
          getRenderBufferType: (function (gl) {
              return gl.RENDERBUFFER;
            }),
          getColorAttachment0: (function (gl) {
              return gl.COLOR_ATTACHMENT0;
            }),
          getDepthAttachment: (function (gl) {
              return gl.DEPTH_ATTACHMENT;
            }),
          getDepthComponent16: (function (gl) {
              return gl.DEPTH_COMPONENT16;
            }),
          createFramebuffer: (function (gl) {
              return gl.createFramebuffer();
            }),
          bindFramebuffer: (function (target, framebuffer, gl) {
              gl.bindFramebuffer(target, framebuffer);
            }),
          framebufferTexture2D: (function (target, attachment, textarget, texture, level, gl) {
              gl.framebufferTexture2D(target, attachment, textarget, texture, level);
            }),
          createRenderbuffer: (function (gl) {
              return gl.createRenderbuffer();
            }),
          bindRenderbuffer: (function (target, renderBuffer, gl) {
              gl.bindRenderbuffer(target, renderBuffer);
            }),
          renderbufferStorage: (function (target, internalFormat, width, height, gl) {
              gl.renderbufferStorage(target, internalFormat, width, height);
            }),
          framebufferRenderbuffer: (function (target, attachment, renderBufferTarget, renderBuffer, gl) {
              gl.framebufferRenderbuffer(target, attachment, renderBufferTarget, renderBuffer);
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

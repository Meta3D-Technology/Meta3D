export type getContext = (canvas: HTMLCanvasElement) => WebGLRenderingContext | null;

// export type createBuffer = (gl: WebGLRenderingContext) => WebGLBuffer;

// export type bindBuffer = (gl: WebGLRenderingContext, arrayBufferType: number, buffer: WebGLBuffer) => void;

// export type getArrayBufferType = (gl: WebGLRenderingContext) => number;

// export type getElementArrayBufferType = (gl: WebGLRenderingContext) => number;

// export type getStaticDraw = (gl: WebGLRenderingContext) => number;

// export type getVertexShaderType = (gl: WebGLRenderingContext) => GLenum;

// export type getFragmentShaderType = (gl: WebGLRenderingContext) => GLenum;

// export type getShaderCompileStatus = (gl: WebGLRenderingContext) => GLenum;

// export type getProgramLinkStatus = (gl: WebGLRenderingContext) => GLenum;

// export type getDrawTrianglesType = (gl: WebGLRenderingContext) => GLenum;

// export type getBufferUnsignedByteType = (gl: WebGLRenderingContext) => GLenum;

// export type getBufferFloatType = (gl: WebGLRenderingContext) => GLenum;

// export type getBufferUnsignedIntType = (gl: WebGLRenderingContext) => GLenum;

// export type bufferFloat32ArrayData = (gl: WebGLRenderingContext, arrayBufferType: number, arrayBufferUpdateType: number, bufferData: Float32Array) => void;


// export type bufferUint32ArrayData = (gl: WebGLRenderingContext, arrayBufferType: number, arrayBufferUpdateType: number, bufferData: Uint32Array) => void;

// export type vertexAttribPointer = (gl: WebGLRenderingContext, index: number, size: number, type: GLenum, normalized: boolean, stride: GLsizei, offset: number) => void;

// export type enableVertexAttribArray = (gl: WebGLRenderingContext, index: number) => void;

// export type createShader = (gl: WebGLRenderingContext, shaderType: GLenum) => WebGLShader;

// export type shaderSource = (gl: WebGLRenderingContext, shader: WebGLShader, shaderSource: string) => void;

// export type compileShader = (gl: WebGLRenderingContext, shader: WebGLShader) => void;

// export type getShaderParameter = (gl: WebGLRenderingContext, shader: WebGLShader, parameterName: GLenum) => any;

// export type getShaderInfoLog = (gl: WebGLRenderingContext, shader: WebGLShader) => string;

// export type createProgram = (gl: WebGLRenderingContext) => WebGLProgram;

// export type attachShader = (gl: WebGLRenderingContext, program: WebGLProgram, shader: WebGLShader) => void;

// export type linkProgram = (gl: WebGLRenderingContext, program: WebGLProgram) => void;

// export type getProgramParameter = (gl: WebGLRenderingContext, program: WebGLProgram, parameterName: GLenum) => any;

// export type getProgramInfoLog = (gl: WebGLRenderingContext, program: WebGLProgram) => string;

// export type uniformMatrix4fv = (gl: WebGLRenderingContext, location: WebGLUniformLocation, value: Float32Array) => void;

// export type useProgram = (gl: WebGLRenderingContext, program: WebGLProgram) => void;

// export type getAttribLocation = (gl: WebGLRenderingContext, program: WebGLProgram, name: string) => number;

// export type getUniformLocation = (gl: WebGLRenderingContext, program: WebGLProgram, name: string) => WebGLUniformLocation;

// export type getExtension = (gl: WebGLRenderingContext, extensionName: string) => void;

// export type drawArrays = (gl: WebGLRenderingContext, mode: GLenum, first: number, count: number) => void;

// export type drawElements = (gl: WebGLRenderingContext, mode: GLenum, count: number, type: GLenum, offset: number) => void;

// export type bufferUint8ArrayData = (gl: WebGLRenderingContext, arrayBufferType: number, arrayBufferUpdateType: number, bufferData: Uint8Array) => void;


// export type uniform4fv = (gl: WebGLRenderingContext, location: WebGLUniformLocation, value: Float32Array) => void;

// export type disableVertexAttribArray = (gl: WebGLRenderingContext, index: number) => void;

// export type bindTexture = (gl:WebGLRenderingContext, mode: GLenum, texture: WebGLTexture | null) => void;

// export type createTexture = (gl: WebGLRenderingContext) => WebGLTexture | null;

// export type texImage2D = (gl: WebGLRenderingContext, target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pixels: ArrayBufferView | null) => void;

// export type texParameteri = (gl: WebGLRenderingContext, target: GLenum, pname: GLenum, param: GLint) => void;

// export type clearColor = (gl: WebGLRenderingContext, red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf) => void;

// export type createFramebuffer = (gl: WebGLRenderingContext) => WebGLFramebuffer | null;

// export type bindFramebuffer = (gl: WebGLRenderingContext, target: GLenum, framebuffer: WebGLFramebuffer | null) => void;

// export type framebufferTexture2D = (gl: WebGLRenderingContext, target: GLenum, attachment: GLenum, textarget: GLenum, texture: WebGLTexture | null, level: GLint) => void;

// export type clear = (gl: WebGLRenderingContext, mask: GLbitfield) => void;

// export type uniform1i = (gl: WebGLRenderingContext, location: WebGLUniformLocation | null, x: GLint) => void;

// export type uniform2fv = (gl: WebGLRenderingContext, location: WebGLUniformLocation | null, v: Float32List) => void;

// export type uniform1f = (gl: WebGLRenderingContext, location: WebGLUniformLocation | null, x: GLfloat) => void;

// export type disable = (gl: WebGLRenderingContext, cap: GLenum) => void;

// export type enable = (gl: WebGLRenderingContext, cap: GLenum) => void;

// export type deleteFramebuffer = (gl: WebGLRenderingContext, framebuffer: WebGLFramebuffer | null) => void;

// export type deleteTexture = (gl: WebGLRenderingContext, texture: WebGLTexture | null) => void;

// export type deleteProgram = (gl: WebGLRenderingContext, program: WebGLProgram | null) => void;

// export type deleteShader = (gl: WebGLRenderingContext, shader: WebGLShader | null) => void;

// export type deleteBuffer = (gl: WebGLRenderingContext, buffer: WebGLBuffer | null) => void;

// export type getFloatType = (gl: WebGLRenderingContext) => number;

// export type getTexture2DType = (gl: WebGLRenderingContext) => number;

// export type getRGBAType = (gl: WebGLRenderingContext) => number;

// export type getDrawingBufferWidth = (gl: WebGLRenderingContext) => number;

// export type getDrawingBufferHeight = (gl: WebGLRenderingContext) => number;

// export type getTextureMinFilterType = (gl:WebGLRenderingContext) => number;

// export type getLinearType = (gl: WebGLRenderingContext) => number;

// export type getTextureWrapSType = (gl: WebGLRenderingContext) => number;

// export type getTextureWrapTType = (gl: WebGLRenderingContext) => number;

// export type getClampToEdgeType = (gl:WebGLRenderingContext) => number;

// export type getFrameBufferType = (gl: WebGLRenderingContext) => number;

// export type getColorAttachment0 = (gl:WebGLRenderingContext) => number;

// export type getColorBufferBit = (gl: WebGLRenderingContext) => number;

// export type getDepthBufferBit = (gl: WebGLRenderingContext) => number;

// export type getDepthTestType = (gl: WebGLRenderingContext) => number;

// export type getBlendType = (gl: WebGLRenderingContext) => number;

// export type getCompileStatusType = (gl: WebGLRenderingContext) => number;

// export type getLinkStatusType = (gl: WebGLRenderingContext) => number;

// export type uniform4f = (gl: WebGLRenderingContext, location: WebGLUniformLocation | null, x: number, y: number, z: number, w: number) => void;

export type service = {
	getContext: getContext
	// bindBuffer: bindBuffer,
	// createBuffer: createBuffer,
	// bufferFloat32ArrayData: bufferFloat32ArrayData,
	// bufferUint32ArrayData: bufferUint32ArrayData,
	// vertexAttribPointer: vertexAttribPointer,
	// enableVertexAttribArray: enableVertexAttribArray,
	// getStaticDraw: getStaticDraw,
	// getArrayBufferType: getArrayBufferType,
	// getElementArrayBufferType: getElementArrayBufferType,
	// getVertexShaderType: getVertexShaderType,
	// getFragmentShaderType: getFragmentShaderType,
	// getShaderCompileStatus: getShaderCompileStatus,
	// getProgramLinkStatus: getProgramLinkStatus,
	// getDrawTrianglesType: getDrawTrianglesType,
	// getBufferUnsignedByteType: getBufferUnsignedByteType,
	// getBufferUnsignedIntType: getBufferUnsignedIntType,
	// getBufferFloatType: getBufferFloatType,
	// createShader: createShader,
	// shaderSource: shaderSource,
	// compileShader: compileShader,
	// getShaderParameter: getShaderParameter,
	// getShaderInfoLog: getShaderInfoLog,
	// createProgram: createProgram,
	// attachShader: attachShader,
	// linkProgram: linkProgram,
	// getAttribLocation: getAttribLocation,
	// getUniformLocation: getUniformLocation,
	// getProgramParameter: getProgramParameter,
	// getProgramInfoLog: getProgramInfoLog,
	// getExtension: getExtension,
	// uniformMatrix4fv: uniformMatrix4fv,
	// useProgram: useProgram,
	// drawArrays: drawArrays,
	// drawElements: drawElements,
	// bufferUint8ArrayData: bufferUint8ArrayData,
	// uniform4fv: uniform4fv,
	// disableVertexAttribArray: disableVertexAttribArray,
	// bindTexture: bindTexture,
	// createTexture: createTexture,
	// texImage2D: texImage2D,
	// texParameteri: texParameteri,
	// clearColor: clearColor,
	// createFramebuffer: createFramebuffer,
	// bindFramebuffer: bindFramebuffer,
	// framebufferTexture2D: framebufferTexture2D,
	// clear: clear,
	// uniform1i: uniform1i,
	// uniform2fv: uniform2fv,
	// uniform1f: uniform1f,
	// disable: disable,
	// enable: enable,
	// deleteFramebuffer: deleteFramebuffer,
	// deleteTexture: deleteTexture,
	// deleteProgram: deleteProgram,
	// deleteShader: deleteShader,
	// deleteBuffer: deleteBuffer,
	// getFloatType: getFloatType,
	// getTexture2DType: getTexture2DType,
	// getRGBAType: getRGBAType,
	// getDrawingBufferWidth: getDrawingBufferWidth,
	// getDrawingBufferHeight: getDrawingBufferHeight,
	// getTextureMinFilterType: getTextureMinFilterType,
	// getLinearType: getLinearType,
	// getTextureWrapSType: getTextureWrapSType,
	// getTextureWrapTType: getTextureWrapTType,
	// getClampToEdgeType: getClampToEdgeType,
	// getFrameBufferType: getFrameBufferType,
	// getColorAttachment0: getColorAttachment0,
	// getColorBufferBit: getColorBufferBit,
	// getDepthBufferBit: getDepthBufferBit,
	// getDepthTestType: getDepthTestType,
	// getBlendType: getBlendType,
	// getCompileStatusType: getCompileStatusType,
	// getLinkStatusType: getLinkStatusType,
	// uniform4f: uniform4f,
}
import { SinonSandbox, SinonStub } from "sinon";

export type WebGL1 = {
	createBuffer: SinonStub,
	getArrayBufferType: SinonStub,
	getElementArrayBufferType: SinonStub,
	getStaticDraw: SinonStub,
	getVertexShaderType: SinonStub,
	getFragmentShaderType: SinonStub,
	getDrawTrianglesType: SinonStub,
	getBufferUnsignedByteType: SinonStub,
	getBufferFloatType: SinonStub,
	getBufferUnsignedIntType: SinonStub,
	bindBuffer: SinonStub,
	bufferFloat32ArrayData: SinonStub,
	bufferUint32ArrayData: SinonStub,
	vertexAttribPointer: SinonStub,
	enableVertexAttribArray: SinonStub,
	createShader: SinonStub,
	shaderSource: SinonStub,
	compileShader: SinonStub,
	getShaderParameter: SinonStub,
	getShaderInfoLog: SinonStub,
	getShaderCompileStatus: SinonStub,
	getProgramLinkStatus: SinonStub,
	createProgram: SinonStub,
	attachShader: SinonStub,
	linkProgram: SinonStub,
	getProgramParameter: SinonStub,
	getProgramInfoLog: SinonStub,
	uniformMatrix4fv: SinonStub,
	useProgram: SinonStub,
	getAttribLocation: SinonStub,
	getUniformLocation: SinonStub,
	drawArrays: SinonStub,
	drawElements: SinonStub,
	getExtension: SinonStub,
}

export let createWebGL1 = (sandbox: SinonSandbox): WebGL1 => {
	let webgl1 = {
		createBuffer: sandbox.stub(),
		getArrayBufferType: sandbox.stub(),
		getElementArrayBufferType: sandbox.stub(),
		getStaticDraw: sandbox.stub(),
		getVertexShaderType: sandbox.stub(),
		getFragmentShaderType: sandbox.stub(),
		getDrawTrianglesType: sandbox.stub(),
		getBufferUnsignedByteType: sandbox.stub(),
		getBufferFloatType: sandbox.stub(),
		getBufferUnsignedIntType: sandbox.stub(),
		bindBuffer: sandbox.stub(),
		bufferFloat32ArrayData: sandbox.stub(),
		bufferUint32ArrayData: sandbox.stub(),
		vertexAttribPointer: sandbox.stub(),
		enableVertexAttribArray: sandbox.stub(),
		createShader: sandbox.stub(),
		shaderSource: sandbox.stub(),
		compileShader: sandbox.stub(),
		getShaderParameter: sandbox.stub(),
		getShaderInfoLog: sandbox.stub(),
		getShaderCompileStatus: sandbox.stub(),
		getProgramLinkStatus: sandbox.stub(),
		createProgram: sandbox.stub(),
		attachShader: sandbox.stub(),
		linkProgram: sandbox.stub(),
		getProgramParameter: sandbox.stub(),
		getProgramInfoLog: sandbox.stub(),
		uniformMatrix4fv: sandbox.stub(),
		useProgram: sandbox.stub(),
		getAttribLocation: sandbox.stub(),
		getUniformLocation: sandbox.stub(),
		drawArrays: sandbox.stub(),
		drawElements: sandbox.stub(),
		getExtension: sandbox.stub()
	};

	return webgl1;
}

export let prepareWebGL1Implement = (webgl1: WebGL1) => {
	let fakeWebGLBuffers: WebGLBuffer[] = [{
		name: 0
	}, {
		name: 1
	}, {
		name: 2
	}, {
		name: 3
	}];

	let fakeProgram: WebGLProgram = {};

	let fakeUniformLocation = [0, 1, 2, 3];

	let fakeAttribLocation = [0, 1, 2, 3];

	webgl1.createBuffer.onCall(0).returns(fakeWebGLBuffers[0]);
	webgl1.createBuffer.onCall(1).returns(fakeWebGLBuffers[1]);
	webgl1.createBuffer.onCall(2).returns(fakeWebGLBuffers[2]);
	webgl1.createBuffer.onCall(3).returns(fakeWebGLBuffers[3]);
	webgl1.getShaderParameter.returns(true);
	webgl1.getProgramParameter.returns(true);
	webgl1.createProgram.returns(fakeProgram);

	webgl1.getUniformLocation.onCall(0).returns(fakeUniformLocation[0]);
	webgl1.getUniformLocation.onCall(1).returns(fakeUniformLocation[1]);
	webgl1.getUniformLocation.onCall(2).returns(fakeUniformLocation[2]);
	webgl1.getUniformLocation.onCall(3).returns(fakeUniformLocation[3]);

	webgl1.getAttribLocation.onCall(0).returns(fakeAttribLocation[0]);
	webgl1.getAttribLocation.onCall(1).returns(fakeAttribLocation[1]);
	webgl1.getAttribLocation.onCall(2).returns(fakeAttribLocation[2]);
	webgl1.getAttribLocation.onCall(3).returns(fakeAttribLocation[3]);
	return { fakeWebGLBuffers, fakeProgram, fakeUniformLocation, fakeAttribLocation }
}
export type window = any

export type context = any

export type adapter = any

export type device = any

export type queue = any

export type swapChain = any

export type buffer = any

export type shaderModule = any

export type bindGroupLayout = any

export type renderPipelineLayout = any

export type renderPipeline = any

export type textureView = any

export type commandEncoder = any

export type commandBuffer = any

export type renderPassEncoder = any

export type windowDescriptor = {
	width: number, height: number, title: string, resizable: boolean
}

export type adapterDescriptor = {
	window: window,
	preferredBackend?: string,
};

export type swapChainConfig = {
	device: device,
	format: textureFormat
}

export type bufferUsage = number

export type bufferDescriptor = {
	size: number,
	usage: bufferUsage
}

export type pipelineLayoutConfig = {
	bindGroupLayouts: bindGroupLayout[]
}

export type shaderModuleDescriptor = {
	code: string
}

export type vertexBuffer = {
	arrayStride: number,
	stepMode: string,
	attributes: [{
		shaderLocation: number,
		offset: number,
		format: string
	}]
}

export type renderPipelineDescriptor = {
	layout: renderPipelineLayout,
	vertexStage: {
		module: shaderModule,
		entryPoint: string
	},
	fragmentStage: {
		module: shaderModule,
		entryPoint: string
	},
	primitiveTopology: string,
	vertexState: {
		indexFormat: string,
		vertexBuffers: vertexBuffer[]
	},
	colorStates: [{
		format: textureFormat,
		alphaBlend: {},
		colorBlend: {}
	}]
}

export type commandEncoderDescriptor = {

}

export type colorAttachment = {
	clearColor: {
		r: number, g: number, b: number, a: number,
	},
	loadOp: string,
	storeOp: string,
	attachment: textureView
}

export type renderPassEncoderDescriptor = {
	colorAttachments: colorAttachment[]
}

export type textureFormat = string;

export type createWindow = (descriptor: windowDescriptor) => window

export type getContext = (window: window) => context

export type requestAdapter = (descriptor: adapterDescriptor) => Promise<adapter>

export type requestDevice = (adapter: adapter) => Promise<device>

export type getQueue = (device: device) => queue

export type getSwapChainPreferredFormat = (device: device, context: context) => Promise<textureFormat>

export type configureSwapChain = (context: context, swapChainConfig: swapChainConfig) => swapChain

export type createBuffer = (device: device, bufferDescriptor: bufferDescriptor) => buffer

export type setSubData = (buffer: buffer, offset: number, data: Float32Array | Uint32Array) => void

export type createPipelineLayout = (device: device, pipelineLayoutConfig: pipelineLayoutConfig) => renderPipelineLayout

export type createShaderModule = (device: device, shaderModuleDescriptor: shaderModuleDescriptor) => shaderModule

export type createRenderPipeline = (device: device, renderPipelineDescriptor: renderPipelineDescriptor) => renderPipeline

export type getCurrentTextureView = (swapChain: swapChain) => textureView

export type createCommandEncoder = (device: device, commandEncoderDescriptor: commandEncoderDescriptor) => commandEncoder

export type beginRenderPass = (commandEncoder: commandEncoder, renderPassEncoderDescriptor: renderPassEncoderDescriptor) => renderPassEncoder

export type setPipeline = (renderPassEncoder: renderPassEncoder, renderPipeline: renderPipeline) => void

export type setVertexBuffer = (renderPassEncoder: renderPassEncoder, slot: number, vertexBuffer: buffer, offset: number, size?: number) => void

export type setIndexBuffer = (renderPassEncoder: renderPassEncoder, indexBuffer: buffer) => void

export type drawIndexed = (renderPassEncoder: renderPassEncoder, indexCount: number, instanceCount: number, firstIndex: number, baseVertex: number, firstInstance: number) => void

export type endPass = (renderPassEncoder: renderPassEncoder) => void

export type finish = (commandEncoder: commandEncoder) => commandBuffer

export type submit = (queue: queue, commandBuffers: commandBuffer[]) => void

export type present = (swapChain: swapChain) => void

export type pollEvents = (window: window) => void

export type getBufferUsageStorage = () => number

export type getBufferUsageUniform = () => number

export type getBufferUsageIndirect = () => number

export type getBufferUsageVertex = () => number

export type getBufferUsageIndex = () => number

export type getBufferUsageCopySrc = () => number

export type getBufferUsageCopyDst = () => number

export type service = {
	createWindow: createWindow,
	getContext: getContext,
	requestAdapter: requestAdapter,
	requestDevice: requestDevice,
	getQueue: getQueue,
	getSwapChainPreferredFormat: getSwapChainPreferredFormat,
	configureSwapChain: configureSwapChain,
	createBuffer: createBuffer,
	setSubData: setSubData,
	createPipelineLayout: createPipelineLayout,
	createShaderModule: createShaderModule,
	createRenderPipeline: createRenderPipeline,
	getCurrentTextureView: getCurrentTextureView,
	createCommandEncoder: createCommandEncoder,
	beginRenderPass: beginRenderPass,
	setPipeline: setPipeline,
	setVertexBuffer: setVertexBuffer,
	setIndexBuffer: setIndexBuffer,
	drawIndexed: drawIndexed,
	endPass: endPass,
	finish: finish,
	submit: submit,
	present: present,
	pollEvents: pollEvents,
	getBufferUsageStorage: getBufferUsageStorage,
	getBufferUsageUniform: getBufferUsageUniform,
	getBufferUsageIndirect: getBufferUsageIndirect,
	getBufferUsageVertex: getBufferUsageVertex,
	getBufferUsageIndex: getBufferUsageIndex,
	getBufferUsageCopySrc: getBufferUsageCopySrc,
	getBufferUsageCopyDst: getBufferUsageCopyDst
}
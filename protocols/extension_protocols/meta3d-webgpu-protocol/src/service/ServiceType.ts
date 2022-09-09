// export type window = any

export type context = any

export type adapter = any

export type device = any

export type queue = any

// export type swapChain = any

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

// export type adapterDescriptor = {
// 	window: window,
// 	preferredBackend?: string,
// };

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

export type colorTargetState = {
	format: textureFormat
}

export type primitive = {
	topology: 'triangle-list'
}

export type renderPipelineDescriptor = {
	layout: renderPipelineLayout,
	vertex: {
		module: shaderModule,
		entryPoint: string
	},
	fragment: {
		module: shaderModule,
		entryPoint: string,
		targets: colorTargetState[]
	},
	primitive: primitive,
	// vertexState?: {
	// 	indexFormat: string,
	// 	vertexBuffers: vertexBuffer[]
	// },
	// colorStates: [{
	// 	format: textureFormat,
	// 	alphaBlend: {},
	// 	colorBlend: {}
	// }]
}

export type commandEncoderDescriptor = {

}

export type colorAttachment = {
	clearValue: {
		r: number, g: number, b: number, a: number,
	},
	loadOp: string,
	storeOp: string,
	view: textureView
}

export type renderPassEncoderDescriptor = {
	colorAttachments: colorAttachment[]
}

export type textureFormat = string;

// export type createWindow = (descriptor: windowDescriptor) => window

// export type getContext = (window: window) => context
export type getContext = (canvas: HTMLCanvasElement) => context

// export type requestAdapter = (descriptor: adapterDescriptor) => Promise<adapter>
export type requestAdapter = () => Promise<adapter>

export type requestDevice = (adapter: adapter) => Promise<device>

export type presentationFormat = textureFormat

export type getPreferredCanvasFormat = () => presentationFormat

// export type getQueue = (device: device) => queue

// export type getSwapChainPreferredFormat = (device: device, context: context) => Promise<textureFormat>

export type configureDescriptor = {
	device: device,
	format: presentationFormat,
	alphaMode: "premultiplied"
}

// export type configureSwapChain = (context: context, swapChainConfig: swapChainConfig) => swapChain
export type configure = (context: context, configureDescriptor: configureDescriptor) => void

// export type createBuffer = (device: device, bufferDescriptor: bufferDescriptor) => buffer

export type createPipelineLayout = (device: device, pipelineLayoutConfig: pipelineLayoutConfig) => renderPipelineLayout

export type createShaderModule = (device: device, shaderModuleDescriptor: shaderModuleDescriptor) => shaderModule

export type createRenderPipeline = (device: device, renderPipelineDescriptor: renderPipelineDescriptor) => renderPipeline

export type getCurrentTextureView = (context: context) => textureView

export type createCommandEncoder = (device: device, commandEncoderDescriptor: commandEncoderDescriptor) => commandEncoder

export type beginRenderPass = (commandEncoder: commandEncoder, renderPassEncoderDescriptor: renderPassEncoderDescriptor) => renderPassEncoder

export type setPipeline = (renderPassEncoder: renderPassEncoder, renderPipeline: renderPipeline) => void

// export type setVertexBuffer = (renderPassEncoder: renderPassEncoder, slot: number, vertexBuffer: buffer, offset: number, size?: number) => void

// export type setIndexBuffer = (renderPassEncoder: renderPassEncoder, indexBuffer: buffer) => void

export type draw = (renderPassEncoder: renderPassEncoder, vertexCount: number, instanceCount: number, firstVertex: number, firstInstance: number) => void

// export type drawIndexed = (renderPassEncoder: renderPassEncoder, indexCount: number, instanceCount: number, firstIndex: number, baseVertex: number, firstInstance: number) => void

export type end = (renderPassEncoder: renderPassEncoder) => void

export type finish = (commandEncoder: commandEncoder) => commandBuffer

export type submit = (queue: queue, commandBuffers: commandBuffer[]) => void

// export type getBufferUsageStorage = () => number

// export type getBufferUsageUniform = () => number

// export type getBufferUsageIndirect = () => number

// export type getBufferUsageVertex = () => number

// export type getBufferUsageIndex = () => number

// export type getBufferUsageCopySrc = () => number

// export type getBufferUsageCopyDst = () => number

export type service = {
	getContext: getContext,
	requestAdapter: requestAdapter,
	requestDevice: requestDevice,
	// getQueue: getQueue,
	// getSwapChainPreferredFormat: getSwapChainPreferredFormat,
	getPreferredCanvasFormat: getPreferredCanvasFormat,
	configure: configure,
	// createBuffer: createBuffer,
	createPipelineLayout: createPipelineLayout,
	createShaderModule: createShaderModule,
	createRenderPipeline: createRenderPipeline,
	getCurrentTextureView: getCurrentTextureView,
	createCommandEncoder: createCommandEncoder,
	beginRenderPass: beginRenderPass,
	setPipeline: setPipeline,
	// setVertexBuffer: setVertexBuffer,
	// setIndexBuffer: setIndexBuffer,
	draw: draw,
	// drawIndexed: drawIndexed,
	end: end,
	finish: finish,
	submit: submit,
	// getBufferUsageStorage: getBufferUsageStorage,
	// getBufferUsageUniform: getBufferUsageUniform,
	// getBufferUsageIndirect: getBufferUsageIndirect,
	// getBufferUsageVertex: getBufferUsageVertex,
	// getBufferUsageIndex: getBufferUsageIndex,
	// getBufferUsageCopySrc: getBufferUsageCopySrc,
	// getBufferUsageCopyDst: getBufferUsageCopyDst
}
import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-work-plugin-webgpu-triangle-protocol/src/StateType"

let vertexShaderWGSL = `
@vertex
fn main(@builtin(vertex_index) VertexIndex : u32)
     -> @builtin(position) vec4<f32> {
  var pos = array<vec2<f32>, 3>(
      vec2<f32>(0.0, 0.5),
      vec2<f32>(-0.5, -0.5),
      vec2<f32>(0.5, -0.5));

  return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
}
    `;

let fragmentShaderWGSL = `
@fragment
fn main() -> @location(0) vec4<f32> {
  return vec4<f32>(1.0, 0.0, 0.0, 1.0);
}
    `;

let _getAndInitCanvas = () => {
	let canvas = document.querySelector("#webgpu") as HTMLCanvasElement

	canvas.width = 600
	canvas.style.width = "600px"
	canvas.height = 600
	canvas.style.height = "600px"

	return canvas
}

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let state = getState(states)
	let { mostService, webgpuService } = state

	return mostService.fromPromise(
		webgpuService.requestAdapter().then(adapter => {
			return webgpuService.requestDevice(adapter).then(device => {
				let context = webgpuService.getContext(_getAndInitCanvas())

				let presentationFormat = webgpuService.getPreferredCanvasFormat()

				webgpuService.configure(context, {
					device,
					format: presentationFormat,
					alphaMode: "premultiplied"
				})

				let pipeline = webgpuService.createRenderPipeline(device, {
					layout: webgpuService.createPipelineLayout(device, { bindGroupLayouts: [] }),
					vertex: {
						module: webgpuService.createShaderModule(device, {
							code: vertexShaderWGSL,
						}),
						entryPoint: 'main',
					},
					fragment: {
						module: webgpuService.createShaderModule(device, {
							code: fragmentShaderWGSL,
						}),
						entryPoint: 'main',
						targets: [
							{
								format: presentationFormat,
							},
						],
					},
					primitive: {
						topology: 'triangle-list',
					},
				})

				return setStatesFunc<states>(
					engineCoreState,
					setState(states, {
						...getState(states),
						device,
						context,
						renderPipeline: pipeline
					})
				)
			})
		})
	)
}
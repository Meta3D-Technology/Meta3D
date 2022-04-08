import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { getState, setState } from "../Utils"
import { states } from "engine-work-plugin-pathtracer-protocol"
import { componentName as geometryComponentName, geometry, vertices, indices, dataName } from "meta3d-component-geometry-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(engineCoreState)
    let { mostService, engineCoreService, webgpuService, fsService, device, swapChainFormat } = getState(states)

    device = getExn(device)

    return mostService.callFunc(() => {
        let usedGeometryContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)

        let triangleGeometry = engineCoreService.getAllComponents<geometry>(usedGeometryContribute)[0]

        let triangleVertices = getExn(engineCoreService.getComponentData<geometry, vertices>(usedGeometryContribute, triangleGeometry, dataName.vertices))

        let vertexBuffer = webgpuService.createBuffer(device, {
            size: triangleVertices.byteLength,
            usage: webgpuService.getBufferUsageVertex() | webgpuService.getBufferUsageCopyDst()
        })
        webgpuService.setSubData(vertexBuffer, 0, triangleVertices)

        let triangleIndices = getExn(engineCoreService.getComponentData<geometry, indices>(usedGeometryContribute, triangleGeometry, dataName.indices))

        let indexBuffer = webgpuService.createBuffer(device, {
            size: triangleIndices.byteLength,
            usage: webgpuService.getBufferUsageIndex() | webgpuService.getBufferUsageCopyDst()
        })
        webgpuService.setSubData(indexBuffer, 0, triangleIndices)

        let layout = webgpuService.createPipelineLayout(device, {
            bindGroupLayouts: []
        })

        // let vertexShaderModule = webgpuService.createShaderModule(device, { code: fsService.readFileSync(fsService.joinRootPath("lessons/triangle_rasterization/code/shader/scene.vert"), "utf-8") })
        // let fragmentShaderModule = webgpuService.createShaderModule(device, { code: fsService.readFileSync(fsService.joinRootPath("lessons/triangle_rasterization/code/shader/scene.frag"), "utf-8") })
        let vertexShaderModule = webgpuService.createShaderModule(device, { code: fsService.readFileSync(fsService.joinRootPath("scene.vert"), "utf-8") })
        let fragmentShaderModule = webgpuService.createShaderModule(device, { code: fsService.readFileSync(fsService.joinRootPath("scene.frag"), "utf-8") })

        let renderPipeline = webgpuService.createRenderPipeline(device, {
            layout,
            vertexStage: {
                module: vertexShaderModule,
                entryPoint: "main"
            },
            fragmentStage: {
                module: fragmentShaderModule,
                entryPoint: "main"
            },
            primitiveTopology: "triangle-list",
            vertexState: {
                indexFormat: "uint32",
                vertexBuffers: [{
                    arrayStride: 2 * Float32Array.BYTES_PER_ELEMENT,
                    stepMode: "vertex",
                    attributes: [{
                        shaderLocation: 0,
                        offset: 0,
                        format: "float2"
                    }]
                }]
            },
            colorStates: [{
                format: getExn(swapChainFormat),
                alphaBlend: {},
                colorBlend: {}
            }]
        })


        return setStatesFunc<states>(
            engineCoreState,
            setState(states, {
                ...getState(states),
                indexCount: triangleIndices.length,
                vertexBuffer,
                indexBuffer,
                renderPipeline
            })
        )
    })
}
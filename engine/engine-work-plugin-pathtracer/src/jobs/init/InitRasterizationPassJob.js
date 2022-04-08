"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execFunc = void 0;
const Utils_1 = require("../Utils");
const meta3d_component_geometry_protocol_1 = require("meta3d-component-geometry-protocol");
const NullableUtils_1 = require("meta3d-commonlib-ts/src/NullableUtils");
let execFunc = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc(engineCoreState);
    let { mostService, engineCoreService, webgpuService, fsService, device, swapChainFormat, dirname } = (0, Utils_1.getState)(states);
    device = (0, NullableUtils_1.getExn)(device);
    return mostService.callFunc(() => {
        let usedGeometryContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_geometry_protocol_1.componentName);
        let triangleGeometry = engineCoreService.getAllComponents(usedGeometryContribute)[0];
        let triangleVertices = (0, NullableUtils_1.getExn)(engineCoreService.getComponentData(usedGeometryContribute, triangleGeometry, meta3d_component_geometry_protocol_1.dataName.vertices));
        let vertexBuffer = webgpuService.createBuffer(device, {
            size: triangleVertices.byteLength,
            usage: webgpuService.getBufferUsageVertex() | webgpuService.getBufferUsageCopyDst()
        });
        webgpuService.setSubData(vertexBuffer, 0, triangleVertices);
        let triangleIndices = (0, NullableUtils_1.getExn)(engineCoreService.getComponentData(usedGeometryContribute, triangleGeometry, meta3d_component_geometry_protocol_1.dataName.indices));
        let indexBuffer = webgpuService.createBuffer(device, {
            size: triangleIndices.byteLength,
            usage: webgpuService.getBufferUsageIndex() | webgpuService.getBufferUsageCopyDst()
        });
        webgpuService.setSubData(indexBuffer, 0, triangleIndices);
        let layout = webgpuService.createPipelineLayout(device, {
            bindGroupLayouts: []
        });
        let vertexShaderModule = webgpuService.createShaderModule(device, { code: fsService.readFileSync(dirname + "./src/shader/scene.vert", "utf-8") });
        let fragmentShaderModule = webgpuService.createShaderModule(device, { code: fsService.readFileSync(dirname + "./src/shader/scene.frag", "utf-8") });
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
                    format: (0, NullableUtils_1.getExn)(swapChainFormat),
                    alphaBlend: {},
                    colorBlend: {}
                }]
        });
        return setStatesFunc(engineCoreState, (0, Utils_1.setState)(states, Object.assign(Object.assign({}, (0, Utils_1.getState)(states)), { indexCount: triangleIndices.length, vertexBuffer,
            indexBuffer,
            renderPipeline })));
    });
};
exports.execFunc = execFunc;
//# sourceMappingURL=InitRasterizationPassJob.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkPluginContribute = void 0;
const InitWebGPUJob_1 = require("./jobs/init/InitWebGPUJob");
const InitRasterizationPassJob_1 = require("./jobs/init/InitRasterizationPassJob");
const RenderRasterizationPassJob_1 = require("./jobs/render/RenderRasterizationPassJob");
const EndRenderJob_1 = require("./jobs/render/EndRenderJob");
const engine_work_plugin_pathtracer_protocol_1 = require("engine-work-plugin-pathtracer-protocol");
let _getExecFunc = (_pipelineName, jobName) => {
    switch (jobName) {
        case "init_webgpu_pathtracer_engine":
            return InitWebGPUJob_1.execFunc;
        case "init_rasterization_pass_pathtracer_engine":
            return InitRasterizationPassJob_1.execFunc;
        case "render_pathtracer_engine":
            return RenderRasterizationPassJob_1.execFunc;
        case "end_pathtracer_engine":
            return EndRenderJob_1.execFunc;
        default:
            return null;
    }
};
let _init = (_state) => {
};
let getWorkPluginContribute = ({ mostService, webgpuService, engineCoreService, fsService, width, height, dirname }) => {
    return {
        workPluginName: engine_work_plugin_pathtracer_protocol_1.workPluginName,
        createStateFunc: () => {
            return {
                mostService,
                webgpuService,
                engineCoreService,
                fsService,
                width,
                height,
                dirname,
                window: null,
                device: null,
                adapter: null,
                context: null,
                queue: null,
                swapChainFormat: null,
                swapChain: null,
                vertexBuffer: null,
                indexBuffer: null,
                renderPipeline: null,
                indexCount: null,
            };
        },
        initFunc: _init,
        getExecFunc: _getExecFunc,
        allPipelineData: [
            {
                name: "init",
                groups: [
                    {
                        name: "first_pathtracer_engine",
                        link: "concat",
                        elements: [
                            {
                                "name": "init_webgpu_pathtracer_engine",
                                "type_": "job"
                            },
                            {
                                "name": "init_rasterization_pass_pathtracer_engine",
                                "type_": "job"
                            }
                        ]
                    }
                ],
                first_group: "first_pathtracer_engine"
            },
            {
                name: "render",
                groups: [
                    {
                        name: "first_pathtracer_engine",
                        link: "concat",
                        elements: [
                            {
                                "name": "render_pathtracer_engine",
                                "type_": "job"
                            },
                            {
                                "name": "end_pathtracer_engine",
                                "type_": "job"
                            }
                        ]
                    }
                ],
                first_group: "first_pathtracer_engine"
            }
        ],
    };
};
exports.getWorkPluginContribute = getWorkPluginContribute;
//# sourceMappingURL=Main.js.map
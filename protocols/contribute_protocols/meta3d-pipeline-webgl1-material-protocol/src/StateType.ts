import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { program, service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { pipelineName as dataPipelineName, state as dataState } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"
import { map } from "meta3d-immutable-protocol/src/service/MapType"

export const pipelineName = "WebGL1_Material"

export enum pipeline {
    Update = "update",
}

export enum job {
    InitMaterial = "init_material_webgl1_material_meta3d",
}

export const allPipelineData: allPipelineDataType = [
    {
        name: pipeline.Update,
        groups: [
            {
                name: "first_webgl1_material_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.InitMaterial,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_webgl1_material_meta3d"
    }
]

export type programMap = map<number, program>;

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    immutableService: immutableService,
    material: {
        programMap: programMap
    },
    // pipelineWhichHasAllMaterialIndicesName: string,
}

// export type pipelineWhichHasAllMaterialIndicesState = {
//     allMaterialIndices: number[]
// }

export type states = {
    // [pipelineWhichHasAllMaterialIndicesName: string]: pipelineWhichHasAllMaterialIndicesState | dataState | state,
    [dataPipelineName]: dataState,
    [pipelineName]: state
}

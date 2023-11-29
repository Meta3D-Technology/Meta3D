import { state as meta3dState } from "meta3d-type"
import { service as engineBasicService_ } from "meta3d-engine-basic-protocol/src/service/ServiceType"
import { service as engineCoreService_ } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as mostService_ } from "meta3d-bs-most-protocol/src/service/ServiceType"
// import { service as immutableService_ } from "meta3d-immutable-protocol/src/service/ServiceType"
import { execFunc as execFuncType_ } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { pipelineContribute as pipelineContribute_ } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";
import { jobOrders as jobOrders_ } from "meta3d-engine-core-protocol/src/state/vo/RegisterPipelineVOType"

export type engineBasicService = engineBasicService_

export type engineCoreService = engineCoreService_

export type mostService = mostService_

// export type immutableService = immutableService_

export type execFuncType = execFuncType_

export type pipelineContribute<config, state> = pipelineContribute_<config, state>

export type jobOrders = jobOrders_

export type service = {
    engineBasic: (meta3dState: meta3dState) => engineBasicService,
    engineCore: (meta3dState: meta3dState) => engineCoreService,
    most: (meta3dState: meta3dState) => mostService,
    // immutable: (meta3dState: meta3dState) => immutableService,

    // prepare: (meta3dState: meta3dState, isDebug: boolean) => meta3dState
}

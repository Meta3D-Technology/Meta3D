import { state as meta3dState } from "meta3d-type"
import { service as engineCoreService_ } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as mostService_ } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { execFunc as execFuncType_ } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { pipelineContribute as pipelineContribute_ } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";

export type engineCoreService = engineCoreService_

export type mostService = mostService_

export type execFuncType = execFuncType_

export type pipelineContribute<config, state> = pipelineContribute_<config, state>

export type service = {
    engineCore: (meta3dState: meta3dState) => engineCoreService,
    most: (meta3dState: meta3dState) => mostService,
    prepare: (meta3dState: meta3dState, isDebug: boolean) => meta3dState
}

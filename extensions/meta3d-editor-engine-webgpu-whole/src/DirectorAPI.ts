import { state as meta3dState, api } from "meta3d-type"
import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

let _runPipeline = (api: api, meta3dState: meta3dState,
    meta3dBsMostExtensionProtocolName: string,
    meta3dEngineCoreExtensionProtocolName: string,
    pipelineName: string): Promise<meta3dState> => {
    let tempMeta3DState: nullable<meta3dState> = null

    let { map } = api.getExtensionService<mostService>(
        meta3dState,
        meta3dBsMostExtensionProtocolName
    )

    let { runPipeline } = api.getExtensionService<engineCoreService>(
        meta3dState,
        meta3dEngineCoreExtensionProtocolName
    )

    // TODO remove map, use subsrcibe->complete?
    return map(
        (meta3dState: meta3dState) => {
            tempMeta3DState = meta3dState

            return meta3dState
        },
        runPipeline(meta3dState, meta3dEngineCoreExtensionProtocolName, pipelineName)
    ).drain().then((_) => {
        return getExn(tempMeta3DState)
    })
}

export let init = (api: api, meta3dState: meta3dState,
    meta3dBsMostExtensionProtocolName: string,
    meta3dEngineCoreExtensionProtocolName: string
) => {
    return _runPipeline(api, meta3dState, meta3dBsMostExtensionProtocolName, meta3dEngineCoreExtensionProtocolName, "init")
}

export let update = (api: api, meta3dState: meta3dState,
    meta3dBsMostExtensionProtocolName: string,
    meta3dEngineCoreExtensionProtocolName: string
) => {
    return _runPipeline(api, meta3dState, meta3dBsMostExtensionProtocolName, meta3dEngineCoreExtensionProtocolName, "update")
}

export let render = (api: api, meta3dState: meta3dState,
    meta3dBsMostExtensionProtocolName: string,
    meta3dEngineCoreExtensionProtocolName: string
) => {
    return _runPipeline(api, meta3dState, meta3dBsMostExtensionProtocolName, meta3dEngineCoreExtensionProtocolName, "render")
}
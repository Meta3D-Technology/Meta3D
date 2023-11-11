import { state as meta3dState, api } from "meta3d-type"
import { service } from "meta3d-core-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

let _runPipeline = (api: api, meta3dState: meta3dState,
    pipelineName: string): Promise<meta3dState> => {
    let tempMeta3DState: nullable<meta3dState> = null

    let { map } = getExn(api.getPackageService<service>(
        meta3dState,
        "meta3d-core-protocol"
    )).most(meta3dState)

    let { runPipeline } = getExn(api.getPackageService<service>(
        meta3dState,
        "meta3d-core-protocol"
    )).engineCore(meta3dState)

    // TODO remove map, use subsrcibe->complete?
    return map(
        (meta3dState: meta3dState) => {
            tempMeta3DState = meta3dState

            return meta3dState
        },
        runPipeline(meta3dState, "meta3d-engine-core-protocol", pipelineName)
    ).drain().then((_) => {
        return getExn(tempMeta3DState)
    })
}

export let init = (api: api, meta3dState: meta3dState,
) => {
    return _runPipeline(api, meta3dState, "init")
}

export let update = (api: api, meta3dState: meta3dState,
) => {
    return _runPipeline(api, meta3dState, "update")
}

export let render = (api: api, meta3dState: meta3dState,
) => {
    return _runPipeline(api, meta3dState, "render")
}
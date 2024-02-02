import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-gameviewrender-protocol/src/StateType";
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import { service as renderService } from "meta3d-editor-gameview-render-protocol/src/service/ServiceType"
import { api, state as meta3dState } from "meta3d-type"

let _eval = (value: string) => {
    return eval('(' + value + ')')
}

let _execOnUpdate = (meta3dState: meta3dState, api: api, eventFileStrs: Array<string>): Promise<meta3dState> => {
    let _exec = (meta3dState: meta3dState, index: number) => {
        if (index >= eventFileStrs.length) {
            return Promise.resolve(meta3dState)
        }

        let { onUpdate } = _eval(eventFileStrs[index])


        return onUpdate(api, meta3dState).then((meta3dState: meta3dState) => {
            return _exec(meta3dState, index + 1)
        })
    }

    return _exec(meta3dState, 0)
}

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService } = getState(states)

    if (
        api.getExtensionService<renderService>(meta3dState, "meta3d-editor-gameview-render-protocol").isPipelineStop(meta3dState)
        || api.getExtensionService<renderService>(meta3dState, "meta3d-editor-gameview-render-protocol").isPipelineRunOnlyOnce(meta3dState)
    ) {
        return mostService.just(meta3dState)
    }

    let engineSceneService = getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))

    let eventFileStrs = engineSceneService.gameObject.getAllGameObjects(meta3dState).filter(gameObject => {
        return engineSceneService.gameObject.hasScript(meta3dState, gameObject)
    }).map(gameObject => {
        return engineSceneService.gameObject.getScript(meta3dState, gameObject)
    }).filter(script => {
        return !api.nullable.isNullable(engineSceneService.script.getEventFileStr(meta3dState, script))
    }).map(script => {
        return api.nullable.getExn(engineSceneService.script.getEventFileStr(meta3dState, script))
    })

    return mostService.fromPromise(_execOnUpdate(meta3dState, api, eventFileStrs))
}
import { api, state as meta3dState } from "meta3d-type"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"

let _eval = (value: string) => {
    return eval('(' + value + ')')
}

let _exec = (meta3dState: meta3dState, api: api, eventFileStrs: Array<string>, eventHandleName: string): Promise<meta3dState> => {
    let _func = (meta3dState: meta3dState, index: number) => {
        if (index >= eventFileStrs.length) {
            return Promise.resolve(meta3dState)
        }

        return _eval(eventFileStrs[index])[eventHandleName](api, meta3dState).then((meta3dState: meta3dState) => {
            return _func(meta3dState, index + 1)
        })
    }

    return _func(meta3dState, 0)
}

export let execEventHandle = (meta3dState: meta3dState, api: api, eventHandleName: string) => {
    let engineSceneService = api.nullable.getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))

    let eventFileStrs = engineSceneService.gameObject.getAllGameObjects(meta3dState).filter(gameObject => {
        return engineSceneService.gameObject.hasScript(meta3dState, gameObject)
    }).map(gameObject => {
        return engineSceneService.gameObject.getScript(meta3dState, gameObject)
    }).filter(script => {
        return !api.nullable.isNullable(engineSceneService.script.getEventFileStr(meta3dState, script))
    }).map(script => {
        return api.nullable.getExn(engineSceneService.script.getEventFileStr(meta3dState, script))
    })

    return _exec(meta3dState, api, eventFileStrs, eventHandleName)
}
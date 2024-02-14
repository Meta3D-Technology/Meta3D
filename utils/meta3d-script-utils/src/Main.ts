import { api, state as meta3dState } from "meta3d-type"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { flatten } from "meta3d-structure-utils/src/ArrayUtils"
import { gameObject } from "meta3d-gameobject-protocol"

let _eval = (value: string) => {
    return eval('(' + value + ')')
}

let _exec = (meta3dState: meta3dState, api: api, gameObject: gameObject, eventFileStrs: Array<string>, eventHandleName: string): Promise<meta3dState> => {
    let _func = (meta3dState: meta3dState, index: number) => {
        if (index >= eventFileStrs.length) {
            return Promise.resolve(meta3dState)
        }

        return _eval(eventFileStrs[index])[eventHandleName](meta3dState, api, gameObject).then((meta3dState: meta3dState) => {
            return _func(meta3dState, index + 1)
        })
    }

    return _func(meta3dState, 0)
}

export let execEventHandle = (meta3dState: meta3dState, api: api, eventHandleName: string) => {
    let engineSceneService = api.nullable.getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))

    let eventFileStrDataAndGameObject = flatten(engineSceneService.gameObject.getAllGameObjects(meta3dState).filter(gameObject => {
        return engineSceneService.gameObject.hasScript(meta3dState, gameObject)
    }).map(gameObject => {
        return [gameObject, engineSceneService.gameObject.getScript(meta3dState, gameObject)]
    }).filter(([_, script]) => {
        return !api.nullable.isNullable(engineSceneService.script.getAllAssetData(meta3dState, script))
    }).map(([gameObject, script]) => {
        return api.nullable.getExn(engineSceneService.script.getAllAssetData(meta3dState, script)).concat([gameObject as any])
    }))

    let gameObject = eventFileStrDataAndGameObject[eventFileStrDataAndGameObject.length - 1] as any as gameObject

    return _exec(meta3dState, api, gameObject, eventFileStrDataAndGameObject.slice(0, -1).map(({ eventFileStr }) => eventFileStr), eventHandleName)
}
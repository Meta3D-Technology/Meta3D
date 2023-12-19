import { gameObject } from "meta3d-gameobject-protocol"
import { state as meta3dState, api } from "meta3d-type"
import { service } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { treeIndexData } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export type hierachyGameObjects = Array<[gameObject, hierachyGameObjects]>

export let getAllTopGameObjects = (api: api, meta3dState: meta3dState, editorWholeService: service) => {
    let { gameObject, transform } = editorWholeService.scene(meta3dState)

    return gameObject.getAllGameObjects(meta3dState).filter(gameObject_ => {
        return api.nullable.isNullable(transform.getParent(meta3dState, gameObject.getTransform(meta3dState, gameObject_)))
    })
}

export let buildHierachyGameObjects = (api: api, result: hierachyGameObjects,
    editorWholeService: service,
    meta3dState: meta3dState, parentGameObjects: Array<gameObject>): hierachyGameObjects => {
    let { gameObject, transform } = editorWholeService.scene(meta3dState)

    return parentGameObjects.reduce((result, parentGameObject) => {
        let children = transform.getChildren(meta3dState, gameObject.getTransform(meta3dState, parentGameObject))

        if (api.nullable.isNullable(children) || api.nullable.getExn(children).length == 0) {
            result.push([parentGameObject, []])
        }
        else {
            result.push([parentGameObject, buildHierachyGameObjects(api, [], editorWholeService, meta3dState, api.nullable.getExn(children).map(child => {
                return transform.getGameObjects(meta3dState, child)[0]
            })
            )])
        }

        return result
    }, result)
}


export let findSelectedGameObject = (api: api, hierachyGameObjects: hierachyGameObjects, treeIndexData: treeIndexData): gameObject => {
    let _func = (hierachyGameObjects: hierachyGameObjects, index: number, treeIndexData: treeIndexData): gameObject => {
        if (treeIndexData.length == 0) {
            return hierachyGameObjects[index][0]
        }

        return _func(hierachyGameObjects[index][1], api.nullable.getExn(treeIndexData[0]), treeIndexData.slice(1))
    }

    return _func(hierachyGameObjects, api.nullable.getExn(treeIndexData[0]), treeIndexData.slice(1))
}
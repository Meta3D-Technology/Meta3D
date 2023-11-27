import { gameObject } from "meta3d-gameobject-protocol"
import { state as meta3dState, api } from "meta3d-type"
import { service } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { treeIndexData } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export type hierachyGameObjects = Array<[gameObject, hierachyGameObjects]>

export let getAllTopGameObjects = (meta3dState: meta3dState, editorWholeService: service) => {
    let { gameObject, transform } = editorWholeService.scene(meta3dState)

    return gameObject.getAllGameObjects(meta3dState).filter(gameObject_ => {
        return isNullable(transform.getParent(meta3dState, gameObject.getTransform(meta3dState, gameObject_)))
    })
}

export let buildHierachyGameObjects = (result: hierachyGameObjects,
    editorWholeService: service,
    meta3dState: meta3dState, parentGameObjects: Array<gameObject>): hierachyGameObjects => {
    let { gameObject, transform } = editorWholeService.scene(meta3dState)

    return parentGameObjects.reduce((result, parentGameObject) => {
        let children = transform.getChildren(meta3dState, gameObject.getTransform(meta3dState, parentGameObject))

        if (isNullable(children) || getExn(children).length == 0) {
            result.push([parentGameObject, []])
        }
        else {
            result.push([parentGameObject, buildHierachyGameObjects([], editorWholeService, meta3dState, getExn(children).map(child => {
                return transform.getGameObjects(meta3dState, child)[0]
            })
            )])
        }

        return result
    }, result)
}


export let findSelectedGameObject = (hierachyGameObjects: hierachyGameObjects, treeIndexData: treeIndexData): gameObject => {
    let _func = (hierachyGameObjects: hierachyGameObjects, index: number, treeIndexData: treeIndexData): gameObject => {
        if (treeIndexData.length == 0) {
            return hierachyGameObjects[index][0]
        }

        return _func(hierachyGameObjects[index][1], getExn(treeIndexData[0]), treeIndexData.slice(1))
    }

    return _func(hierachyGameObjects, getExn(treeIndexData[0]), treeIndexData.slice(1))
}
import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data, nodeType } from "meta3d-input-tree-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { hierachyGameObjects, getAllTopGameObjects, buildHierachyGameObjects } from "meta3d-scenetree-utils/src/SceneTreeUtils"
import { service } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getWithDefault } from "meta3d-commonlib-ts/src/NullableUtils"

let _convertToTreeData = (
    editorWholeService: service,
    meta3dState: meta3dState, hierachyGameObjects: hierachyGameObjects,
): data => {
    let { gameObject } = editorWholeService.scene(meta3dState)

    return hierachyGameObjects.map(([gameObject_, children]) => {
        return [
            getWithDefault(gameObject.getGameObjectName(meta3dState, gameObject_), ""),
            gameObject.hasBasicCameraView(meta3dState, gameObject_) && gameObject.hasPerspectiveCameraProjection(meta3dState, gameObject_) ? nodeType.Type1 :
                gameObject.hasDirectionLight(meta3dState, gameObject_) ? nodeType.Type2 :
                    nodeType.Type3,
            _convertToTreeData(editorWholeService, meta3dState, children)
        ]
    })
}

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "SceneTreeInput",
        func: (meta3dState) => {
            let editorWholeService = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol"))

            let hierachyGameObjects = buildHierachyGameObjects([],
                editorWholeService,
                meta3dState, getAllTopGameObjects(meta3dState, editorWholeService))

            return Promise.resolve(_convertToTreeData(
                editorWholeService,
                meta3dState, hierachyGameObjects
            ))
        }
    }
}

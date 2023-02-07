import { getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { actionData } from "meta3d-action-add-cube-protocol"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "./DependentMapType"
// import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
// import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { service as editorEngineWholeService } from "meta3d-editor-engine-whole-protocol/src/service/ServiceType"
// import { state as editorEngineWholeState } from "meta3d-editor-engine-whole-protocol/src/state/StateType"
import { state as meta3dState } from "meta3d-type"

let _createCubeGameObject = (meta3dState: meta3dState, { scene }: editorEngineWholeService) => {
    let data = scene.gameObject.createGameObject(meta3dState)
    meta3dState = data[0]
    let gameObject = data[1]


    data = scene.transform.createTransform(meta3dState)
    meta3dState = data[0]
    let transform = data[1]

    meta3dState = scene.gameObject.addTransform(meta3dState, gameObject, transform)

    data = scene.geometry.createGeometry(meta3dState)
    meta3dState = data[0]
    let geometry = data[1]


    let vertices = new Float32Array([
        1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
        -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0
    ])

    let indices = new Uint32Array([
        0, 1, 2, 0, 2, 3,
        4, 5, 6, 4, 6, 7,
        8, 9, 10, 8, 10, 11,
        12, 13, 14, 12, 14, 15,
        16, 17, 18, 16, 18, 19,
        20, 21, 22, 20, 22, 23
    ])
    meta3dState = scene.geometry.setVertices(meta3dState, geometry, vertices)
    meta3dState = scene.geometry.setIndices(meta3dState, geometry, indices)
    meta3dState = scene.gameObject.addGeometry(meta3dState, gameObject, geometry)


    meta3dState = scene.gameObject.addGeometry(meta3dState, gameObject, geometry)



    data = scene.pbrMaterial.createPBRMaterial(meta3dState)
    meta3dState = data[0]
    let material = data[1]
    meta3dState = scene.pbrMaterial.setDiffuseColor(meta3dState, material, [Math.random(), Math.random(), Math.random()])
    meta3dState = scene.gameObject.addPBRMaterial(meta3dState, gameObject, material)



    meta3dState = scene.transform.setLocalPosition(meta3dState, transform, [Math.random() * 10 - 5, Math.random() * 10 - 5, 0])


    return meta3dState
}

export let getContribute: getContributeMeta3D<dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap, actionContribute<actionData>> = (api, [dependentExtensionProtocolNameMap, _]) => {
    let { meta3dEditorEngineWholeExtensionProtocolName } = dependentExtensionProtocolNameMap

    return {
        actionName: "AddCube",
        handler: (meta3dState, actionData) => {
            console.log("add cube")

            let editorEngineWholeService = api.getExtensionService<editorEngineWholeService>(meta3dState, meta3dEditorEngineWholeExtensionProtocolName)

            meta3dState = _createCubeGameObject(meta3dState, editorEngineWholeService)

            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }
    }
}

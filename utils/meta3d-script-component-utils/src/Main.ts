import { api, state as meta3dState } from "meta3d-type"
import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { gameObject } from "meta3d-gameobject-protocol"
import { assetData } from "meta3d-component-script-protocol"

export let findAssetData = (meta3dState: meta3dState, api: api, selectedGameObject: gameObject, name: string) => {
    let { gameObject, script } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

    let scriptComponent = gameObject.getScript(meta3dState, selectedGameObject)

    return api.nullable.getExn(api.nullable.getExn(script.getAllAssetData(meta3dState, scriptComponent)).find(assetData => assetData.name == name))
}

export let removeAssetData = (meta3dState: meta3dState, api: api, selectedGameObject: gameObject, name: string) => {
    let { gameObject, script } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

    let scriptComponent = gameObject.getScript(meta3dState, selectedGameObject)


    return script.setAllAssetData(meta3dState, scriptComponent, api.nullable.getExn(script.getAllAssetData(meta3dState, scriptComponent)).filter(assetData => assetData.name != name))
}

export let addAssetData = (meta3dState: meta3dState, api: api, selectedGameObject: gameObject, assetData: assetData) => {
    let { gameObject, script } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

    let scriptComponent = gameObject.getScript(meta3dState, selectedGameObject)

    return script.setAllAssetData(meta3dState, scriptComponent, api.nullable.getWithDefault(script.getAllAssetData(meta3dState, scriptComponent), []).concat([assetData]))
}
// import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { state as meta3dState, api } from "meta3d-type"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { allAssetData, attributeValue } from "meta3d-component-script-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export type extensionValue = {
    attribute: nullable<attributeValue>,
    allAssetData: nullable<allAssetData>
}

type gameObjectName = string

export type allScriptData = Array<[gameObjectName, extensionValue]>

export let buildKey = () => "Meta3D_script"

export let buildValue = (value: extensionValue): extensionValue => value

export let getValue = (engineSceneService: engineSceneService, meta3dState: meta3dState, gameObject): extensionValue => {
    let scriptComponent = engineSceneService.gameObject.getScript(meta3dState, gameObject)

    return {
        attribute: engineSceneService.script.getAttribute(meta3dState, scriptComponent),
        allAssetData: engineSceneService.script.getAllAssetData(meta3dState, scriptComponent),
    }
}
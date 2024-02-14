import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-list-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as addAssetActionName, state as addAssetState, asset, assetType } from "meta3d-action-add-asset-protocol"
import { getSelectedGameObject } from "meta3d-select-inspector-node-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "SelectScriptAssetNamesInput",
        func: (meta3dState) => {
            let { allAddedAssets } = api.nullable.getExn(
                api.action.getActionState<addAssetState>(meta3dState, addAssetActionName)
            )

            let engineSceneService = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

            let gameObject = api.nullable.getExn(getSelectedGameObject(meta3dState, api))

            let script = engineSceneService.gameObject.getScript(meta3dState, gameObject)

            let scriptAssetNames = api.nullable.getWithDefault(
                engineSceneService.script.getAllAssetData(meta3dState, script),
                []
            ).map(({ name }) => name)

            return Promise.resolve(allAddedAssets.filter(asset => asset[0] == assetType.Script).map(asset => asset[2]).toArray().filter(name => {
                return !scriptAssetNames.includes(name)
            }))
        }
    }
}

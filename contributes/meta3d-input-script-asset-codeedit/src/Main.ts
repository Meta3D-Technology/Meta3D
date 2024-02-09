import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-codeedit-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getSelectedAsset } from "meta3d-select-inspector-node-utils/src/Main"
import { actionName as addAssetActionName, state as addAssetState, id } from "meta3d-action-add-asset-protocol"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ScriptAssetCodeEditInput",
        func: (meta3dState) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map(selectedAssetId => {
                        let { allAddedAssets } = api.nullable.getExn(
                            api.action.getActionState<addAssetState>(meta3dState, addAssetActionName)
                        )

                        let asset = api.nullable.getExn(
                            allAddedAssets.find(asset => {
                                return asset[1] == selectedAssetId
                            })
                        )

                        return asset[4] as string
                    },
                        getSelectedAsset(meta3dState, api)
                    ),
                    ""
                )
            )
        }
    }
}

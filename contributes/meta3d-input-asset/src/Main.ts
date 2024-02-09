import { getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-asset-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, asset, state } from "meta3d-action-add-asset-protocol/src/StateType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "AssetInput",
        func: (meta3dState) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map(
                        (state) => {
                            return state.allAddedAssets.map(([_assetType, id, name, icon, _data]: asset) => [name, id, icon]).toArray() as data
                        },
                        api.action.getActionState<state>(meta3dState, actionName)
                    ),
                    []
                )
            )
        }
    }
}

import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-modal-protocol"
import { actionName, state } from "meta3d-action-operate-select-script-asset-modal-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "SelectScriptAssetModalInput",
        func: (meta3dState) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map(({ isOpen }) => isOpen,
                        api.action.getActionState<state>(meta3dState, actionName)
                    ),
                    false
                )
            )
        }
    }
}

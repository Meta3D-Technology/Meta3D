import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { data } from "meta3d-input-modal-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as infoActionName, state as infoState } from "meta3d-action-mod-career-info-protocol"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModInfoModalInput",
        func: (meta3dState) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map(({ info }) => {
                        return !api.nullable.isNullable(info)
                    },
                        api.action.getActionState<infoState>(meta3dState, infoActionName)
                    ),
                    false
                )
            )
        }
    }
}

import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { data } from "meta3d-input-modal-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModSelectTabInput",
        func: (meta3dState, [initActionName, fieldName, tabKey]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map((data) => {
                        return data[fieldName] == tabKey
                    },
                        api.action.getActionState<any>(meta3dState, initActionName)
                    ),
                    false
                )
            )
        }
    }
}

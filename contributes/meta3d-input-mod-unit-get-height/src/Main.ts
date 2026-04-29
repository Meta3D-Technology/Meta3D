import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { data } from "meta3d-input-mod-get-value-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitGetHeightInput",
        func: (meta3dState) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map((data) => {
                        return data.scale * 2
                    },
                        api.action.getActionState<any>(meta3dState, initActionName)
                    ),
                    0
                )
            )
        }
    }
}

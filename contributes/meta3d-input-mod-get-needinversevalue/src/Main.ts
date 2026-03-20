import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { data } from "meta3d-input-mod-get-needinversevalue-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModGetNeedInverseValueInput",
        func: (meta3dState, [initActionName, fieldName, maxValue]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map((data) => {
                        return 1 / data[fieldName] * maxValue
                    },
                        api.action.getActionState<any>(meta3dState, initActionName)
                    ),
                    0
                )
            )
        }
    }
}

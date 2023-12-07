import { getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-switch-button-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as runActionName, state as runState } from "meta3d-action-run-protocol"
import { func1 } from "./Utils1"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "RunStopButtonInput",
        func: (meta3dState) => {
            let runState = api.action.getActionState<runState>(meta3dState, runActionName)

            if (api.nullable.isNullable(runState)) {
                return Promise.resolve(false)
            }

            // runState = api.nullable.getExn(runState)

            return Promise.resolve(func1())
        }
    }
}

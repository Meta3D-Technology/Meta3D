import { getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-runstopbutton-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { actionName as runActionName, state as runState } from "meta3d-action-run-protocol"
import { getActionStateInInput } from "meta3d-ui-utils/src/ElementStateUtils"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "RunStopButtonInput",
        func: (meta3dState) => {
            let runState = getActionStateInInput<runState>(meta3dState, api, runActionName)

            if (isNullable(runState)) {
                return Promise.resolve(false)
            }

            runState = getExn(runState)

            return Promise.resolve(runState.isRun)
        }
    }
}

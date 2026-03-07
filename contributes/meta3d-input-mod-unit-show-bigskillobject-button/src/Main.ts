import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-button-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state } from "meta3d-action-mod-unit-init-protocol"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitShowBigSkillObjectButtonInput",
        func: (meta3dState) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map(state => state.hasBigSkillObject, api.action.getActionState<state>(meta3dState, actionName)),
                    false
                )
            )
        }
    }
}

import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-button-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state } from "meta3d-action-mod-unit-init-protocol"
import { emitterType } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitShowSelectInstanceButtonInput",
        func: (meta3dState, [emitterTypeFieldName]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map(state => state[emitterTypeFieldName] == emitterType.Instance, api.action.getActionState<any>(meta3dState, actionName)),
                    false
                )
            )
        }
    }
}

import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-input-text-protocol"
import { actionName, state } from "meta3d-action-mod-career-publish-to-game-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModCareerAuthorInput",
        func: (meta3dState) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map(({ author }) => author,
                        api.action.getActionState<state>(meta3dState, actionName)
                    ),
                    ""
                )
            )
        }
    }
}

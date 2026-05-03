import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-text-protocol"
import { actionName, state } from "meta3d-action-mod-unit-upload-model-file-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitModelFileNameInput",
        func: (meta3dState, [key]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.bind(({ files }) => {
                        return api.nullable.map(data => data[0], files.get(key))
                    },
                        api.action.getActionState<state>(meta3dState, actionName)
                    ),
                    null
                )
            )
        }
    }
}

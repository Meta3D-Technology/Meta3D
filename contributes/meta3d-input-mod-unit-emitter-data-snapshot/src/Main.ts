import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-image-protocol"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitEmitterDataSnapshotInput",
        func: (meta3dState, [allFieldName, selectedIndexFieldName]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.bind((state) => {
                        return api.nullable.bind(selectedIndex => {
                            return state[allFieldName].get(selectedIndex).snapshotImageBase64
                        }, state[selectedIndexFieldName])
                    },
                        api.action.getActionState<any>(meta3dState, initActionName)
                    ),
                    null
                )
            )
        }
    }
}

import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-grid-protocol"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitSelectPropInput",
        func: (meta3dState) => {
            let allPropData = api.nullable.getWithDefault(
                api.nullable.map(state => {
                    return state.allPropData.toArray().map((prop) => {
                        return {
                            name: prop.name,
                            imageBase64: prop.snapshotImageBase64
                        }
                    }).sort((a, b) => {
                        return a.name.localeCompare(b.name)
                    })
                }, api.action.getActionState<initState>(meta3dState, initActionName)),
                []
            )

            return Promise.resolve(
                allPropData
            )
        }
    }
}

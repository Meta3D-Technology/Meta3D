import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-grid-protocol"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitSelectPropInput",
        func: (meta3dState) => {
            let allPropData = api.nullable.getWithDefault(
                api.nullable.map(state => {
                    return state.allPropData.toArray().filter(d => {
                        return state.prop.filter(p => p.name == d.name).length == 0
                    }).map((prop) => {
                        return {
                            name: getLanguageTextData(api, meta3dState, prop.name),
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

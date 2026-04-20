import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-grid-protocol"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitSelectEmitterDataInput",
        func: (meta3dState, [allEmitterFieldName, isGetLanguageTextData]) => {
            let allModelData = api.nullable.getWithDefault(
                api.nullable.map(state => {
                    return api.nullable.getExn(state[allEmitterFieldName]).toArray().map((data: any) => {
                        return {
                            name: isGetLanguageTextData ? getLanguageTextData(api, meta3dState, state.languageTextData, data.name) : data.name,
                            imageBase64: data.snapshotImageBase64
                        }
                    })
                    // .sort((a: any, b: any) => {
                    //     return a.name.localeCompare(b.name)
                    // })
                }, api.action.getActionState<any>(meta3dState, initActionName)),
                []
            )

            return Promise.resolve(
                allModelData
            )
        }
    }
}

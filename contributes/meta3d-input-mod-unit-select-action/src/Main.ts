import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-grid-protocol"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"
import { skillObject } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { getActionData, getActionEntries } from "meta3d-action-mod-unit-skill-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitSelectActionInput",
        func: (meta3dState, [isShowSkillModalFieldName]) => {
            let allActionData = api.nullable.getWithDefault(
                api.nullable.map(state => {
                    let category = api.nullable.getExn(api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName)).category

                    // return Array.from(api.nullable.getExn(state.allActionData.get(
                    //     category
                    // )).entries()).filter(([action, actionData]) => {
                    //     return actionData.skillObject == skillObject.All
                    //         || (
                    //             state.isShowSmallSkillModal ? actionData.skillObject == skillObject.Small : actionData.skillObject == skillObject.Big
                    //         )
                    // })
                    return getActionEntries(api, state, state[isShowSkillModalFieldName as keyof initState], category)
                        .map(([action, actionData]) => {
                            return {
                                name: getLanguageTextData(api, meta3dState, state.languageTextData, action),
                                imageBase64: actionData.snapshotImageBase64
                            }
                        })
                    // .sort((a, b) => {
                    //     return a.name.localeCompare(b.name)
                    // })
                }, api.action.getActionState<initState>(meta3dState, initActionName)),
                []
            )

            return Promise.resolve(
                allActionData
            )
        }
    }
}

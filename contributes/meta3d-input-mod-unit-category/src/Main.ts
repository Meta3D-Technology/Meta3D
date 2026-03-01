import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
// import { language } from "meta3d-action-mod-career-add-careerfeature-protocol"
import { data } from "meta3d-input-popup-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
// import { actionName as languageActionName, state as languageState } from "meta3d-action-mod-language-protocol"
import { actionName, state } from "meta3d-action-mod-unit-init-protocol"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitCategoryInput",
        func: (meta3dState) => {
            // let isChinese = api.nullable.getWithDefault(
            //     api.nullable.map(
            //         (languageState) => languageState.language == language.Chinese,
            //         api.action.getActionState<languageState>(meta3dState, languageActionName),
            //     ),
            //     true
            // )

            // return Promise.resolve(
            //     isChinese ? [
            //         "小人",
            //         "巨大娘"
            //     ] : [
            //         "LittleMan",
            //         "Giantess"
            //     ]
            // )

            // let allModelData = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName)).allModelData
            let allModelData = api.nullable.getWithDefault(
                api.nullable.map(state => Array.from(state.allModelData.keys()), api.action.getActionState<state>(meta3dState, actionName)),
                []
            )

            return Promise.resolve(
                allModelData
            )
        }
    }
}

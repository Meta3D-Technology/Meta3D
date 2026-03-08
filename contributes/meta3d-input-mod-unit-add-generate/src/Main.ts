import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
// import { language } from "meta3d-action-mod-career-add-careerfeature-protocol"
import { data } from "meta3d-input-popup-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
// import { actionName as languageActionName, state as languageState } from "meta3d-action-mod-language-protocol"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitAddGenerateInput",
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
            return Promise.resolve(
                [
                    "加入在进攻城市关卡中的单位生成配置",
                    "加入在防卫城市关卡中的单位生成配置",
                    "加入在Boss关卡中的单位生成配置",
                ]
            )
        }
    }
}

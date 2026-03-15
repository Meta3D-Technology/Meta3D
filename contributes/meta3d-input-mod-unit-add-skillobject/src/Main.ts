import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
// import { language} from "meta3d-language-utils/src/Type"
import { data } from "meta3d-input-popup-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
// import { actionName as languageActionName, state as languageState } from "meta3d-action-mod-language-protocol"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"
import { languageKey } from "meta3d-language-utils/src/Type"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitAddSkillObjectInput",
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
                    getLanguageTextData(api, meta3dState, languageKey.ForSmallUnit),
                    getLanguageTextData(api, meta3dState, languageKey.ForBigUnit),
                ]
            )
        }
    }
}

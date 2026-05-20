import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
// import { language} from "meta3d-language-utils/src/Type"
import { data } from "meta3d-input-popup-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
// import { actionName as languageActionName, state as languageState } from "meta3d-action-mod-language-protocol"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"
import { languageKey } from "meta3d-language-utils/src/Type"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"
import { category } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitAddSkillObjectInput",
        func: (meta3dState) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map((data) => {
                        switch (api.nullable.getExn(api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName)).category) {
                            case category.EliteGiantess:
                                return [
                                    getLanguageTextData(api, meta3dState, data.languageTextData, languageKey.ForSmallUnit),
                                    getLanguageTextData(api, meta3dState, data.languageTextData, languageKey.ForBigUnit),
                                ]
                            default:
                                return [
                                    getLanguageTextData(api, meta3dState, data.languageTextData, languageKey.ForBigUnit),
                                ]
                        }
                    },
                        api.action.getActionState<initState>(meta3dState, initActionName)
                    ),
                    []
                )
            )
        }
    }
}

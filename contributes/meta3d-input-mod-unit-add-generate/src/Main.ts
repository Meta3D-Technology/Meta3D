import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
// import { language} from "meta3d-language-utils/src/Type"
import { data } from "meta3d-input-popup-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
// import { actionName as languageActionName, state as languageState } from "meta3d-action-mod-language-protocol"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"
import { languageKey } from "meta3d-language-utils/src/Type"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitAddGenerateInput",
        func: (meta3dState) => {
            return Promise.resolve(
                [
                    getLanguageTextData(api, meta3dState, languageKey.AddGenerateDataInAttackCityStage),
                    getLanguageTextData(api, meta3dState, languageKey.AddGenerateDataInProtectCityStage),
                    getLanguageTextData(api, meta3dState, languageKey.AddGenerateDataInBossStage),
                ]
            )
        }
    }
}

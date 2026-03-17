import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-popup-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"
import { getDamageEffectTypesBySkillType } from "meta3d-action-mod-unit-skill-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitDamageTypeInput",
        func: (meta3dState, [actionFieldName]) => {
            let data = getDamageEffectTypesBySkillType(api, meta3dState, actionFieldName)

            return Promise.resolve(
                data.map(d => getLanguageTextData(api, meta3dState, d))
            )
        }
    }
}

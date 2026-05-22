import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { data } from "meta3d-input-window-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getSkillType } from "meta3d-action-mod-unit-skill-utils/src/Main"
import { skillType } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"

let _isNotShowAnySkillModalExceptEmitter = (api: api, meta3dState: meta3dState) => {
    let {
        isShowSmallSkillModal,
        isShowBigSkillModal,
        isShowSmallSkillObjectActionValueModal,
        isShowSmallSkillObjectDamageValueModal,
        isShowSmallSkillObjectDamageEffectModal,
        isShowSmallSkillObjectSubEffectModal,
        isShowBigSkillObjectActionValueModal,
        isShowBigSkillObjectDamageValueModal,
        isShowBigSkillObjectDamageEffectModal,
        isShowBigSkillObjectSubEffectModal,
    } = api.nullable.getExn(api.action.getActionState<initState>(meta3dState, initActionName))

    return !isShowSmallSkillModal
        && !isShowBigSkillModal
        && !isShowSmallSkillObjectActionValueModal
        && !isShowSmallSkillObjectDamageValueModal
        && !isShowSmallSkillObjectDamageEffectModal
        && !isShowSmallSkillObjectSubEffectModal
        && !isShowBigSkillObjectActionValueModal
        && !isShowBigSkillObjectDamageValueModal
        && !isShowBigSkillObjectDamageEffectModal
        && !isShowBigSkillObjectSubEffectModal
}

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitShowEmitterWindowInput",
        func: (meta3dState, [selectedActionIndexFieldName, isForAssistant]) => {
            let skillType_ = getSkillType(api, meta3dState, selectedActionIndexFieldName)

            return Promise.resolve(
                _isNotShowAnySkillModalExceptEmitter(api, meta3dState)
                &&
                (
                    api.nullable.getWithDefault(api.nullable.map(isForAssistant => Boolean(isForAssistant), isForAssistant), false) ? skillType_ == skillType.Assistant
                        : skillType_ == skillType.Ranged
                )
            )
        }
    }
}

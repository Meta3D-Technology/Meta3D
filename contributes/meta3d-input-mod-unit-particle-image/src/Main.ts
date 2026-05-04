import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-image-protocol"
import { actionName, state } from "meta3d-action-mod-unit-upload-particle-image-protocol"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { emitterType } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitParticleImageInput",
        func: (meta3dState, [selectedSkillObjectEmitterImageIndexFieldName, emitterTypeFieldName]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.bind(({ images }) => {
                        let initState = api.action.getActionState<initState>(meta3dState, initActionName)
                        if (!api.nullable.isNullable(initState[selectedSkillObjectEmitterImageIndexFieldName])
                            || initState[emitterTypeFieldName] != emitterType.Particle) {
                            return api.nullable.getEmpty()
                        }

                        return images.get(selectedSkillObjectEmitterImageIndexFieldName)
                    },
                        api.action.getActionState<state>(meta3dState, actionName)
                    ),
                    null
                )
            )
        }
    }
}

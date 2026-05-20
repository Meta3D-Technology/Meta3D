import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-unit-set-category-protocol"
import { eventName, inputData } from "meta3d-action-mod-unit-set-category-protocol/src/EventType"
// import { actionName as publishToGameActionName, state as publishToGameState } from "meta3d-action-mod-unit-publish-to-game-protocol"
import { armyScale, category, scale } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, index: number) => {
                    let allModelData = api.nullable.getExn(api.action.getActionState<initState>(meta3dState, initActionName)).allModelData

                    let category_ = Array.from(allModelData.keys())[index]

                    meta3dState = api.action.setActionState<state>(meta3dState, actionName, {
                        category: category_
                    })


                    let defaultScale
                    switch (category_) {
                        case category.EliteGiantess:
                            defaultScale = scale.Level5
                            break
                        default:
                            defaultScale = armyScale.Level0
                            break
                    }
                    meta3dState = api.action.setActionState<initState>(meta3dState, initActionName, {
                        ...api.nullable.getExn(api.action.getActionState<initState>(meta3dState, initActionName)),
                        scale: defaultScale,

                        selectedModelIndex: 0,
                        selectedSmallSkillObjectActionIndex: 0,
                        selectedSmallSkillObjectEmitterParticleImageIndex: api.nullable.getEmpty(),
                        selectedSmallSkillObjectEmitterInstanceIndex: api.nullable.getEmpty(),
                        selectedBigSkillObjectActionIndex: 0,
                        selectedBigSkillObjectEmitterParticleImageIndex: api.nullable.getEmpty(),
                        selectedBigSkillObjectEmitterInstanceIndex: api.nullable.getEmpty(),

                    })

                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })

        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    isOnlyRead: true,
                    inputData: [
                        uiData
                    ]
                }))
            })
        },
        createState: (meta3dState) => {
            return {
                category: category.EliteGiantess
            }
        }
    }
}

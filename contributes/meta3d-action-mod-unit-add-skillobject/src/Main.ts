import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-unit-add-skillobject-protocol"
import { eventName, inputData } from "meta3d-action-mod-unit-add-skillobject-protocol/src/EventType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"
import { category } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"


export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, index) => {
                    switch (api.nullable.getExn(api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName)).category) {
                        case category.EliteGiantess:
                            let fieldName
                            switch (index) {
                                case 0:
                                    fieldName = "hasSmallSkillObject"
                                    break
                                case 1:
                                    fieldName = "hasBigSkillObject"
                                    break
                                default:
                                    throw new Error("error")
                            }

                            meta3dState = api.action.setActionState<initState>(meta3dState, initActionName, {
                                ...api.action.getActionState<initState>(meta3dState, initActionName),
                                [fieldName]: true
                            })
                            break
                        default:
                            meta3dState = api.action.setActionState<initState>(meta3dState, initActionName, {
                                ...api.action.getActionState<initState>(meta3dState, initActionName),
                                hasSmallSkillObject: false,
                                hasBigSkillObject: true
                            })
                            break
                    }

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
                    inputData: [uiData]
                }))
            })
        },
        createState: () => {
            return null
        }
    }
}

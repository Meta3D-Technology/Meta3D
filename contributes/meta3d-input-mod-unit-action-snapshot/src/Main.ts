import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-image-protocol"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { skillObject } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { getActionData } from "meta3d-action-mod-unit-skill-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitActionSnapshotInput",
        func: (meta3dState, [fieldName]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.bind((data) => {
                        let category = api.nullable.getExn(api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName)).category

                        // return api.nullable.bind(actionData => {
                        //     return api.nullable.bind(selectedActionIndex => {
                        //         return Array.from(actionData.filter((actionData) => {
                        //             return actionData.skillObject == skillObject.All
                        //                 || (
                        //                     isSmallSkill ? actionData.skillObject == skillObject.Small : actionData.skillObject == skillObject.Big
                        //                 )
                        //         }).values())[selectedActionIndex].snapshotImageBase64
                        //     }, data[fieldName])
                        // }, data.allActionData.get(category))


                        return getActionData(api, data, fieldName, category)[1].snapshotImageBase64
                    },
                        api.action.getActionState<initState>(meta3dState, initActionName)
                    ),
                    null
                )
            )
        }
    }
}

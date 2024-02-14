import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-collapse-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { service } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getSelectedGameObject } from "meta3d-select-inspector-node-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ScriptCollapseInput",
        func: (meta3dState) => {

            return Promise.resolve(api.nullable.getWithDefault(
                api.nullable.map(
                    gameObject => {
                        let engineSceneService = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

                        return engineSceneService.gameObject.hasScript(meta3dState, gameObject)
                    },
                    getSelectedGameObject(meta3dState, api)
                ),
                false
            ))
        }
    }
}

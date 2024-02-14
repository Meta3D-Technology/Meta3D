import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-list-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getSelectedGameObject } from "meta3d-select-inspector-node-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ScritpComponentAssetNamesInput",
        func: (meta3dState) => {
            return Promise.resolve(api.nullable.getWithDefault(
                api.nullable.bind(selectedGameObject => {
                    let { gameObject, script } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

                    if (gameObject.hasScript(meta3dState, selectedGameObject)) {
                        let scriptComponent = gameObject.getScript(meta3dState, selectedGameObject)

                        return api.nullable.map(allAssetData => {
                            return allAssetData.map(({ name }) => {
                                return name
                            })
                        },
                            script.getAllAssetData(meta3dState, scriptComponent)
                        )
                    }

                    return api.nullable.getEmpty()
                },
                    getSelectedGameObject(meta3dState, api),
                ),
                []
            ))
        }
    }
}

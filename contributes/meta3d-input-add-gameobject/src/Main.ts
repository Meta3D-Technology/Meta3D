import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-popup-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "AddGameObjectInput",
        func: (meta3dState) => {
            return Promise.resolve(
                [
                    "Empty GameObject",
                    "Cube"
                ]
            )
        }
    }
}

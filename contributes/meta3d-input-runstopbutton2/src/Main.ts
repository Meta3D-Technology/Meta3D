import { getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-runstopbutton-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "RunStopButtonInput2",
        func: (meta3dState) => {
            return Promise.resolve(false)
        }
    }
}

import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-codeedit-protocol"
// import { actionName, state } from "meta3d-action-set-appname-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ScriptAssetCodeEditInput",
        func: (meta3dState) => {
            return Promise.resolve(
                `{
        onInit:() =>{
            console.log("onInit")
        },
        onUpdate:() =>{
            console.log("onUpdate")
        },
    }`
            )
        }
    }
}

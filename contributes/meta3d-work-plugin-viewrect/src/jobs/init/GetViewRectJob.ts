import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { getDataState, getState, setStateToData } from "../Utils";
import { states } from "meta3d-work-plugin-viewrect-protocol/src/StateType"
// import { workPluginName as createglWorkPluginName } from "meta3d-work-plugin-webgl1-creategl-protocol/src/StateType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, canvas } = getState(states)

    return mostService.callFunc(() => {
        console.log("get view rect job");

        // let canvas = states[createglWorkPluginName].canvas

        return setStatesFunc<states>(
            meta3dState,
            setStateToData(states,
                {
                    ...getDataState(states),
                    viewRect: {
                        x: 0,
                        y: 0,
                        width: canvas.width,
                        height: canvas.height
                    }
                }
            )
        )
    })
}
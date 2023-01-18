import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { getDataState, getState, setStateToData } from "../Utils";
import { states } from "meta3d-work-plugin-editor-viewrect-protocol/src/StateType"
import { getViewRect } from "meta3d-view-utils/src/ViewRect"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, uiService, meta3dUIExtensionProtocolName } = getState(states)

    return mostService.callFunc(() => {
        console.log("get editor view rect job");

        return setStatesFunc<states>(
            meta3dState,
            setStateToData(states,
                {
                    ...getDataState(states),
                    viewRect:
                        getExn(getViewRect(uiService, api.getExtensionState(meta3dState, meta3dUIExtensionProtocolName)))
                }
            )
        )
    })
}
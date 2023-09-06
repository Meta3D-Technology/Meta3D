import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, getTextureID, setState } from "../Utils";
import { states } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";
import { isStrictNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { getViewRect } from "meta3d-view-utils/src/SceneViewRect";
import { setFBOTexture } from "meta3d-pipeline-editor-webgl1-view1-utils/src/PrepareFBOUtils"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        webgl1Service,
        uiService,
        fbo,
    } = getState(states)

    return mostService.callFunc(() => {
        console.log("prepare fbo job");

        if (!isStrictNullable(fbo)) {
            return meta3dState
        }

        let data = setFBOTexture(
            meta3dState, api,
            [uiService, webgl1Service,
                getViewRect,
            ],
            getTextureID()
        )
        meta3dState = data[0]
        let fbo_ = data[1]

        return setStatesFunc<states>(
            meta3dState,
            setState(states,
                {
                    ...getState(states),
                    fbo: fbo_
                }
            )
        )
    })
}
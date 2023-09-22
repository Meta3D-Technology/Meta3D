import { getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, textureID, state as uiControlState, inputData, outputData } from "meta3d-ui-control-game-view-protocol"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import { func } from "meta3d-ui-control-view-utils/src/Main"

export let getContribute: getContributeMeta3D<uiControlContribute<inputData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            {
                rect,
                label,
            }
        ) => {
            return func(
                meta3dState, api, {
                rect,
                label,
            },
                [uiControlName, textureID]
            )
        }
    }
}

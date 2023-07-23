import { getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, inputData, outputData } from "your-protocol"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "./DependentMapType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"

export let getContribute: getContributeMeta3D< uiControlContribute<inputData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            rect,
            TODO
        ) => {
            TODO

            return new Promise((resolve, reject) => {
                resolve([meta3dState, TODO])
            })
        }
    }
}

import { getContribute as getContributeMeta3D } from "meta3d-type"
import { elementState, elementName } from "meta3d-element-button-protocol"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-element-button-protocol/src/DependentMapType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { eventData, eventName } from "meta3d-action-click-button-protocol"
import { inputData, outputData, customControlName } from "meta3d-custom-control-button-protocol"
import { elementContribute } from "meta3d-ui-protocol/src/contribute/ElementContributeType"

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, elementContribute<elementState>> = (api, [dependentExtensionNameMap, _]) => {
    let { meta3dEventExtensionName, meta3dUIExtensionName } = dependentExtensionNameMap

    return {
        elementName: elementName,
        execOrder: 0,
        elementState: {
            x: 0,
            y: 140,
            width: 20,
            height: 10,
            text: "button",
        },
        elementFunc: (meta3dState, elementState) => {
            let { getCustomControl } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

            let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionName)

            /*! TODO move elementName to VisualElement/Group, judge is state change there!
        	
            // if (!isStateChange(uiState, elementName)) {
            // 	return _handleStateNotChange(meta3dState)
            // }
            */


            // TODO use Nullable.getExn
            let { x, y, width, height, text }: elementState = elementState

            let drawButton = getCustomControl<inputData, outputData>(uiState, customControlName)


            let data = drawButton(meta3dState,
                {
                    rect: {
                        x,
                        y,
                        width,
                        height,
                    },
                    // text
                })
            meta3dState = data[0]
            let isClick = data[1]

            if (isClick) {
                let { trigger } = api.getExtensionService<eventService>(meta3dState, meta3dEventExtensionName)

                return trigger<eventData>(meta3dState, meta3dEventExtensionName, eventName, null)
            }

            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }
    }
}

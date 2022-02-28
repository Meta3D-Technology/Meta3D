import { getElementContribute as getElementContributeMeta3d } from "meta3d-ui-protocol/src/contribute_points/IElement"
import { dependentExtensionNameMap, registerExtensionElementState, elementName } from "meta3d-element-register-extension-protocol"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { serializeLib, getExtensionServiceFuncFromLib } from "meta3d-element-utils"
import { eventData, eventName } from "meta3d-event-register-extension-submit-protocol"
import { inputData, outputData, customControlName } from "meta3d-custom-control-button-protocol"

export let getElementContribute: getElementContributeMeta3d<dependentExtensionNameMap, registerExtensionElementState> = (api, { meta3dUIExtensionName, meta3dEventExtensionName }) => {
    return {
        elementName: elementName,
        elementState: {
            x: 0,
            y: 140,
            width: 20,
            height: 10,
            text: "register extension",
        },
        elementFunc: (meta3dState, elementName) => {
            let { getCustomControl, getElementState } = api.getServiceExn<uiService>(meta3dState, meta3dUIExtensionName)

            let uiState = api.getExtensionStateExn<uiState>(meta3dState, meta3dUIExtensionName)

            /*! TODO move elementName to VisualElement/Group, judge is state change there!
        	
            // if (!isStateChange(uiState, elementName)) {
            // 	return _handleStateNotChange(meta3dState)
            // }
            */


            // TODO use Nullable.getExn
            let { x, y, width, height, text } = getElementState<registerExtensionElementState>(uiState, elementName) as registerExtensionElementState

            let drawButton = getCustomControl<inputData, outputData>(uiState, customControlName)


            let data = drawButton(meta3dState,
                [api, meta3dUIExtensionName],
                {
                    rect: {
                        x,
                        y,
                        width,
                        height,
                    },
                    text
                })
            meta3dState = data[0]
            let isClick = data[1]

            if (isClick) {
                let { trigger } = api.getServiceExn<eventService>(meta3dState, meta3dEventExtensionName)

                let fileStr = `!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("ExtensionTest1",[],t):"object"==typeof exports?exports.ExtensionTest1=t():e.ExtensionTest1=t()}(self,(function(){return(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{getExtensionService:()=>o,createExtensionState:()=>n});let o=(e,t)=>({func1:()=>{console.log("func1")}}),n=()=>null;return t})()}));`

                let lib = serializeLib(
                    fileStr,
                    "ExtensionTest1",
                )

                return trigger<eventData>(meta3dState, meta3dEventExtensionName, eventName, {
                    // TODO should pass by user according to drawCopyTextarea

                    extensionName: "extension_test1",
                    getExtensionServiceFunc: getExtensionServiceFuncFromLib(lib),
                    dependentExtensionNameMap: null,
                    createExtensionStateFunc: getExtensionServiceFuncFromLib(lib)
                })
            }

            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }
    }
}

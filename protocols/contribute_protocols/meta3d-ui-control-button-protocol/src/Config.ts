import {
    generateUIControlCommonDataStr as generateUIControlCommonDataStrMeta3D,
    getUIControlSpecificDataFields as getUIControlSpecificDataFieldsMeta3D,
    hasChildren as hasChildrenMeta3D,
    getUIControlSupportedEventNames as getUIControlSupportedEventNamesMeta3D, generateHandleUIControlEventStr as generateHandleUIControlEventStrMeta3D
} from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { isNullable } from "meta3d-commonlib-ts/src/NullableUtils"

export let generateUIControlCommonDataStr: generateUIControlCommonDataStrMeta3D = (rect) => {
    return "\n  {\n    rect: " + rect + "}\n  "
}

export let getUIControlSpecificDataFields: getUIControlSpecificDataFieldsMeta3D = () => [
    {
        name: "label",
        type_: "string",
        value: "Button"
    }
]

export let hasChildren: hasChildrenMeta3D = () => false

// export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => ["button_click"]
export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => [["click", "meta3d-action-button-click-protocol"]]

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([clickActionName]) => {
    if (!isNullable(clickActionName)) {
        return "\n            if (data[1]) {\n                let { trigger } = api.getExtensionService(meta3dState, \"meta3d-event-protocol\")\n\n                return trigger(meta3dState, \"meta3d-event-protocol\", \"" + clickActionName + "\", null)\n            }\n";
    }

    return ""
}
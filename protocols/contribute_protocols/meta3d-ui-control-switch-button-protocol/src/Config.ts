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
        value: "SwitchButton"
    },
    {
        name: "image1",
        type_: "imageBase64",
        value: null
    },
    {
        name: "image2",
        type_: "imageBase64",
        value: null
    },
]

export let hasChildren: hasChildrenMeta3D = () => false

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => ["event1", "event2"]

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([event1ActionName, event2ActionName]) => {
    if (!isNullable(event1ActionName) && !isNullable(event2ActionName)) {
        return `
                let [isTriggerEvent1, isTriggerEvent2] = data[1]

                if (isTriggerEvent1) {
                    let { trigger } = api.getExtensionService(meta3dState, "meta3d-event-protocol")

                    return trigger(meta3dState, "meta3d-event-protocol", "${event1ActionName}", null)
                }
                if (isTriggerEvent2) {
                    let { trigger } = api.getExtensionService(meta3dState, "meta3d-event-protocol")

                    return trigger(meta3dState, "meta3d-event-protocol", "${event2ActionName}", null)
                }
                `
    }

    return ""
}
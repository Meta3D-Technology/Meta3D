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

let _generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000.0).toString()
}

export let getUIControlSpecificDataFields: getUIControlSpecificDataFieldsMeta3D = () => [
    {
        name: "label",
        type_: "string",
        value: "InputFloat3##" + _generateUniqueId()
    },
    {
        name: "step",
        type_: "number",
        value: 0.01
    },
    {
        name: "stepFast",
        type_: "number",
        value: 1.0
    }
]

export let hasChildren: hasChildrenMeta3D = () => false

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => ["input_change"]

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([changeActionName]) => {
    if (!isNullable(changeActionName)) {
        return `
                if (!api.nullable.isNullable(data[1])) {
                    let { trigger } = api.getExtensionService(meta3dState, "meta3d-event-protocol")

                    return trigger(meta3dState, "meta3d-event-protocol", "${changeActionName}", api.nullable.getExn(data[1]))
                }
                `
    }

    return ""
}
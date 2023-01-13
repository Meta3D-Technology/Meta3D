import {
    generateUIControlCommonDataStr as generateUIControlCommonDataStrMeta3D,
    getUIControlSpecificDataFields as getUIControlSpecificDataFieldsMeta3D,
    hasChildren as hasChildrenMeta3D,
    getUIControlSupportedEventNames as getUIControlSupportedEventNamesMeta3D, generateHandleUIControlEventStr as generateHandleUIControlEventStrMeta3D
} from "meta3d-type/src/contribute/UIControlProtocolConfigType"

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
        value: "View##" + _generateUniqueId()
    },
    {
        name: "textureID",
        type_: "string",
        value: ""
    }
]

export let hasChildren: hasChildrenMeta3D = () => false

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => []

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([]) => {
    return ""
}
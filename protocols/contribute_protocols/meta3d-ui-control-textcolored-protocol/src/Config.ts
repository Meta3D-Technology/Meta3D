import {

    getUIControlSpecificDataFields as getUIControlSpecificDataFieldsMeta3D,
    hasChildren as hasChildrenMeta3D,
    getUIControlSupportedEventNames as getUIControlSupportedEventNamesMeta3D, generateHandleUIControlEventStr as generateHandleUIControlEventStrMeta3D
} from "meta3d-type/src/contribute/UIControlProtocolConfigType"

export let getUIControlSpecificDataFields: getUIControlSpecificDataFieldsMeta3D = () => [
    {
        name: "color",
        type_: "rgba",
        value: [1.0, 1.0, 1.0, 1.0]
    },
]


export let hasChildren: hasChildrenMeta3D = () => false

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => []

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([]) => {
    return ""
}
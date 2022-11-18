import {
    getSkinProtocolData as getSkinProtocolDataMeta3D, generateUIControlCommonDataStr as generateUIControlCommonDataStrMeta3D,
    getUIControlSpecificDataFields as getUIControlSpecificDataFieldsMeta3D,
    getUIControlSupportedEventNames as getUIControlSupportedEventNamesMeta3D, generateHandleUIControlEventStr as generateHandleUIControlEventStrMeta3D
} from "meta3d-type/src/contribute/UIControlProtocolConfigType"
// import { isNullable } from "meta3d-commonlib-ts/src/NullableUtils"

// TODO fix
export let getSkinProtocolData: getSkinProtocolDataMeta3D = () => {
    return {
        protocolName: "meta3d-skin-button-protocol",
        protocolVersion: "^0.6.0",
    }
}

export let generateUIControlCommonDataStr: generateUIControlCommonDataStrMeta3D = (rect, skin) => {
    return "\n  {\n    rect: " + rect + ",\n skin: " + skin + "  }\n  "
}

export let getUIControlSpecificDataFields: getUIControlSpecificDataFieldsMeta3D = () => [
    {
        name: "label",
        type_: "string",
        value: "Window"
    }
]

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => []

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([]) => {
    return ""
}
import { getSkinProtocolData as getSkinProtocolDataMeta3D, generateUIControlCommonDataStr as generateUIControlDataStrMeta3D, getUIControlSupportedEventNames as getUIControlSupportedEventNamesMeta3D, generateHandleUIControlEventStr as generateHandleUIControlEventStrMeta3D } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { isNullable } from "meta3d-commonlib-ts/src/NullableUtils"

export let getSkinProtocolData: getSkinProtocolDataMeta3D = () => {
    return {
        protocolName: "meta3d-skin-button-protocol",
        protocolVersion: "^0.6.0",
    }
}

export let generateUIControlCommonDataStr: generateUIControlDataStrMeta3D = (rect, skin) => {
    return "\n  {\n    rect: " + rect + ",\n skin: " + skin + "  }\n  "
}

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => ["click"]

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([clickActionName]) => {
    if (!isNullable(clickActionName)) {
        return "\n            if (data[1]) {\n                let { trigger } = api.getExtensionService(meta3dState, meta3dEventExtensionName)\n\n                return trigger(meta3dState, meta3dEventExtensionName, \"" + clickActionName + "\", null)\n            }\n";
    }

    return ""
}
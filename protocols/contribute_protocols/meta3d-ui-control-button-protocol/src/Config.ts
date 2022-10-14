import { uiControlName } from "./Index"
import { generateUIControlDataStr as generateUIControlDataStrMeta3D, generateUIControlName as generateUIControlNameMeta3D, getUIControlSupportedEventNames as getUIControlSupportedEventNamesMeta3D, generateHandleUIControlEventStr as generateHandleUIControlEventStrMeta3D } from "meta3d-type"
import { isNullable } from "meta3d-commonlib-ts/src/NullableUtils"

export let generateUIControlDataStr: generateUIControlDataStrMeta3D = (rect) => {
    return "\n  {\n    rect: " + rect + "\n  }\n  "
}

export let generateUIControlName: generateUIControlNameMeta3D = () => uiControlName

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => ["click"]

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([clickActionName]) => {
    if (!isNullable(clickActionName)) {
        return "\n            if (data[1]) {\n                let { trigger } = api.getExtensionService(meta3dState, meta3dEventExtensionName)\n\n                return trigger(meta3dState, meta3dEventExtensionName, \"" + clickActionName + "\", null)\n            }\n";
    }

    return ""
}
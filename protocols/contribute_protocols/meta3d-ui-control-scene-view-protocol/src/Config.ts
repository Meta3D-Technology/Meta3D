import {
    generateUIControlCommonDataStr as generateUIControlCommonDataStrMeta3D,
    // buildUIControlState as buildUIControlStateMeta3D,
    getUIControlSpecificDataFields as getUIControlSpecificDataFieldsMeta3D,
    hasChildren as hasChildrenMeta3D,
    getUIControlSupportedEventNames as getUIControlSupportedEventNamesMeta3D, generateHandleUIControlEventStr as generateHandleUIControlEventStrMeta3D
} from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { isNullable } from "meta3d-commonlib-ts/src/NullableUtils"

export let generateUIControlCommonDataStr: generateUIControlCommonDataStrMeta3D = (rect) => {
    return "\n  {\n    rect: " + rect + "}\n  "
}

// let _generateUniqueId = () => {
//     return Math.floor(Math.random() * 1000000.0).toString()
// }

export let getUIControlSpecificDataFields: getUIControlSpecificDataFieldsMeta3D = () => [
    {
        name: "label",
        type_: "string",
        value: "Scene View"
    }
    // {
    //     name: "textureID",
    //     type_: "string",
    //     value: ""
    // }
]

// export let buildUIControlState: buildUIControlStateMeta3D = (rect, specific) => {
//   return {
//     rect: rect
//   }
// }

export let hasChildren: hasChildrenMeta3D = () => false

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => ["sceneview_drop_glb"]

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([dropGlbActionName]) => {
    if (!isNullable(dropGlbActionName)) {
        return `
                if (data[1] !== null) {
                    let { trigger } = api.getExtensionService(meta3dState, "meta3d-event-protocol")

                     return trigger(meta3dState, "meta3d-event-protocol", "${dropGlbActionName}", data[1])
                }
                `
    }

    return ""
}
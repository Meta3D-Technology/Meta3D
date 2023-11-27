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
        value: "Tree##" + _generateUniqueId()
    },
    {
        name: "rootNodeLabel",
        type_: "string",
        value: "Root"
    },
    {
        name: "nodeType1Image",
        type_: "imageBase64",
        value: null
    },
    {
        name: "nodeType2Image",
        type_: "imageBase64",
        value: null
    },
    {
        name: "nodeType3Image",
        type_: "imageBase64",
        value: null
    }
]

export let hasChildren: hasChildrenMeta3D = () => false

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => ["select_tree_node", "drag_tree_node"]

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([selectTreeNodeActionName, dragTreeNodeActionName]) => {
    if (!isNullable(selectTreeNodeActionName) && !isNullable(dragTreeNodeActionName)) {
        return `
                let [selectedTreeNodeId, dragData] = data[1]

                if (!api.nullable.isNullable(selectedTreeNodeId)) {
                    let { trigger } = api.getExtensionService(meta3dState, "meta3d-event-protocol")

                    return trigger(meta3dState, "meta3d-event-protocol", "${selectTreeNodeActionName}", api.nullable.getExn(selectedTreeNodeId))
                }

                if (!api.nullable.isNullable(dragData)) {
                    let { trigger } = api.getExtensionService(meta3dState, "meta3d-event-protocol")

                    return trigger(meta3dState, "meta3d-event-protocol", "${dragTreeNodeActionName}", api.nullable.getExn(dragData))
                }
                `
    }

    return ""
}
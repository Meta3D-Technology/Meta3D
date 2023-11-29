import {
    
    getUIControlSpecificDataFields as getUIControlSpecificDataFieldsMeta3D,
    hasChildren as hasChildrenMeta3D,
    getUIControlSupportedEventNames as getUIControlSupportedEventNamesMeta3D, generateHandleUIControlEventStr as generateHandleUIControlEventStrMeta3D
} from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { isNullable } from "meta3d-commonlib-ts/src/NullableUtils"



export let getUIControlSpecificDataFields: getUIControlSpecificDataFieldsMeta3D = () => [
    {
        name: "label",
        type_: "string",
        value: "Asset"
    },
    {
        name: "image",
        type_: "imageBase64",
        value: null
    }
]

export let hasChildren: hasChildrenMeta3D = () => false

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => ["select_asset"]

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([selectAssetActionName]) => {
    if (!isNullable(selectAssetActionName)) {
        return `
                if (!api.nullable.isNullable(data[1])) {
                    let { trigger } = api.getExtensionService(meta3dState, "meta3d-event-protocol")

                    return trigger(meta3dState, "meta3d-event-protocol", "${selectAssetActionName}", api.nullable.getExn(data[1]))
                }
                `
    }

    return ""
}
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
        value: "Asset"
    }
]

export let hasChildren: hasChildrenMeta3D = () => false

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => ["asset_remove", "asset_load_glb", "asset_select"]

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([removeAssetActionName, loadGlbActionName, selectAssetActionName]) => {
    if (!isNullable(removeAssetActionName) && !isNullable(loadGlbActionName) && !isNullable(selectAssetActionName)) {
        return `
                let [isRemoveAsset, isLoadGlb, selectedGlbId] = data[1]

                let { trigger } = api.getExtensionService(meta3dState, "meta3d-event-protocol")

                if (isRemoveAsset) {
                     return trigger(meta3dState, "meta3d-event-protocol", "${removeAssetActionName}", null)
                }
                if (isLoadGlb) {
                    return trigger(meta3dState, "meta3d-event-protocol", "${loadGlbActionName}", null)
                }
                if (selectedGlbId != null) {
                    return trigger(meta3dState, "meta3d-event-protocol", "${selectAssetActionName}", selectedGlbId)
                }
                `
    }

    return ""
}
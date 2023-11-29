import {
    
    getUIControlSpecificDataFields as getUIControlSpecificDataFieldsMeta3D,
    hasChildren as hasChildrenMeta3D,
    getUIControlSupportedEventNames as getUIControlSupportedEventNamesMeta3D, generateHandleUIControlEventStr as generateHandleUIControlEventStrMeta3D
} from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { isNullable } from "meta3d-commonlib-ts/src/NullableUtils"



let _generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000.0).toString()
}

export let getUIControlSpecificDataFields: getUIControlSpecificDataFieldsMeta3D = () => [
    {
        name: "label",
        type_: "string",
        value: "SwitchButton##" + _generateUniqueId()
    },
    {
        name: "image1",
        type_: "imageBase64",
        value: null
    },
    {
        name: "image2",
        type_: "imageBase64",
        value: null
    },
]

export let hasChildren: hasChildrenMeta3D = () => false

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => ["click1", "click2"]

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([click1ActionName, click2ActionName]) => {
    if (!isNullable(click1ActionName) && !isNullable(click2ActionName)) {
        return `
                let [isTriggerClick1, isTriggerClick2] = data[1]

                if (isTriggerClick1) {
                    let { trigger } = api.getExtensionService(meta3dState, "meta3d-event-protocol")

                    return trigger(meta3dState, "meta3d-event-protocol", "${click1ActionName}", null)
                }
                if (isTriggerClick2) {
                    let { trigger } = api.getExtensionService(meta3dState, "meta3d-event-protocol")

                    return trigger(meta3dState, "meta3d-event-protocol", "${click2ActionName}", null)
                }
                `
    }

    return ""
}
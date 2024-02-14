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
        value: "列表##" + _generateUniqueId()
    },
    {
        name: "isRemoveable",
        type_: "bool",
        value: false
    },
    {
        name: "itemWidth",
        type_: "number",
        value: 100
    },
    {
        name: "itemHeight",
        type_: "number",
        value: 30
    },
    {
        name: "removeImage",
        type_: "imageBase64",
        value: null
    },
]

export let hasChildren: hasChildrenMeta3D = () => false

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => ["list_select", "list_remove"]

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([selectActionName, removeActionName]) => {
    if (isNullable(selectActionName) && isNullable(removeActionName)) {
        return ""
    }

    let result = `
let [selectedData, isRemove] = data[1]
    `
    if (!isNullable(selectActionName)) {
        result = result + `
                if (!api.nullable.isNullable(selectedData)) {
                    let { trigger } = api.getExtensionService(meta3dState, "meta3d-event-protocol")

                    return trigger(meta3dState, "meta3d-event-protocol", "${selectActionName}", api.nullable.getExn(selectedData))
                }
                `
    }

    if (!isNullable(removeActionName)) {
        result = result + `
                if (!api.nullable.isNullable(isRemove) && api.nullable.getExn(isRemove) === true) {
                    let { trigger } = api.getExtensionService(meta3dState, "meta3d-event-protocol")

                    return trigger(meta3dState, "meta3d-event-protocol", "${removeActionName}", api.nullable.getExn(selectedData))
                }
                `
    }

    return result
}
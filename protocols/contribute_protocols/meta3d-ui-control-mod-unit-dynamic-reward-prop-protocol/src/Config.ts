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
        value: "动态奖励道具##" + _generateUniqueId()
    },
]

export let hasChildren: hasChildrenMeta3D = () => false

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => ["value_change"]

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([valueChangeActionName], [valueChangeActionParams]) => {
    if (isNullable(valueChangeActionName)) {
        return ""
    }

    let result = `
let [newData, isValueUpdate] = data[1]
    `
    if (!isNullable(valueChangeActionName)) {
        result = result + `
                if (isValueUpdate) {
                    let { trigger } = api.getExtensionService(meta3dState, "meta3d-event-protocol")

                    return trigger(meta3dState, "meta3d-event-protocol", "${valueChangeActionName}", newData, JSON.parse('${JSON.stringify(valueChangeActionParams)}'))
                }
                `
    }

    return result

}
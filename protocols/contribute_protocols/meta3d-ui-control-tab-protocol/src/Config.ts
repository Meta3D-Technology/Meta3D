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
        value: "选项卡##" + _generateUniqueId()
    },
    {
        name: "items",
        type_: "tabItems",
        value: [
            [
                "tab1",
                "key1"
            ],
            [
                "tab2",
                "key2"
            ],
        ]
    },
]

export let hasChildren: hasChildrenMeta3D = () => false

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => ["tab_select"]

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([selectActionName], [selectActionParams]) => {
    if (!isNullable(selectActionName)) {
        return `
                let tabKey = data[1]

                if (!api.nullable.isNullable(tabKey)) {
                    let { trigger } = api.getExtensionService(meta3dState, "meta3d-event-protocol")

                    return trigger(meta3dState, "meta3d-event-protocol", "${selectActionName}", api.nullable.getExn(tabKey), JSON.parse('${JSON.stringify(selectActionParams)}'))
                }
                `
    }

    return ""
}
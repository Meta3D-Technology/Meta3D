import {
    
    getUIControlSpecificDataFields as getUIControlSpecificDataFieldsMeta3D,
    hasChildren as hasChildrenMeta3D,
    getUIControlSupportedEventNames as getUIControlSupportedEventNamesMeta3D, generateHandleUIControlEventStr as generateHandleUIControlEventStrMeta3D
} from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { cond } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"



let _generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000.0).toString()
}

export let getUIControlSpecificDataFields: getUIControlSpecificDataFieldsMeta3D = () => [
    {
        name: "label",
        type_: "string",
        value: "Collapsing##" + _generateUniqueId()
    },
    {
        name: "isOpen",
        type_: "bool",
        value: false
    },
    {
        name: "cond",
        type_: "select",
        value: {
            selected: cond.None,
            data: [
                {
                    key: "None",
                    value: cond.None
                },
                {
                    key: "Always",
                    value: cond.Always
                }
            ]
        }
    },
]

export let hasChildren: hasChildrenMeta3D = () => true

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => []

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([]) => {
    return ""
}
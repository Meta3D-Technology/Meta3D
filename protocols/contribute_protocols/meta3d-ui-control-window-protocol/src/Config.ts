import {
    
    getUIControlSpecificDataFields as getUIControlSpecificDataFieldsMeta3D,
    hasChildren as hasChildrenMeta3D,
    getUIControlSupportedEventNames as getUIControlSupportedEventNamesMeta3D, generateHandleUIControlEventStr as generateHandleUIControlEventStrMeta3D
} from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { windowFlags } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"



let _generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000.0).toString()
}

export let getUIControlSpecificDataFields: getUIControlSpecificDataFieldsMeta3D = () => [
    {
        name: "label",
        type_: "string",
        value: "窗口##" + _generateUniqueId()
    },
    {
        name: "flag",
        type_: "select",
        value: {
            selected: windowFlags.NoTitleBar,
            data: [
                {
                    key: "None",
                    value: windowFlags.None
                },
                {
                    key: "NoTitleBar",
                    value: windowFlags.NoTitleBar
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
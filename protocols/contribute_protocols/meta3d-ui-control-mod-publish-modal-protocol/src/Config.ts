import {

    getUIControlSpecificDataFields as getUIControlSpecificDataFieldsMeta3D,
    hasChildren as hasChildrenMeta3D,
    getUIControlSupportedEventNames as getUIControlSupportedEventNamesMeta3D, generateHandleUIControlEventStr as generateHandleUIControlEventStrMeta3D
} from "meta3d-type/src/contribute/UIControlProtocolConfigType"



let _generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000.0).toString()
}

export let getUIControlSpecificDataFields: getUIControlSpecificDataFieldsMeta3D = () => [
    {
        name: "label",
        type_: "string",
        value: "发布模态框##" + _generateUniqueId()
    },
    {
        name: "initActionName",
        type_: "string",
        value: ""
    },
    {
        name: "publishActionName",
        type_: "string",
        value: ""
    },
    {
        name: "isShowFieldName",
        type_: "string",
        value: ""
    },
    {
        name: "displayNameCNFieldName",
        type_: "string",
        value: ""
    },
    {
        name: "displayNameENFieldName",
        type_: "string",
        value: ""
    },
    {
        name: "modIconBase64FieldName",
        type_: "string",
        value: ""
    },
    {
        name: "modIconTextureFieldName",
        type_: "string",
        value: ""
    },
    {
        name: "isPublicFieldName",
        type_: "string",
        value: ""
    },
    {
        name: "descriptionFieldName",
        type_: "string",
        value: ""
    },
]

export let hasChildren: hasChildrenMeta3D = () => false

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => []

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([]) => {
    return ""
}
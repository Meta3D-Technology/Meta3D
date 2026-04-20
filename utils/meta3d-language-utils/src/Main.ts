import { state as meta3dState, api } from "meta3d-type"
import { actionName as languageActionName, state as languageState } from "meta3d-action-mod-language-protocol"
import { language, languageKey, languageVariableKey, languageTextData, languageTextDataByVariable } from "./Type"

let _getLanguageDataByData = (api: api, data: any, key: any, language: any) => {
    return api.nullable.getWithDefault(
        data[language][key],
        key
    )
}

export let getLanguageTextData = (api: api, meta3dState: meta3dState, textData: languageTextData, key: any) => {
    let language_ = api.nullable.getWithDefault(
        api.nullable.map(
            (languageState) => languageState.language,
            api.action.getActionState<languageState>(meta3dState, languageActionName),
        ),
        language.Chinese
    )

    return _getLanguageDataByData(api, textData, key, language_)

}

export let getLanguageTextVariableData = (api: api, meta3dState: meta3dState, textDataByVariable: languageTextDataByVariable, key: any) => {
    let language_ = api.nullable.getWithDefault(
        api.nullable.map(
            (languageState) => languageState.language,
            api.action.getActionState<languageState>(meta3dState, languageActionName),
        ),
        language.Chinese
    )

    return _getLanguageDataByData(api, textDataByVariable, key, language_)
}

export let isChinese = (api: api, meta3dState: meta3dState) => {
    return api.nullable.getWithDefault(
        api.nullable.map(
            (languageState) => languageState.language == language.Chinese,
            api.action.getActionState<languageState>(meta3dState, languageActionName),
        ),
        true
    )
}
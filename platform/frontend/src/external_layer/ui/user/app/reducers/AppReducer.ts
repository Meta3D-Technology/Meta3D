import { AppStore } from "../store_type/AppStoreType";
import { AppAction, APP_CLEAR_SELECT, APP_NOT_SELECT_CONTRIBUTE, APP_NOT_SELECT_EXTENSION, APP_SELECT_CONTRIBUTE, APP_SELECT_EXTENSION, APP_SET_CONTRIBUTE_NEWNAME, APP_SET_EXTENSION_NEWNAME, APP_SET_USERNAME, APP_START_EXTENSION, APP_UNSTART_EXTENSION } from "../actions/AppActionType";

export let AppReducer = (state: AppStore = {
    username: null,
    selectedExtensions: [],
    selectedContributes: []
}, action: AppAction): AppStore => {
    switch (action.type) {
        case APP_SET_USERNAME:
            return {
                ...state,
                username: action.username
            }
        case APP_SELECT_EXTENSION:
            return {
                ...state,
                selectedExtensions: state.selectedExtensions.concat([{
                    ...action.extension,
                    isStart: false,
                    newName: action.extension.data.extensionPackageData.name
                }])
            }
        case APP_NOT_SELECT_EXTENSION:
            return {
                ...state,
                selectedExtensions: state.selectedExtensions.filter(({ id }) => {
                    return id !== action.id
                })
            }
        case APP_SELECT_CONTRIBUTE:
            return {
                ...state,
                selectedContributes: state.selectedContributes.concat([{
                    ...action.contribute,
                    newName: action.contribute.data.contributePackageData.name
                }])
            }
        case APP_NOT_SELECT_CONTRIBUTE:
            return {
                ...state,
                selectedContributes: state.selectedContributes.filter(({ id }) => {
                    return id !== action.id
                })
            }
        case APP_START_EXTENSION:
            return {
                ...state,
                selectedExtensions: state.selectedExtensions.map((data) => {
                    if (data.id === action.id) {
                        return {
                            ...data,
                            isStart: true
                        }
                    }

                    return data
                })
            }
        case APP_UNSTART_EXTENSION:
            return {
                ...state,
                selectedExtensions: state.selectedExtensions.map((data) => {
                    if (data.id === action.id) {
                        return {
                            ...data,
                            isStart: false
                        }
                    }

                    return data
                })
            }
        case APP_SET_EXTENSION_NEWNAME:
            return {
                ...state,
                selectedExtensions: state.selectedExtensions.map((data) => {
                    if (data.id === action.id) {
                        return {
                            ...data,
                            // TODO handle empty str as null
                            newName: action.newName
                        }
                    }

                    return data
                })
            }
        case APP_SET_CONTRIBUTE_NEWNAME:
            return {
                ...state,
                selectedContributes: state.selectedContributes.map((data) => {
                    if (data.id === action.id) {
                        return {
                            ...data,
                            // TODO handle empty str as null
                            newName: action.newName
                        }
                    }

                    return data
                })
            }
        case APP_CLEAR_SELECT:
            return {
                ...state,
                selectedExtensions: [],
                selectedContributes: []
            }
        default:
            return state
    }
};
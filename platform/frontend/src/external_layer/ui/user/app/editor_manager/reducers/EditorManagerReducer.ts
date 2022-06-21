import { EditorManagerAction, EDITORMANAGER_SWITCH_TAB } from "../actions/EditorManagerActionType";
import { EditorManagerStore } from "../store_type/EditorManagerStoreType";

export let EditorManagerReducer = (state: EditorManagerStore = {
    tab: "publish"
}, action: EditorManagerAction): EditorManagerStore => {
    switch (action.type) {
        case EDITORMANAGER_SWITCH_TAB:
            return {
                ...state,
                tab: action.tab
            }
        default:
            return state
    }
};
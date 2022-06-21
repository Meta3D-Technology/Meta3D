import { tab } from "../store_type/EditorManagerStoreType"
import { EDITORMANAGER_SWITCH_TAB, SwitchTab } from "./EditorManagerActionType"

export let switchTab = (tab: tab): SwitchTab => {
    return {
        type: EDITORMANAGER_SWITCH_TAB,
        tab
    }
}
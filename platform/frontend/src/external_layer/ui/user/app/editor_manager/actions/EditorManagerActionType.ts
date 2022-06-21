import { tab } from "../store_type/EditorManagerStoreType"

export const EDITORMANAGER_SWITCH_TAB = "EDITORMANAGER_SWITCH_TAB"

export interface SwitchTab {
    type: typeof EDITORMANAGER_SWITCH_TAB,
    tab: tab
}

export type EditorManagerAction = SwitchTab
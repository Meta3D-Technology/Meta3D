import { text, changeTextAction, BUTTON2_CHNAGE_TEXT } from "meta3d-element-button2-protocol"

export function changeText(text: text): changeTextAction {
    return {
        type: BUTTON2_CHNAGE_TEXT,
        text
    }
}


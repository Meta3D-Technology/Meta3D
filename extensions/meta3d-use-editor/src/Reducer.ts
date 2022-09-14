import { reducerFunc } from "meta3d-ui-protocol/src/contribute/ElementContributeType"
import { elementState, changeTextAction, BUTTON2_CHNAGE_TEXT } from "meta3d-element-button2-protocol"

export let button2Reducer: reducerFunc<elementState, changeTextAction> = (elementState, action) => {
    switch (action.type) {
        case BUTTON2_CHNAGE_TEXT:
            return {
                ...elementState,
                text: action.text
            }
        default:
            return elementState
    }
}
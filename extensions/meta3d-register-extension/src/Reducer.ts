import { reducerFunc } from "meta3d-ui-protocol/src/contribute_points/IElement"
import { showExtensionsElementState, SHOWEXTENSION_REGISTER_EXTENSION, showRegisterAction } from "meta3d-element-show-extensions-protocol"

export let showExtensionReducer: reducerFunc<showExtensionsElementState, showRegisterAction> = (elementState, action) => {
    switch (action.type) {
        case SHOWEXTENSION_REGISTER_EXTENSION:
            return {
                ...elementState,
                extensionDataArr: elementState.extensionDataArr.concat([{ extensionName: action.extensionName }])
            }
        default:
            return elementState
    }
}
import { reducerFunc } from "meta3d-ui-protocol/src/contribute_points/UIType"
import { SHOWEXTENSION_REGISTER_EXTENSION, showRegisterAction } from "meta3d-register-extension-protocol/src/contribute_points/ActionType"
import { showExtensionExecState } from "../../../extension_protocols/meta3d-register-extension-protocol/src/state/StateType"

export let showExtensionReducer: reducerFunc<showExtensionExecState, showRegisterAction> = (execState, action) => {
    switch (action.type) {
        case SHOWEXTENSION_REGISTER_EXTENSION:
            return {
                ...execState,
                extensionDataArr: execState.extensionDataArr.concat([{ extensionName: action.extensionName }])
            }
        default:
            return execState
    }
}
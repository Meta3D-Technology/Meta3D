import { state, states, workPluginName } from "meta3d-work-plugin-editor-webgl1-scene-view-protocol/src/StateType"
import { uiControlName, textureID, state as uiControlState } from "meta3d-ui-control-scene-view-protocol"
import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { map } from "meta3d-commonlib-ts/src/NullableUtils"

export function getState(states: states): state {
    return states[workPluginName]
}

export function setState(states: states, state: state): states {
    return Object.assign({}, states, {
        [workPluginName]: state
    });
}

export function getTextureID() {
    return textureID
}

export function getViewRect(uiService: uiService, uiState: uiState) {
    return map<uiControlState, rect>(({ rect }) => rect, uiService.getUIControlState<uiControlState>(uiState, uiControlName)
    )
}
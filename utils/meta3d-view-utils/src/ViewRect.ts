import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { map } from "meta3d-commonlib-ts/src/NullableUtils"
import { uiControlName, state as uiControlState } from "meta3d-ui-control-scene-view-protocol"
import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"

// TODO refactor: rename to getSceneViewRect
export function getViewRect(uiService: uiService, uiState: uiState) {
    return map<uiControlState, rect>(({ rect }) => rect, uiService.getUIControlState<uiControlState>(uiState, uiControlName)
    )
}
import { state as meta3dState } from "meta3d-type"
import { prepare as prepareMeta3d, registerExtension, getExtensionStateExn, getServiceExn, setExtensionState } from "meta3d"
import { getExtensionService as getUIExtensionService, createExtensionState as createUIExtensionState } from "meta3d-ui"
import { getExtensionService as getEventExtensionService, createExtensionState as createEventExtensionState } from "meta3d-event"
import { getExtensionService as getRegisterExtensionExtensionService, createExtensionState as createRegisterExtensionExtensionState } from "meta3d-register-extension"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as registerExtensionService } from "meta3d-register-extension-protocol/src/service/ServiceType"
import { state as registerExtensionState } from "meta3d-register-extension-protocol/src/state/StateType"

function _getMeta3DUIExtensionName(): string {
    return "meta3d-ui"
}

function _getMeta3DEventExtensionName(): string {
    return "meta3d-event"
}

function _getMeta3DRegisterExtensionExtensionName(): string {
    return "meta3d-register-extension"
}



export function init() {
    let meta3dState = prepareMeta3d()

    // TODO use pipe
    meta3dState =
        registerExtension(
            meta3dState,
            _getMeta3DUIExtensionName(),
            getUIExtensionService,
            null,
            createUIExtensionState()
        )
    meta3dState =
        registerExtension(
            meta3dState,
            _getMeta3DEventExtensionName(),
            getEventExtensionService,
            null,
            createEventExtensionState()
        )

    meta3dState =
        registerExtension(
            meta3dState,
            _getMeta3DRegisterExtensionExtensionName(),
            getRegisterExtensionExtensionService,
            {
                meta3dUIExtensionName: _getMeta3DUIExtensionName(),
                meta3dEventExtensionName: _getMeta3DEventExtensionName()
            },
            createRegisterExtensionExtensionState()
        )



    let { register } = getServiceExn<registerExtensionService>(meta3dState, _getMeta3DRegisterExtensionExtensionName())

    return register(meta3dState)
}

export function loop(meta3dState: meta3dState) {
    let { render } = getServiceExn<uiService>(meta3dState, _getMeta3DUIExtensionName())

    render(meta3dState, _getMeta3DUIExtensionName()).then((meta3dState: meta3dState) => {
        requestAnimationFrame(
            () => {
                loop(meta3dState)
            }
        )
    })
}
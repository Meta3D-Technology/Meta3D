import { api, state as meta3dState } from "meta3d-type"
import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { service as gameViewRenderService } from "meta3d-editor-gameview-render-protocol/src/service/ServiceType"
import { actionName as runActionName, state as runState } from "meta3d-action-run-protocol"

export let runGameViewRenderOnlyOnce = (meta3dState: meta3dState, api: api, { getPluggablePackageService }: editorWholeService): meta3dState => {
    if (api.nullable.getWithDefault(api.nullable.map(runState => runState.isRun, api.action.getActionState<runState>(meta3dState, runActionName)), false)) {
        return meta3dState
    }

    return api.nullable.getWithDefault(
        api.nullable.map(
            ({ runOnlyOnce }) => {
                return runOnlyOnce(meta3dState)
            },
            getPluggablePackageService<gameViewRenderService>(meta3dState, "meta3d-editor-gameview-render-protocol")
        ),
        meta3dState
    )
}
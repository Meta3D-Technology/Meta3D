import { api, state as meta3dState } from "meta3d-type"
import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { service as gameViewRenderService } from "meta3d-editor-gameview-render-protocol/src/service/ServiceType"

export let runGameViewRenderOnlyOnce = (meta3dState: meta3dState, api: api, { getPluggablePackageService }: editorWholeService): meta3dState => {
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
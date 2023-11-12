import { api, state as meta3dState } from "meta3d-type"
import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { service as gameViewRenderService } from "meta3d-editor-gameview-render-protocol/src/service/ServiceType"
import { getExn, getWithDefault, map } from "meta3d-commonlib-ts/src/NullableUtils"

export let runGameViewRenderOnlyOnce = (meta3dState: meta3dState, { getPluggablePackageService }: editorWholeService): meta3dState => {
    return getWithDefault(
        map(
            ({ runOnlyOnce }) => {
                return runOnlyOnce(meta3dState)
            },
            getPluggablePackageService<gameViewRenderService>(meta3dState, "meta3d-editor-gameview-render-protocol")
        ),
        meta3dState
    )
}
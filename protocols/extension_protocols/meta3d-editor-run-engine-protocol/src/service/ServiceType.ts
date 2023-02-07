import { state as meta3dState } from "meta3d-type/src/Index"
import { context } from "meta3d-imgui-renderer-protocol/src/service/ServiceType";

export type service = {
    prepareAndInitEngine: (
        meta3dState: meta3dState,
        gl: context,
        isDebug: boolean
    ) => Promise<meta3dState>,
    loopEngine: (meta3dState: meta3dState) => Promise<meta3dState>
}
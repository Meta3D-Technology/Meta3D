import { state as meta3dState } from "meta3d-type"

export type service = {
    loadScene: (meta3dState: meta3dState, sceneGLB: ArrayBuffer) => Promise<meta3dState>
}

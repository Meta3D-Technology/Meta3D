import { state as meta3dState } from "meta3d-type"

type onFinishFunc = (glb: ArrayBuffer) => void

type onErrorFunc = (error: ErrorEvent) => void

export type service = {
    export: ([onFinishFunc, onErrorFunc]: [onFinishFunc, onErrorFunc], meta3dState: meta3dState) => void
}

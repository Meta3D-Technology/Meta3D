import { state as meta3dState } from "meta3d-type"

type onFinishFunc = (glb: ArrayBuffer) => void

type onErrorFunc = (error: ErrorEvent) => void

export type exportScene = ([onFinishFunc, onErrorFunc]: [onFinishFunc, onErrorFunc], meta3dState: meta3dState) => void

export type service = {
    export: exportScene
}

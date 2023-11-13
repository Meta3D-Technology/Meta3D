import { state as meta3dState } from "meta3d-type"
import type { List } from "immutable"

export type initFunc = (meta3dState: meta3dState, canvas: HTMLCanvasElement) => Promise<meta3dState>

export type state = {
    initFuncs: List<initFunc>,
}
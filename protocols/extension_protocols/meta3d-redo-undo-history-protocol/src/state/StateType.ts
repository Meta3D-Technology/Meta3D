import { state as meta3dState } from "meta3d-type"
import type { Stack } from "immutable";

export type state = {
    undoStack: Stack<meta3dState>,
    redoStack: Stack<meta3dState>
}
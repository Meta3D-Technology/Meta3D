import { state as meta3dState } from "meta3d-type"
import type { List } from "immutable"
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { events } from "meta3d-event-sourcing-protocol/src/state/StateType"


export type initTarget = "visual" | "visualRun"

export type initData = {
    target: initTarget,
    isDebug: boolean,
    canvas: HTMLCanvasElement
}

export type updateData = { clearColor: [number, number, number, number], time: number, skinName: nullable<string> }

export type initFunc = (meta3dState: meta3dState, initData: initData) => Promise<meta3dState>

// export type func = (meta3dState: meta3dState) => Promise<meta3dState>

export type state = {
    initFuncs: List<initFunc>,
    currentAllEvents: events
}
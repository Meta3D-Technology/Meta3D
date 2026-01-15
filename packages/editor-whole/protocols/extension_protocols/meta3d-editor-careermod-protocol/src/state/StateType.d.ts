import { state as meta3dState } from "meta3d-type"
import type { List } from "immutable"
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { events } from "meta3d-event-sourcing-protocol/src/state/StateType"


export type target = "visual" | "visualRun"

export type env = "local" | "production"

export type initData = {
    target: target,
    isDebug: boolean,
    canvas: HTMLCanvasElement,
    env: env
}

export type updateData = {
    target: target,
    clearColor: [number, number, number, number], time: number, skinName: nullable<string>
}

// export type initDataForInitFunc = {
//     isDebug: boolean,
//     canvas: HTMLCanvasElement
// }

// export type initFunc = (meta3dState: meta3dState, initData: initDataForInitFunc) => Promise<meta3dState>

// export type func = (meta3dState: meta3dState) => Promise<meta3dState>

// export type state = {
//     initFuncs: List<initFunc>,
//     currentAllEvents: events,
//     // env: nullable<env>
// }
export type state = null
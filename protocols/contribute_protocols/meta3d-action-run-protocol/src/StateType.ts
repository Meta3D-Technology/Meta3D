// import { state as meta3dState } from "meta3d-type"
// import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const actionName = "Run"

export type state = {
    // meta3dStateBeforeRun: nullable<meta3dState>,
    isRun: boolean,
    // loopHandle: nullable<number>
}

export type elementState = {
    [actionName]: state
}

import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const actionName = "Run"

export type state = {
    isRun: boolean,
    loopHandle: nullable<number>
}

export type elementState = {
    [actionName]: state
}

import { state as meta3dState } from "meta3d-type"

type childrenFunc = (meta3dState: meta3dState) => meta3dState

export type inputData = {
    label: string,
    childrenFunc: childrenFunc
}

export type outputData = null
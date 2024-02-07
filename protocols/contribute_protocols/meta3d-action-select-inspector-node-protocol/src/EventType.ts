export const eventName = "SelectInspectorNodeEvent"

export type data = any

export type nodeType = "scenetree" | "asset"

export type inputData = [[nodeType, data]]
// export type inputData = []



export const backwardEventName = "DeSelectInspectorNodeEvent"
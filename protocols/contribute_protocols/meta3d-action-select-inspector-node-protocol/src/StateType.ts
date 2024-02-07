import { data, nodeType } from "./EventType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import type { List } from "immutable"

export const actionName = "SelectInspectorNode"

export type eventData = [nodeType, data]

export type state = {
    selectedNodeData: nullable<[nodeType, data]>,
    allSelectedNodeData: List<[nodeType, data]>
}



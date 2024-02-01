import { state as meta3dState } from "meta3d-type"
import { componentName, script, attributeValue, dataName } from "meta3d-component-script-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export type createScript = (meta3dState: meta3dState) => [meta3dState, script]

export type getName = (meta3dState: meta3dState, script: script) => nullable<string>

export type setName = (meta3dState: meta3dState, script: script, name: string) => meta3dState

export type getEventFileStr = (meta3dState: meta3dState, script: script) => nullable<string>

export type setEventFileStr = (meta3dState: meta3dState, script: script, eventFileStr: number) => meta3dState

export type getAttribute = (meta3dState: meta3dState, script: script) => nullable<attributeValue>

export type setAttribute = (meta3dState: meta3dState, script: script, attribute: number) => meta3dState
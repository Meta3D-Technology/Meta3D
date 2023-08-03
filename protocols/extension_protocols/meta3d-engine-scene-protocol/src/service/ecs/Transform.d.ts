import { state as meta3dState } from "meta3d-type"
import { transform, componentName, dataName, localPosition, localRotation, localScale, parent, children } from "meta3d-component-transform-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"
import { localToWorldMatrix } from "../../../../../../utils/meta3d-component-transform-protocol-common/src/Index"

export type createTransform = (meta3dState: meta3dState) => [meta3dState, transform]

export type getGameObjects = (meta3dState: meta3dState, transform: transform) => Array<gameObject>

export type getParent = (meta3dState: meta3dState, transform: transform) => nullable<parent>

export type setParent = (meta3dState: meta3dState, transform: transform, parent: parent) => meta3dState

export type getChildren = (meta3dState: meta3dState, transform: transform) => nullable<children>

export type getLocalPosition = (meta3dState: meta3dState, transform: transform) => nullable<localPosition>

export type setLocalPosition = (meta3dState: meta3dState, transform: transform, localPosition: localPosition) => meta3dState

export type getLocalRotation = (meta3dState: meta3dState, transform: transform) => nullable<localRotation>

export type setLocalRotation = (meta3dState: meta3dState, transform: transform, localRotation: localRotation) => meta3dState

export type getLocalScale = (meta3dState: meta3dState, transform: transform) => nullable<localScale>

export type setLocalScale = (meta3dState: meta3dState, transform: transform, localScale: localScale) => meta3dState

export type getLocalToWorldMatrix = (meta3dState: meta3dState, transform: transform) => nullable<localToWorldMatrix>

export type lookAt = (meta3dState: meta3dState, transform: transform, target: [number, number, number]) => meta3dState
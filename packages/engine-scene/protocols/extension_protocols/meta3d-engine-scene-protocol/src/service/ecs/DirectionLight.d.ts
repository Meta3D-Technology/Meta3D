import { state as meta3dState } from "meta3d-type"
import { componentName, directionLight, dataName, color, intensity } from "meta3d-component-directionlight-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

export type createDirectionLight = (meta3dState: meta3dState) => [meta3dState, directionLight]

export type getName = (meta3dState: meta3dState, directionLight: directionLight) => nullable<string>

export type setName = (meta3dState: meta3dState, directionLight: directionLight, name: string) => meta3dState

export type getColor = (meta3dState: meta3dState, directionLight: directionLight) => nullable<color>

export type setColor = (meta3dState: meta3dState, directionLight: directionLight, color: color) => meta3dState

export type getIntensity = (meta3dState: meta3dState, directionLight: directionLight) => nullable<intensity>

export type setIntensity = (meta3dState: meta3dState, directionLight: directionLight, intensity: intensity) => meta3dState

export type getDirection = (meta3dState: meta3dState, directionLight: directionLight) => nullable<[number, number, number]>

export type setDirection = (meta3dState: meta3dState, directionLight: directionLight, direction: [number, number, number]) => meta3dState

// export type getAllDirectionLights = (meta3dState: meta3dState) => directionLight[]

export type getGameObjects = (meta3dState: meta3dState, directionLight: directionLight) => Array<gameObject>
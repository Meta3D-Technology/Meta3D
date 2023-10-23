import { transform as transformType, update as updateType, localToWorldMatrix as localToWorldMatrixType } from "meta3d-component-transform-protocol-common"
// import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const componentName = "Transform"

export type config = {
    isDebug: boolean,
    float9Array1: Float32Array,
    float32Array1: Float32Array,
    transformCount: number,
}

export type state = {
    buffer: SharedArrayBuffer,
    config: config
}

export const dataName = {
    name: 0,
    parent: 1,
    children: 2,
    localPosition: 3,
    localRotation: 4,
    localScale: 5,
    position: 6,
    rotation: 7,
    scale: 8,
    localEulerAngles: 9,
    eulerAngles: 10,
    normalMatrix: 11,
    localToWorldMatrix: 12,
    dirty: 13,
    update: 14,

}

export type transform = transformType

export type needDisposedComponents = transform[]

export type parent = transform

export type children = Array<transform>

export type localPosition = [number, number, number];

// export type position = [number, number, number];

export type localRotation = [number, number, number, number];

// export type rotation = [number, number, number, number];

export type localScale = [number, number, number];

// export type scale = [number, number, number];

// export type localEulerAngles = [number, number, number];

// export type eulerAngles = [number, number, number];

export type localToWorldMatrix = localToWorldMatrixType

// export type normalMatrix = Float32Array

export type update = updateType
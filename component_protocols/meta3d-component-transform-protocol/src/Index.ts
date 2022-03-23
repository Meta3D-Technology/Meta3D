export const componentName = "Transform"

export type config = {
    isDebug: boolean,
    float9Array1: Float32Array,
    float32Array1: Float32Array,
    transformCount: number,
}

export const dataName = {
    parent: 0,
    children: 1,
    localPosition: 2,
    localRotation: 3,
    localScale: 4,
    position: 5,
    rotation: 6,
    scale: 7,
    localEulerAngles: 8,
    eulerAngles: 9,
    normalMatrix: 10,
    localToWorldMatrix: 11,
    dirty: 12,
    update: 13,
}

export type transform = number

// export type parent = transform

// export type children = Array<transform>

// export type localPosition = [number, number, number];

// export type position = [number, number, number];

// export type localRotation = [number, number, number, number];

// export type rotation = [number, number, number, number];

// export type localScale = [number, number, number];

// export type scale = [number, number, number];

// export type localEulerAngles = [number, number, number];

// export type eulerAngles = [number, number, number];

export type localToWorldMatrix = Float32Array

// export type normalMatrix = Float32Array

export type update = null
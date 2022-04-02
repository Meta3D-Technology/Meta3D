export const componentName = "DirectionLight"

export type config = { readonly isDebug: boolean; readonly directionLightCount: number };

export type state = {
    buffer: SharedArrayBuffer,
    config: config
}

export const dataName = {
    color: 0,
    intensity: 1,
}

export type directionLight = number

export type color = [number, number, number]

export type intensity = number
export const componentName = "DirectionLight"

export type config = { readonly isDebug: boolean; readonly directionLightCount: number };

export type state = {
    buffer: SharedArrayBuffer,
    config: config
}

export const dataName = {
  name:0,
  color: 1,
  intensity: 2
}

export type directionLight = number

export type needDisposedComponents = directionLight[]

export type color = [number, number, number]

export type intensity = number
export const componentName = "DirectionLightWorker"

export type config = { isDebug: boolean, directionLightCount: number, buffer: SharedArrayBuffer };

export const dataName = {
    color: 0,
    intensity: 1,
}

export type directionLight = number
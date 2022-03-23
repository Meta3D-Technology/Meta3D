export const componentName = "ArcballCameraController"

export type config = { readonly isDebug: boolean };

export const dataName = {
    distance: 0,
    minDistance: 1,
    wheelSpeed: 2,
    phi: 3,
    theta: 4,
    thetaMargin: 5,
    target: 6,
    rotateSpeed: 7,
    moveSpeedX: 8,
    moveSpeedY: 9,
    dirty: 10,
}

export type arcballCameraController = number

export type distance = number

export type minDistance = number

export type wheelSpeed = number

export type phi = number

export type theta = number

export type thetaMargin = number

export type target = [number, number, number]

export type rotateSpeed = number

export type moveSpeedX = number

export type moveSpeedY = number

export type dirty = boolean
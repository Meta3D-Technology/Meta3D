export const componentName = "ArcballCameraController"

export type state = any

export type config = { readonly isDebug: boolean };

export const dataName = {
    name: 0,
    distance: 1,
    minDistance: 2,
    wheelSpeed: 3,
    phi: 4,
    theta: 5,
    thetaMargin: 6,
    target: 7,
    rotateSpeed: 8,
    moveSpeedX: 9,
    moveSpeedY: 10,
    dirty: 11,
}

export type arcballCameraController = number

export type needDisposedComponents = arcballCameraController[]

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
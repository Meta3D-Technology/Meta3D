export const uiControlName = "Button"

type rect = {
    x: number,
    y: number,
    width: number,
    height: number
}

export type inputData = {
    rect: rect,
    // text: string
}

type isClick = boolean

export type outputData = isClick
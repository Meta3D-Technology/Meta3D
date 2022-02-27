export type state = null

export type registerExtensionExecState = {
    x: number,
    y: number,
    width: number,
    height: number,
    text: string
}

type extensionData = {
    extensionName: string
}

export type showExtensionExecState = {
    extensionDataArr: Array<extensionData>
}
export const skinName = "Default"

type color = [number, number, number]

type buttonStyle = {
    normal: {
        background_color: color
    }
}

export type skin = {
    button: buttonStyle
}
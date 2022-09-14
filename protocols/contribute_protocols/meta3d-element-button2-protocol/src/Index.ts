export const elementName = "Button2"

export type elementState = {
    x: number,
    y: number,
    width: number,
    height: number,
    text: string
}

export const BUTTON2_CHNAGE_TEXT = "BUTTON2_CHNAGE_TEXT";

export type text = string

export type changeTextAction = {
    type: typeof BUTTON2_CHNAGE_TEXT,
    text: text
}
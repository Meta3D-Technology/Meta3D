
import { menuLabel as menuLabel_ } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export const uiControlName = "Menu"

export type state = null

export type inputFunc = null

export type actionName = string

export type menuLabel = menuLabel_

export type menuItems = Array<[menuLabel, Record<menuLabel, actionName>]>

export type specificData = {
    label: string,
    items: menuItems,
}

export type outputData = null
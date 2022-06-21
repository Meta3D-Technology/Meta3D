import { contributeDetailData } from "../contribute_shop/store_type/ContributeShopStoreType";
import { extensionDetailData } from "../extension_shop/store_type/ExtensionShopStoreType";
import { selectedContribute, username } from "../store_type/AppStoreType";

export const APP_SET_USERNAME = "APP_SET_USERNAME"

export const APP_SELECT_EXTENSION = "APP_SELECT_EXTENSION"

export const APP_NOT_SELECT_EXTENSION = "APP_NOT_SELECT_EXTENSION"

export const APP_SELECT_CONTRIBUTE = "APP_SELECT_CONTRIBUTE"

export const APP_NOT_SELECT_CONTRIBUTE = "APP_NOT_SELECT_CONTRIBUTE"

export const APP_START_EXTENSION = "APP_START_EXTENSION"

export const APP_UNSTART_EXTENSION = "APP_UNSTART_EXTENSION"

export const APP_SET_EXTENSION_NEWNAME = "APP_SET_EXTENSION_NEWNAME"

export const APP_SET_CONTRIBUTE_NEWNAME = "APP_SET_CONTRIBUTE_NEWNAME"

export const APP_CLEAR_SELECT = "APP_CLEAR_SELECT"

export interface SetUserName {
    type: typeof APP_SET_USERNAME,
    username: username
}

export interface SelectExtension {
    type: typeof APP_SELECT_EXTENSION,
    extension: extensionDetailData
}

export interface NotSelectExtension {
    type: typeof APP_NOT_SELECT_EXTENSION,
    id: number
}

export interface StartExtension {
    type: typeof APP_START_EXTENSION,
    id: number
}

export interface UnStartExtension {
    type: typeof APP_UNSTART_EXTENSION,
    id: number
}

export interface SetExtensionNewName {
    type: typeof APP_SET_EXTENSION_NEWNAME,
    id: number,
    newName: string
}

export interface SetContributeNewName {
    type: typeof APP_SET_CONTRIBUTE_NEWNAME,
    id: number,
    newName: string
}

export interface SelectContribute {
    type: typeof APP_SELECT_CONTRIBUTE,
    contribute: contributeDetailData
}

export interface NotSelectContribute {
    type: typeof APP_NOT_SELECT_CONTRIBUTE,
    id: number
}

export interface ClearSelect {
    type: typeof APP_CLEAR_SELECT
}

export type AppAction = SetUserName | SelectExtension | NotSelectExtension | SelectContribute | NotSelectContribute | StartExtension | UnStartExtension | SetExtensionNewName | SetContributeNewName | ClearSelect
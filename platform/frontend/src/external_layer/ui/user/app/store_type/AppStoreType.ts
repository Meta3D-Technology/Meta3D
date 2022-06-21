import type { nullable } from "meta3d-commonlib-ts/src/nullable"
import { contributeFileData } from "../contribute_shop/store_type/ContributeShopStoreType"
import { extensionFileData } from "../extension_shop/store_type/ExtensionShopStoreType"

export type username = nullable<string>

export type selectedExtension = {
    id: number,
    newName: nullable<string>,
    isStart: boolean,
    data: extensionFileData
}

export type selectedExtensions = Array<selectedExtension>

export type selectedContribute = {
    id: number,
    newName: nullable<string>,
    data: contributeFileData
}

export type selectedContributes = Array<selectedContribute>

// export type publishedEditor = {
// name:string,
// id:number,

// }

// export type publishedEditors = Array<publishedEditor>

export interface AppStore {
    username: username
    selectedExtensions: selectedExtensions
    selectedContributes: selectedContributes
    // publishedEditors: publishedEditors
}
import type { nullable } from "meta3d-commonlib-ts/src/nullable"
import { extensionFileData as extensionFileDataMeta3D } from "meta3d/src/file/ExtensionFileType"

type dependentExtensionNameMap = any

type dependentContributeNameMap = any

type extensionService = any

type extensionState = any

export type extensionFileData = extensionFileDataMeta3D<
    dependentExtensionNameMap,
    dependentContributeNameMap,
    extensionService,
    extensionState
>

export type extensionDetailData = {
    id: number,
    data: extensionFileData
}

export interface ExtensionShopStore {
    extensionDetailData: nullable<extensionDetailData>
}
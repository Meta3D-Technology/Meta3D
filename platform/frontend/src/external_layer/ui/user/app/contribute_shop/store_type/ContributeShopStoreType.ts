import type { nullable } from "meta3d-commonlib-ts/src/nullable"
import { contributeFileData as contributeFileDataMeta3D } from "meta3d/src/file/ExtensionFileType"

type dependentExtensionNameMap = any

type dependentContributeNameMap = any

type contributeService = any

export type contributeFileData = contributeFileDataMeta3D<
    dependentExtensionNameMap,
    dependentContributeNameMap,
    contributeService
>

export type contributeDetailData = {
    id: number,
    data: contributeFileData
}

export interface ContributeShopStore {
    contributeDetailData: nullable<contributeDetailData>
}
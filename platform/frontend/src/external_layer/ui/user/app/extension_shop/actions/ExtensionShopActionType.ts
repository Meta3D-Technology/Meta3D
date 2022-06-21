import { extensionDetailData } from "../store_type/ExtensionShopStoreType";

export const EXTENSIONSHOP_SET_DETAILDATA = "EXTENSIONSHOP_SET_DETAILDATA"

export const EXTENSIONSHOP_CLEAR_DETAILDATA = "EXTENSIONSHOP_CLEAR_DETAILDATA"

export interface SetDetailData {
    type: typeof EXTENSIONSHOP_SET_DETAILDATA,
    data: extensionDetailData
}

export interface ClearDetailData {
    type: typeof EXTENSIONSHOP_CLEAR_DETAILDATA
}

export type ExtensionShopAction = SetDetailData | ClearDetailData
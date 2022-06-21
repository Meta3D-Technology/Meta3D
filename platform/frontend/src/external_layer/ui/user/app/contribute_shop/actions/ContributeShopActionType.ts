import { contributeDetailData } from "../store_type/ContributeShopStoreType";

export const CONTRIBUTESHOP_SET_DETAILDATA = "CONTRIBUTESHOP_SET_DETAILDATA"

export const CONTRIBUTESHOP_CLEAR_DETAILDATA = "CONTRIBUTESHOP_CLEAR_DETAILDATA"

export interface SetDetailData {
    type: typeof CONTRIBUTESHOP_SET_DETAILDATA,
    data: contributeDetailData
}

export interface ClearDetailData {
    type: typeof CONTRIBUTESHOP_CLEAR_DETAILDATA
}

export type ContributeShopAction = SetDetailData | ClearDetailData
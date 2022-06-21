import { contributeDetailData } from "../store_type/ContributeShopStoreType"
import { ClearDetailData, CONTRIBUTESHOP_CLEAR_DETAILDATA, CONTRIBUTESHOP_SET_DETAILDATA, SetDetailData } from "./ContributeShopActionType"

export let setDetailData = (data: contributeDetailData): SetDetailData => {
    return {
        type: CONTRIBUTESHOP_SET_DETAILDATA,
        data
    }
}

export let clearDetailData = (): ClearDetailData => {
    return {
        type: CONTRIBUTESHOP_CLEAR_DETAILDATA
    }
}
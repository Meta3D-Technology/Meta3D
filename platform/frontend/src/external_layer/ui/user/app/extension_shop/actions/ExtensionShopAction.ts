import { extensionDetailData } from "../store_type/ExtensionShopStoreType"
import { ClearDetailData, EXTENSIONSHOP_CLEAR_DETAILDATA, EXTENSIONSHOP_SET_DETAILDATA, SetDetailData } from "./ExtensionShopActionType"

export let setDetailData = (data: extensionDetailData): SetDetailData => {
    return {
        type: EXTENSIONSHOP_SET_DETAILDATA,
        data
    }
}

export let clearDetailData = (): ClearDetailData => {
    return {
        type: EXTENSIONSHOP_CLEAR_DETAILDATA
    }
}
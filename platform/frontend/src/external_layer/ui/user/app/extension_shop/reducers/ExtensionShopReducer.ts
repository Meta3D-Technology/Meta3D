import { ExtensionShopStore } from "../store_type/ExtensionShopStoreType";
import { ExtensionShopAction, EXTENSIONSHOP_CLEAR_DETAILDATA, EXTENSIONSHOP_SET_DETAILDATA } from "../actions/ExtensionShopActionType";

export let ExtensionShopReducer = (state: ExtensionShopStore = {
    extensionDetailData: null
}, action: ExtensionShopAction): ExtensionShopStore => {
    switch (action.type) {
        case EXTENSIONSHOP_SET_DETAILDATA:
            return {
                ...state,
                extensionDetailData: action.data
            }
        case EXTENSIONSHOP_CLEAR_DETAILDATA:
            return {
                ...state,
                extensionDetailData: null
            }
        default:
            return state
    }
};
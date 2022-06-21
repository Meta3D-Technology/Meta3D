import { ContributeShopStore } from "../store_type/ContributeShopStoreType";
import { ContributeShopAction, CONTRIBUTESHOP_SET_DETAILDATA, CONTRIBUTESHOP_CLEAR_DETAILDATA } from "../actions/ContributeShopActionType";

export let ContributeShopReducer = (state: ContributeShopStore = {
    contributeDetailData: null
}, action: ContributeShopAction): ContributeShopStore => {
    switch (action.type) {
        case CONTRIBUTESHOP_SET_DETAILDATA:
            return {
                ...state,
                contributeDetailData: action.data
            }
        case CONTRIBUTESHOP_CLEAR_DETAILDATA:
            return {
                ...state,
                contributeDetailData: null
            }
        default:
            return state
    }
};
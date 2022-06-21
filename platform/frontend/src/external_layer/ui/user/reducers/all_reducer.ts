import { combineReducers } from 'redux'
import { EditorManagerReducer } from '../app/editor_manager/reducers/EditorManagerReducer'
import { ContributeShopReducer } from '../app/contribute_shop/reducers/ContributeShopReducer'
import { ExtensionShopReducer } from '../app/extension_shop/reducers/ExtensionShopReducer'
import { AppReducer } from '../app/reducers/AppReducer'

export const rootReducer = combineReducers({
    app: AppReducer,
    extensionShop: ExtensionShopReducer,
    contributeShop: ContributeShopReducer,
    editorManager: EditorManagerReducer
})

export type RootState = ReturnType<typeof rootReducer>
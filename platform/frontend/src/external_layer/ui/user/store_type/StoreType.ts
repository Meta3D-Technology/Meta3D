import { EditorManagerStore } from "../app/editor_manager/store_type/EditorManagerStoreType";
import { ContributeShopStore } from "../app/contribute_shop/store_type/ContributeShopStoreType";
import { ExtensionShopStore } from "../app/extension_shop/store_type/ExtensionShopStoreType";
import { AppStore } from "../app/store_type/AppStoreType";

export interface Store {
    app: AppStore,
    extensionShop: ExtensionShopStore,
    contributeShop: ContributeShopStore,
    editorManager: EditorManagerStore,
}
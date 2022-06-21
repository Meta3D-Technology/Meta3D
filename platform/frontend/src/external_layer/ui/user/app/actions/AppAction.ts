import { contributeDetailData } from "../contribute_shop/store_type/ContributeShopStoreType"
import { extensionDetailData } from "../extension_shop/store_type/ExtensionShopStoreType"
import { selectedContribute, username } from "../store_type/AppStoreType"
import { APP_NOT_SELECT_CONTRIBUTE, APP_NOT_SELECT_EXTENSION, APP_SELECT_CONTRIBUTE, APP_SELECT_EXTENSION, APP_SET_EXTENSION_NEWNAME, APP_SET_USERNAME, APP_START_EXTENSION, APP_UNSTART_EXTENSION, NotSelectContribute, NotSelectExtension, SelectContribute, SelectExtension, SetExtensionNewName, SetContributeNewName, SetUserName, StartExtension, UnStartExtension, APP_SET_CONTRIBUTE_NEWNAME, ClearSelect, APP_CLEAR_SELECT } from "./AppActionType"

export let setUserName = (username: username): SetUserName => {
    return {
        type: APP_SET_USERNAME,
        username
    }
}

export let selectExtension = (extension: extensionDetailData): SelectExtension => {
    return {
        type: APP_SELECT_EXTENSION,
        extension
    }
}

export let notSelectExtension = (id: number): NotSelectExtension => {
    return {
        type: APP_NOT_SELECT_EXTENSION,
        id
    }
}

export let selectContribute = (contribute: contributeDetailData): SelectContribute => {
    return {
        type: APP_SELECT_CONTRIBUTE,
        contribute
    }
}

export let notSelectContribute = (id: number): NotSelectContribute => {
    return {
        type: APP_NOT_SELECT_CONTRIBUTE,
        id
    }
}

export let startExtension = (id: number): StartExtension => {
    return {
        type: APP_START_EXTENSION,
        id
    }
}

export let unStartExtension = (id: number): UnStartExtension => {
    return {
        type: APP_UNSTART_EXTENSION,
        id
    }
}

export let setExtensionNewName = (id: number, newName: string): SetExtensionNewName => {
    return {
        type: APP_SET_EXTENSION_NEWNAME,
        id,
        newName
    }
}

export let setContributeNewName = (id: number, newName: string): SetContributeNewName => {
    return {
        type: APP_SET_CONTRIBUTE_NEWNAME,
        id,
        newName
    }
}

export let clearSelect = (): ClearSelect => {
    return {
        type: APP_CLEAR_SELECT
    }
}
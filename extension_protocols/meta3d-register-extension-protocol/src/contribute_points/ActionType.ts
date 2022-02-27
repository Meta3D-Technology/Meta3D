export type extensionName = string

export const SHOWEXTENSION_REGISTER_EXTENSION = "SHOWEXTENSION_REGISTER_EXTENSION";

export type registerExtension = {
    type: typeof SHOWEXTENSION_REGISTER_EXTENSION,
    extensionName: extensionName
}

export type showRegisterAction = registerExtension
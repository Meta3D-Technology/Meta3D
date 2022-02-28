import { extensionName, registerExtension as registerExtensionAction, SHOWEXTENSION_REGISTER_EXTENSION } from "meta3d-element-show-extensions-protocol"

export function registerExtension(extensionName: extensionName): registerExtensionAction {
    return {
        type: SHOWEXTENSION_REGISTER_EXTENSION,
        extensionName
    }
}


import { extensionName, registerExtension as registerExtensionType, SHOWEXTENSION_REGISTER_EXTENSION } from "../../../extension_protocols/meta3d-register-extension-protocol/src/contribute_points/ActionType"

export function registerExtension(extensionName: extensionName): registerExtensionType {
    return {
        type: SHOWEXTENSION_REGISTER_EXTENSION,
        extensionName
    }
}


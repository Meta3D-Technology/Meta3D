export let getExtensionService = (api, [{ meta3dTest1ExtensionName }, _dependentContributeNameMap]) => {
    return {
        run: (meta3dState) => {
            let test1State = api.getExtensionState(meta3dState, meta3dTest1ExtensionName);
            let { log, registerInfo } = api.getExtensionService(meta3dState, meta3dTest1ExtensionName);
            test1State = registerInfo(test1State, meta3dState);
            log(test1State);
            meta3dState = api.setExtensionState(meta3dState, meta3dTest1ExtensionName, test1State);
            return meta3dState;
        },
    };
};
export let createExtensionState = () => {
    return null;
};
export let getExtensionLife = (api, extensionName) => {
    return {
        onRegister: (meta3dState, service) => {
            console.log("meta3d-editor onRegister");
            return meta3dState;
        },
        onStart: (meta3dState, service) => {
            console.log("meta3d-editor onStart");
            return service.run(meta3dState);
        }
    };
};
//# sourceMappingURL=Main.js.map
export let getExtensionService = (api, [_dependentExtensionNameMap, { meta3dTest1ContributeName }]) => {
    return {
        log: ({ infos }) => {
            console.log("meta3d-extension-test1 extension->log infos:", infos);
        },
        registerInfo: (state, meta3dState) => {
            let { getInfo } = api.getContribute(meta3dState, meta3dTest1ContributeName);
            // TODO state.infos should be immutable Map
            state.infos[meta3dTest1ContributeName] = getInfo();
            return state;
        }
    };
};
export let createExtensionState = () => {
    return {
        infos: {}
    };
};
export let getExtensionLife = (api, extensionName) => {
    return {
        onRegister: (meta3dState, service) => {
            console.log("meta3d-extension-test1 onRegister");
            return meta3dState;
        },
        // onStart: (meta3dState, service) => {
        // 	console.log("meta3d-editor onStart")
        // }
    };
};
//# sourceMappingURL=Main.js.map
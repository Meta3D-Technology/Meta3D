import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
let _runPipeline = (api, meta3dState, engineCoreState, meta3dBsMostExtensionName, meta3dEngineCoreExtensionName, pipelineName) => {
    let tempMeta3DState = null;
    let { map } = api.getExtensionService(meta3dState, meta3dBsMostExtensionName);
    let { runPipeline } = api.getExtensionService(meta3dState, meta3dEngineCoreExtensionName);
    return map((engineCoreState) => {
        tempMeta3DState = api.setExtensionState(meta3dState, meta3dEngineCoreExtensionName, engineCoreState);
        return null;
    }, runPipeline(engineCoreState, meta3dState, pipelineName)).drain().then((_) => {
        return getExn(tempMeta3DState);
    });
};
let _loop = (api, meta3dState, meta3dBsMostExtensionName, meta3dEngineCoreExtensionName) => {
    return _runPipeline(api, meta3dState, api.getExtensionState(meta3dState, meta3dEngineCoreExtensionName), meta3dBsMostExtensionName, meta3dEngineCoreExtensionName, "update").then((meta3dState) => {
        _runPipeline(api, meta3dState, api.getExtensionState(meta3dState, meta3dEngineCoreExtensionName), meta3dBsMostExtensionName, meta3dEngineCoreExtensionName, "render").then((meta3dState) => {
            requestAnimationFrame(() => {
                _loop(api, meta3dState, meta3dBsMostExtensionName, meta3dEngineCoreExtensionName);
            });
        });
    });
};
export let getExtensionService = (api, [{ meta3dBsMostExtensionName, meta3dEngineCoreExtensionName, }, { meta3dWorkPluginRootContributeName, meta3dWorkPluginWebGPUTriangleContributeName }]) => {
    return {
        run: (meta3dState) => {
            let isDebug = true;
            let engineCoreState = api.getExtensionState(meta3dState, meta3dEngineCoreExtensionName);
            let { setIsDebug, registerWorkPlugin } = api.getExtensionService(meta3dState, meta3dEngineCoreExtensionName);
            engineCoreState = setIsDebug(engineCoreState, isDebug);
            engineCoreState = registerWorkPlugin(engineCoreState, api.getContribute(meta3dState, meta3dWorkPluginRootContributeName));
            engineCoreState = registerWorkPlugin(engineCoreState, api.getContribute(meta3dState, meta3dWorkPluginWebGPUTriangleContributeName), [
                {
                    pipelineName: "init",
                    insertElementName: "init_root_meta3d",
                    insertAction: "after"
                },
                {
                    pipelineName: "render",
                    insertElementName: "render_root_meta3d",
                    insertAction: "after"
                }
            ]);
            let { init } = api.getExtensionService(meta3dState, meta3dEngineCoreExtensionName);
            engineCoreState = init(engineCoreState, meta3dState);
            meta3dState =
                api.setExtensionState(meta3dState, meta3dEngineCoreExtensionName, engineCoreState);
            _runPipeline(api, meta3dState, engineCoreState, meta3dBsMostExtensionName, meta3dEngineCoreExtensionName, "init").then((meta3dState) => {
                _loop(api, meta3dState, meta3dBsMostExtensionName, meta3dEngineCoreExtensionName);
            });
        },
    };
};
export let createExtensionState = () => {
    return null;
};
export let getExtensionLife = (api, extensionName) => {
    return {
        onRegister: (meta3dState, service) => {
            console.log("meta3d-use-engine onRegister");
            return meta3dState;
        },
        onStart: (meta3dState, service) => {
            console.log("meta3d-use-engine onStart");
            service.run(meta3dState);
        }
    };
};
//# sourceMappingURL=Main.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExtensionState = exports.getExtensionService = void 0;
const meta3d_component_transform_1 = require("meta3d-component-transform");
const meta3d_component_transform_protocol_1 = require("meta3d-component-transform-protocol");
const meta3d_component_geometry_1 = require("meta3d-component-geometry");
const meta3d_component_geometry_protocol_1 = require("meta3d-component-geometry-protocol");
const meta3d_component_pbrmaterial_1 = require("meta3d-component-pbrmaterial");
const meta3d_component_pbrmaterial_protocol_1 = require("meta3d-component-pbrmaterial-protocol");
const meta3d_component_basiccameraview_1 = require("meta3d-component-basiccameraview");
const meta3d_component_basiccameraview_protocol_1 = require("meta3d-component-basiccameraview-protocol");
const meta3d_component_perspectivecameraprojection_1 = require("meta3d-component-perspectivecameraprojection");
const meta3d_component_perspectivecameraprojection_protocol_1 = require("meta3d-component-perspectivecameraprojection-protocol");
const meta3d_gameobject_dataoriented_1 = require("meta3d-gameobject-dataoriented");
let getExtensionService = (api, { meta3dEngineCoreExtensionName }) => {
    return {
        register: (engineCoreState, meta3dState, { isDebug, float9Array1, float32Array1, transformCount, geometryCount, geometryPointCount, pbrMaterialCount }) => {
            let { registerComponent, createAndSetComponentState, setGameObjectContribute, createAndSetGameObjectState } = api.getExtensionService(meta3dState, meta3dEngineCoreExtensionName);
            // TODO use pipe
            engineCoreState =
                registerComponent(engineCoreState, (0, meta3d_component_transform_1.getComponentContribute)());
            engineCoreState = createAndSetComponentState(engineCoreState, meta3d_component_transform_protocol_1.componentName, {
                isDebug: isDebug,
                transformCount: transformCount,
                float9Array1: float9Array1,
                float32Array1: float32Array1,
            });
            engineCoreState =
                registerComponent(engineCoreState, (0, meta3d_component_geometry_1.getComponentContribute)());
            engineCoreState = createAndSetComponentState(engineCoreState, meta3d_component_geometry_protocol_1.componentName, {
                isDebug: isDebug,
                geometryCount: geometryCount,
                geometryPointCount: geometryPointCount
            });
            engineCoreState =
                registerComponent(engineCoreState, (0, meta3d_component_pbrmaterial_1.getComponentContribute)());
            engineCoreState = createAndSetComponentState(engineCoreState, meta3d_component_pbrmaterial_protocol_1.componentName, {
                isDebug: isDebug,
                pbrMaterialCount: pbrMaterialCount,
            });
            engineCoreState =
                registerComponent(engineCoreState, (0, meta3d_component_basiccameraview_1.getComponentContribute)());
            engineCoreState = createAndSetComponentState(engineCoreState, meta3d_component_basiccameraview_protocol_1.componentName, {
                isDebug: isDebug
            });
            engineCoreState =
                registerComponent(engineCoreState, (0, meta3d_component_perspectivecameraprojection_1.getComponentContribute)());
            engineCoreState = createAndSetComponentState(engineCoreState, meta3d_component_perspectivecameraprojection_protocol_1.componentName, {
                isDebug: isDebug,
            });
            engineCoreState = setGameObjectContribute(engineCoreState, (0, meta3d_gameobject_dataoriented_1.getGameObjectContribute)());
            engineCoreState = createAndSetGameObjectState(engineCoreState, { isDebug });
            return engineCoreState;
        }
    };
};
exports.getExtensionService = getExtensionService;
let createExtensionState = () => {
    return null;
};
exports.createExtensionState = createExtensionState;
//# sourceMappingURL=Main.js.map
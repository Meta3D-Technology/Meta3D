import type { state as Meta3dType_Index_state } from 'meta3d-type/src/Index';

import type { stream as Meta3dBsMostProtocol_StreamType_stream } from 'meta3d-bs-most-protocol/src/service/StreamType.gen';

// import type { componentContribute as RegisterComponentType_componentContribute } from '../../src/state/RegisterComponentType';

import type { componentName as IComponentForJs_componentName } from '../../src/contribute_points/scene_graph/IComponentForJs.gen';

import type { component as RegisterComponentType_component } from '../../src/state/RegisterComponentType';

// import type { config as RegisterComponentType_config } from '../../src/state/RegisterComponentType';

import type { dataName as RegisterComponentType_dataName } from '../../src/state/RegisterComponentType';

import type { dataValue as IComponentForJs_dataValue } from '../../src/contribute_points/scene_graph/IComponentForJs.gen';

import type { gameObjectContribute as GameObjectType_gameObjectContribute } from '../../src/state/GameObjectType.gen';

import type { gameObject as GameObjectType_gameObject } from '../../src/state/GameObjectType.gen';

import type { gameObject as IGameObjectForJs_gameObject } from '../../src/contribute_points/scene_graph/IGameObjectForJs.gen';

import type { jobOrders as RegisterWorkPluginVOType_jobOrders } from '../../src/state/vo/RegisterWorkPluginVOType.gen';

import type { pipelineName as PipelineType_pipelineName } from '../../src/state/PipelineType.gen';

import type { pluginName as IWorkForJs_pluginName } from '../../src/contribute_points/work/IWorkForJs';

import type { state as RegisterComponentType_state } from '../../src/state/RegisterComponentType';

import type { state as StateType_state } from '../../src/state/StateType';

import type { usedComponentContribute as RegisterComponentType_usedComponentContribute } from '../../src/state/RegisterComponentType';

import type { workPluginContribute as WorkManagerType_workPluginContribute } from '../../src/contribute_points/work/WorkManagerType';

// tslint:disable-next-line:interface-over-type-literal
export type service = {
    readonly prepare: () => void;
    readonly init: (_1: StateType_state) => StateType_state;
    readonly registerWorkPlugin: (
        state: StateType_state,
        contribute: WorkManagerType_workPluginContribute,
        jobOrders?: RegisterWorkPluginVOType_jobOrders
    ) => StateType_state;
    readonly unregisterWorkPlugin: (_1: StateType_state, _2: IWorkForJs_pluginName) => StateType_state;
    readonly registerComponent: <config>(_1: StateType_state, _2: config) => StateType_state;
    readonly unregisterComponent: (_1: StateType_state, _2: IComponentForJs_componentName) => StateType_state;
    createAndSetComponentState: <config>(_1: StateType_state, _2: IComponentForJs_componentName, _3: config) => StateType_state;
    readonly unsafeGetUsedComponentContribute: (_1: StateType_state, _2: IComponentForJs_componentName) => RegisterComponentType_usedComponentContribute;
    readonly setUsedComponentContribute: (_1: StateType_state, _2: RegisterComponentType_usedComponentContribute, _3: IComponentForJs_componentName) => StateType_state;
    readonly createComponent: <component>(_1: RegisterComponentType_usedComponentContribute) => [RegisterComponentType_usedComponentContribute, component];
    readonly setComponentData: (_1: RegisterComponentType_usedComponentContribute, _2: RegisterComponentType_component, _3: RegisterComponentType_dataName, _4: IComponentForJs_dataValue) => RegisterComponentType_usedComponentContribute;
    readonly addComponent: (_1: RegisterComponentType_usedComponentContribute, _2: IGameObjectForJs_gameObject, _3: RegisterComponentType_component) => RegisterComponentType_usedComponentContribute;
    readonly hasComponent: (_1: RegisterComponentType_usedComponentContribute, _2: IGameObjectForJs_gameObject) => boolean;
    readonly getComponent: (_1: RegisterComponentType_usedComponentContribute, _2: IGameObjectForJs_gameObject) => (null | undefined | RegisterComponentType_component);
    readonly getAllComponents: (_1: RegisterComponentType_usedComponentContribute) => RegisterComponentType_component[];
    readonly getComponentData: (_1: RegisterComponentType_usedComponentContribute, _2: RegisterComponentType_component, _3: RegisterComponentType_dataName) => (null | undefined | IComponentForJs_dataValue);
    readonly getComponentGameObjects: (_1: RegisterComponentType_usedComponentContribute, _2: RegisterComponentType_component) => IGameObjectForJs_gameObject[];
    readonly getComponentState: (_1: StateType_state, _2: IComponentForJs_componentName) => (null | undefined | RegisterComponentType_state);
    readonly setGameObjectContribute: (_1: StateType_state, _2: GameObjectType_gameObjectContribute) => StateType_state;
    readonly createAndSetGameObjectState: (_1: StateType_state) => StateType_state;
    readonly createGameObject: <gameObject> (_1: StateType_state) => [StateType_state, gameObject];
    readonly getAllGameObjects: <gameObject> (_1: StateType_state) => gameObject[];
    readonly runPipeline: (_1: StateType_state, _2: Meta3dType_Index_state, _3: PipelineType_pipelineName) => Meta3dBsMostProtocol_StreamType_stream<StateType_state>
};

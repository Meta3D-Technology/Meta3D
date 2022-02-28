import type { state as Meta3dType_Index_state } from 'meta3d-type/src/Index';

import type { stream as Meta3dBsMostProtocol_StreamType_stream } from 'meta3d-bs-most-protocol/src/service/StreamType.gen';

// import type { componentContribute as RegisterComponentType_componentContribute } from '../../src/state/RegisterComponentType';

import type { componentName as ComponentContributeType_componentName } from '../../src/contribute_points/scene_graph/ComponentContributeType';

import type { component as RegisterComponentType_component } from '../../src/state/RegisterComponentType';

// import type { config as RegisterComponentType_config } from '../../src/state/RegisterComponentType';

import type { dataName as RegisterComponentType_dataName } from '../../src/state/RegisterComponentType';

import type { dataValue as ComponentContributeType_dataValue } from '../../src/contribute_points/scene_graph/ComponentContributeType';

import type { gameObjectContribute as GameObjectType_gameObjectContribute } from '../state/GameObjectType';

import type { gameObject as GameObjectType_gameObject } from '../state/GameObjectType';

import type { gameObject as GameObjectContributeType_gameObject } from '../../src/contribute_points/scene_graph/GameObjectContributeType';

import type { jobOrders as RegisterWorkPluginVOType_jobOrders } from '../../src/state/vo/RegisterWorkPluginVOType.gen';

import type { pipelineName as PipelineType_pipelineName } from '../../src/state/PipelineType.gen';

import type { pluginName as WorkPluginContributeType_pluginName } from '../../src/contribute_points/work/WorkPluginContributeType';

import type { state as RegisterComponentType_state } from '../../src/state/RegisterComponentType';

import type { state as StateType_state } from '../../src/state/StateType';

import type { usedComponentContribute as RegisterComponentType_usedComponentContribute } from '../../src/state/RegisterComponentType';

import type { workPluginContribute as WorkPluginManagerType_workPluginContribute } from '../../src/contribute_points/work/WorkPluginManagerType';

// tslint:disable-next-line:interface-over-type-literal
export type service = {
    readonly getIsDebug: (_1: StateType_state) => boolean;
    readonly setIsDebug: (_1: StateType_state, isDebug: boolean) => StateType_state;
    readonly prepare: () => void;
    readonly init: (_1: StateType_state) => StateType_state;
    readonly registerWorkPlugin: (
        state: StateType_state,
        contribute: WorkPluginManagerType_workPluginContribute,
        jobOrders?: RegisterWorkPluginVOType_jobOrders
    ) => StateType_state;
    readonly unregisterWorkPlugin: (_1: StateType_state, _2: WorkPluginContributeType_pluginName) => StateType_state;
    readonly registerComponent: <config>(_1: StateType_state, _2: config) => StateType_state;
    readonly unregisterComponent: (_1: StateType_state, _2: ComponentContributeType_componentName) => StateType_state;
    createAndSetComponentState: <config>(_1: StateType_state, _2: ComponentContributeType_componentName, _3: config) => StateType_state;
    readonly unsafeGetUsedComponentContribute: (_1: StateType_state, _2: ComponentContributeType_componentName) => RegisterComponentType_usedComponentContribute;
    readonly setUsedComponentContribute: (_1: StateType_state, _2: RegisterComponentType_usedComponentContribute, _3: ComponentContributeType_componentName) => StateType_state;
    readonly createComponent: <component>(_1: RegisterComponentType_usedComponentContribute) => [RegisterComponentType_usedComponentContribute, component];
    readonly setComponentData: (_1: RegisterComponentType_usedComponentContribute, _2: RegisterComponentType_component, _3: RegisterComponentType_dataName, _4: ComponentContributeType_dataValue) => RegisterComponentType_usedComponentContribute;
    readonly addComponent: (_1: RegisterComponentType_usedComponentContribute, _2: GameObjectContributeType_gameObject, _3: RegisterComponentType_component) => RegisterComponentType_usedComponentContribute;
    readonly hasComponent: (_1: RegisterComponentType_usedComponentContribute, _2: GameObjectContributeType_gameObject) => boolean;
    readonly getComponent: (_1: RegisterComponentType_usedComponentContribute, _2: GameObjectContributeType_gameObject) => (null | undefined | RegisterComponentType_component);
    readonly getAllComponents: (_1: RegisterComponentType_usedComponentContribute) => RegisterComponentType_component[];
    readonly getComponentData: (_1: RegisterComponentType_usedComponentContribute, _2: RegisterComponentType_component, _3: RegisterComponentType_dataName) => (null | undefined | ComponentContributeType_dataValue);
    readonly getComponentGameObjects: (_1: RegisterComponentType_usedComponentContribute, _2: RegisterComponentType_component) => GameObjectContributeType_gameObject[];
    readonly getComponentState: (_1: StateType_state, _2: ComponentContributeType_componentName) => (null | undefined | RegisterComponentType_state);
    readonly setGameObjectContribute: (_1: StateType_state, _2: GameObjectType_gameObjectContribute) => StateType_state;
    readonly createAndSetGameObjectState: (_1: StateType_state) => StateType_state;
    readonly createGameObject: <gameObject> (_1: StateType_state) => [StateType_state, gameObject];
    readonly getAllGameObjects: <gameObject> (_1: StateType_state) => gameObject[];
    readonly runPipeline: (_1: StateType_state, _2: Meta3dType_Index_state, _3: PipelineType_pipelineName) => Meta3dBsMostProtocol_StreamType_stream<StateType_state>
};

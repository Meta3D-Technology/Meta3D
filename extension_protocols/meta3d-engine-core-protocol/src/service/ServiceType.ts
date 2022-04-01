import type { state as Meta3dType_Index_state } from 'meta3d-type/src/Index';

import type { stream as Meta3dBsMostProtocol_StreamType_stream } from 'meta3d-bs-most-protocol/src/service/StreamType.gen';

// import type {batchDisposeData} from '../state/ComponentType';

// import type { componentContribute as RegisterComponentType_componentContribute } from '../../src/state/RegisterComponentType';

import { gameObject, config as gameObjectConfig } from "meta3d-gameobject-protocol"

import type { componentName as ComponentContributeType_componentName } from '../../src/contribute_points/scene_graph/ComponentContributeType';

// import type { component as RegisterComponentType_component } from '../../src/state/RegisterComponentType';

import type { dataName as ComponentContributeType_dataName } from '../../src/contribute_points/scene_graph/ComponentContributeType';

import type { gameObjectContribute as GameObjectType_gameObjectContribute } from '../state/GameObjectType';

// import type { gameObject as GameObjectType_gameObject } from '../state/GameObjectType';

import type { gameObject as GameObjectContributeType_gameObject, clonedGameObjects } from '../../src/contribute_points/scene_graph/GameObjectContributeType';

import type { jobOrders as RegisterWorkPluginVOType_jobOrders } from '../../src/state/vo/RegisterWorkPluginVOType';

import type { pipelineName as PipelineType_pipelineName } from '../../src/state/PipelineType';

// import type { workPluginContribute, workPluginName as WorkPluginContributeType_pluginName } from '../../src/contribute_points/work/WorkPluginContributeType';

import type { state as RegisterComponentType_state } from '../../src/state/RegisterComponentType';

import type { state as StateType_state } from '../../src/state/StateType';

import type { usedComponentContribute as RegisterComponentType_usedComponentContribute } from '../../src/state/RegisterComponentType';
import { workPluginContribute, workPluginName } from '../contribute_points/work/WorkPluginContributeType';
import { cloneConfig } from '../../../../defaults/meta3d-gameobject-protocol/src/Index';

// tslint:disable-next-line:interface-over-type-literal
export type service = {
    readonly getIsDebug: (_1: StateType_state) => boolean;
    readonly setIsDebug: (_1: StateType_state, isDebug: boolean) => StateType_state;
    readonly prepare: () => void;
    readonly init: (_1: StateType_state) => StateType_state;
    readonly registerWorkPlugin: <state, states>(
        state: StateType_state,
        contribute: workPluginContribute<state, states>,
        jobOrders?: RegisterWorkPluginVOType_jobOrders
    ) => StateType_state;
    readonly unregisterWorkPlugin: (_1: StateType_state, _2: workPluginName) => StateType_state;
    readonly registerComponent: <config>(_1: StateType_state, _2: config) => StateType_state;
    readonly unregisterComponent: (_1: StateType_state, _2: ComponentContributeType_componentName) => StateType_state;
    createAndSetComponentState: <config>(_1: StateType_state, _2: ComponentContributeType_componentName, _3: config) => StateType_state;
    readonly unsafeGetUsedComponentContribute: (_1: StateType_state, _2: ComponentContributeType_componentName) => RegisterComponentType_usedComponentContribute;
    readonly setUsedComponentContribute: (_1: StateType_state, _2: RegisterComponentType_usedComponentContribute, _3: ComponentContributeType_componentName) => StateType_state;
    readonly createComponent: <component>(_1: RegisterComponentType_usedComponentContribute) => [RegisterComponentType_usedComponentContribute, component];
    readonly setComponentData: <component, dataValue> (_1: RegisterComponentType_usedComponentContribute, _2: component, _3: ComponentContributeType_dataName, _4: dataValue) => RegisterComponentType_usedComponentContribute;
    readonly addComponent: <component> (_1: RegisterComponentType_usedComponentContribute, _2: GameObjectContributeType_gameObject, _3: component) => RegisterComponentType_usedComponentContribute;
    readonly removeComponent: <component> (_1: RegisterComponentType_usedComponentContribute, _2: GameObjectContributeType_gameObject, _3: component) => RegisterComponentType_usedComponentContribute;
    readonly hasComponent: (_1: RegisterComponentType_usedComponentContribute, _2: GameObjectContributeType_gameObject) => boolean;
    readonly getComponent: <component> (_1: RegisterComponentType_usedComponentContribute, _2: GameObjectContributeType_gameObject) => (null | undefined | component);
    readonly deferDisposeComponent: <component> (_1: RegisterComponentType_usedComponentContribute, _2: [component, GameObjectContributeType_gameObject]) => RegisterComponentType_usedComponentContribute;
    readonly disposeComponents: <component, batchDisposeData> (_1: RegisterComponentType_usedComponentContribute, _2: batchDisposeData) => RegisterComponentType_usedComponentContribute;
    readonly getAllComponents: <component> (_1: RegisterComponentType_usedComponentContribute) => component[];
    readonly getComponentData: <component, dataValue> (_1: RegisterComponentType_usedComponentContribute, _2: component, _3: ComponentContributeType_dataName) => (null | undefined | dataValue);
    readonly getComponentGameObjects: <component> (_1: RegisterComponentType_usedComponentContribute, _2: component) => GameObjectContributeType_gameObject[];
    readonly getComponentState: <componentState> (_1: StateType_state, _2: ComponentContributeType_componentName) => (null | undefined | componentState);
    readonly setGameObjectContribute: (_1: StateType_state, _2: GameObjectType_gameObjectContribute) => StateType_state;
    readonly createAndSetGameObjectState: (_1: StateType_state, _config: gameObjectConfig) => StateType_state;
    readonly createGameObject: (_1: StateType_state) => [StateType_state, gameObject];
    readonly deferDisposeGameObject: (_1: StateType_state, _2: gameObject[]) => StateType_state;
    readonly disposeGameObjects: (_1: StateType_state, _2: gameObject[]) => StateType_state;
    readonly cloneGameObject: (_1: StateType_state, _2: number, _3: cloneConfig, _4: gameObject) => [StateType_state, clonedGameObjects];
    readonly getAllGameObjects: (_1: StateType_state) => gameObject[];
    readonly runPipeline: (_1: StateType_state, _2: Meta3dType_Index_state, _3: PipelineType_pipelineName) => Meta3dBsMostProtocol_StreamType_stream<StateType_state>
    // readonly getStates: <states> (_1: StateType_state) => states,
    // readonly setStates: <states> (_1: StateType_state, _2: states) => StateType_state,
};

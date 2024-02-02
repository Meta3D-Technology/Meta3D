import type { state as Meta3dType_Index_state, extensionProtocolName } from 'meta3d-type/src/Index';

import type { stream as Meta3dBsMostProtocol_StreamType_stream } from 'meta3d-bs-most-protocol/src/service/StreamType';

import { gameObject, config as gameObjectConfig, name } from "meta3d-gameobject-protocol"

import type { componentName as ComponentContributeType_componentName } from '../contribute/scene_graph/ComponentContributeType';


import type { dataName as ComponentContributeType_dataName } from '../contribute/scene_graph/ComponentContributeType';

import type { gameObjectContribute as GameObjectType_gameObjectContribute } from '../state/GameObjectType';

// import type { gameObject as GameObjectType_gameObject } from '../state/GameObjectType';

import type { gameObject as GameObjectContributeType_gameObject, clonedGameObjects } from '../contribute/scene_graph/GameObjectContributeType';

import type { jobOrders as RegisterPipelineVOType_jobOrders } from '../state/vo/RegisterPipelineVOType';

import type { pipelineName as PipelineType_pipelineName } from '../state/PipelineType';


import type { usedComponentContribute as RegisterComponentType_usedComponentContribute, component } from '../state/RegisterComponentType';
import { pipelineContribute, pipelineName } from '../contribute/work/PipelineContributeType';
import { cloneConfig } from 'meta3d-gameobject-protocol/src/Index';
import { nullable } from 'meta3d-commonlib-ts/src/nullable';

// tslint:disable-next-line:interface-over-type-literal
export type service = {
    readonly getIsDebug: (_1: Meta3dType_Index_state) => boolean;
    readonly setIsDebug: (_1: Meta3dType_Index_state, isDebug: boolean) => Meta3dType_Index_state;
    readonly prepare: () => void;
    readonly init: (_1: Meta3dType_Index_state) => Meta3dType_Index_state;
    readonly registerPipeline: <config, state>(
        state: Meta3dType_Index_state,
        contribute: pipelineContribute<config, state>,
        config?: nullable<config>,
        jobOrders?: RegisterPipelineVOType_jobOrders
    ) => Meta3dType_Index_state;
    readonly unregisterPipeline: (_1: Meta3dType_Index_state, _2: pipelineName) => Meta3dType_Index_state;
    readonly registerComponent: <config>(_1: Meta3dType_Index_state, _2: config) => Meta3dType_Index_state;
    readonly unregisterComponent: (_1: Meta3dType_Index_state, _2: ComponentContributeType_componentName) => Meta3dType_Index_state;
    createAndSetComponentState: <config>(_1: Meta3dType_Index_state, _2: ComponentContributeType_componentName, _3: config) => Meta3dType_Index_state;
    readonly unsafeGetUsedComponentContribute: (_1: Meta3dType_Index_state, _2: ComponentContributeType_componentName) => RegisterComponentType_usedComponentContribute;
    readonly setUsedComponentContribute: (_1: Meta3dType_Index_state, _2: RegisterComponentType_usedComponentContribute, _3: ComponentContributeType_componentName) => Meta3dType_Index_state;
    readonly createComponent: <component>(_1: RegisterComponentType_usedComponentContribute) => [RegisterComponentType_usedComponentContribute, component];
    readonly setComponentData: <component, dataValue> (_1: RegisterComponentType_usedComponentContribute, _2: component, _3: ComponentContributeType_dataName, _4: dataValue) => RegisterComponentType_usedComponentContribute;
    readonly addComponent: <component> (_1: RegisterComponentType_usedComponentContribute, _2: GameObjectContributeType_gameObject, _3: component) => RegisterComponentType_usedComponentContribute;
    readonly removeComponent: <component> (_1: RegisterComponentType_usedComponentContribute, _2: GameObjectContributeType_gameObject, _3: component) => RegisterComponentType_usedComponentContribute;
    readonly hasComponent: (_1: RegisterComponentType_usedComponentContribute, _2: GameObjectContributeType_gameObject) => boolean;
    readonly getComponent: <component> (_1: RegisterComponentType_usedComponentContribute, _2: GameObjectContributeType_gameObject) => (null | undefined | component);
    readonly getNeedDisposedComponents: <needDisposedComponents> (_1: RegisterComponentType_usedComponentContribute) => needDisposedComponents;
    readonly deferDisposeComponent: <component> (_1: RegisterComponentType_usedComponentContribute, _2: [component, GameObjectContributeType_gameObject]) => RegisterComponentType_usedComponentContribute;
    readonly disposeComponents: <batchDisposeData> (_1: RegisterComponentType_usedComponentContribute, _2: batchDisposeData) => [RegisterComponentType_usedComponentContribute, Array<component>];
    readonly getAllComponents: <component> (_1: RegisterComponentType_usedComponentContribute) => component[];
    readonly getComponentData: <component, dataValue> (_1: RegisterComponentType_usedComponentContribute, _2: component, _3: ComponentContributeType_dataName) => nullable<dataValue>;
    readonly getComponentGameObjects: <component> (_1: RegisterComponentType_usedComponentContribute, _2: component) => GameObjectContributeType_gameObject[];
    readonly getComponentState: <componentState> (_1: Meta3dType_Index_state, _2: ComponentContributeType_componentName) => nullable<componentState>;
    readonly setGameObjectContribute: (_1: Meta3dType_Index_state, _2: GameObjectType_gameObjectContribute) => Meta3dType_Index_state;
    readonly createAndSetGameObjectState: (_1: Meta3dType_Index_state, _config: gameObjectConfig) => Meta3dType_Index_state;
    readonly createGameObject: (_1: Meta3dType_Index_state) => [Meta3dType_Index_state, gameObject];
    readonly getNeedDisposedGameObjects: (_1: Meta3dType_Index_state) => gameObject[];
    readonly deferDisposeGameObject: (_1: Meta3dType_Index_state, _2: gameObject) => Meta3dType_Index_state;
    readonly disposeGameObjects: (_1: Meta3dType_Index_state, _2: gameObject[]) => [Meta3dType_Index_state,
        [
            Array<gameObject>,
            Array<component>,
            Array<component>,
            Array<component>,
            Array<component>,
            Array<component>,
            Array<component>,
            Array<component>,
            Array<component>,
        ],
    ];
    readonly cloneGameObject: (_1: Meta3dType_Index_state, _2: number, _3: cloneConfig, _4: gameObject) => [Meta3dType_Index_state, clonedGameObjects];
    readonly getAllGameObjects: (_1: Meta3dType_Index_state) => gameObject[];
    readonly getGameObjectName: (_1: Meta3dType_Index_state, gameObject: gameObject) => nullable<name>,
    readonly setGameObjectName: (_1: Meta3dType_Index_state, gameObject: gameObject, name: name) => Meta3dType_Index_state,
    readonly runPipeline: (_1: Meta3dType_Index_state, _2: extensionProtocolName, _3: PipelineType_pipelineName) => Meta3dBsMostProtocol_StreamType_stream<Meta3dType_Index_state>
};

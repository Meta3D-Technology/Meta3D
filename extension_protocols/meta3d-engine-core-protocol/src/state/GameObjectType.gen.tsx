/* TypeScript file generated from GameObjectType.res by genType. */
/* eslint-disable import/first */


import type {createGameObjectFunc as GameObjectContributeType_createGameObjectFunc} from '../../src/contribute_points/scene_graph/GameObjectContributeType.gen';

import type {gameObjectContribute as GameObjectContributeType_gameObjectContribute} from '../../src/contribute_points/scene_graph/GameObjectContributeType.gen';

import type {getAllGameObjectsFunc as GameObjectContributeType_getAllGameObjectsFunc} from '../../src/contribute_points/scene_graph/GameObjectContributeType.gen';

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class state { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class gameObject { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type usedGameObjectData = {
  state: state; 
  readonly createGameObjectFunc: GameObjectContributeType_createGameObjectFunc<state,gameObject>; 
  readonly getAllGameObjectsFunc: GameObjectContributeType_getAllGameObjectsFunc<state,gameObject>
};

// tslint:disable-next-line:interface-over-type-literal
export type gameObjectContribute = GameObjectContributeType_gameObjectContribute<state,gameObject>;

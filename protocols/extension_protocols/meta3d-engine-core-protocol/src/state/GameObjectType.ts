/* TypeScript file generated from GameObjectType.res by genType. */
/* eslint-disable import/first */


import type {createGameObjectFunc as GameObjectContributeType_createGameObjectFunc} from '../contribute/scene_graph/GameObjectContributeType';

import type {gameObjectContribute as GameObjectContributeType_gameObjectContribute} from '../contribute/scene_graph/GameObjectContributeType';

import type {getAllGameObjectsFunc as GameObjectContributeType_getAllGameObjectsFunc} from '../contribute/scene_graph/GameObjectContributeType';

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class state { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class gameObject { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type usedGameObjectContribute = {
  state: state; 
  readonly createGameObjectFunc: GameObjectContributeType_createGameObjectFunc<state>; 
  readonly getAllGameObjectsFunc: GameObjectContributeType_getAllGameObjectsFunc<state>
};

// tslint:disable-next-line:interface-over-type-literal
export type gameObjectContribute = GameObjectContributeType_gameObjectContribute<state>;

/* TypeScript file generated from GameObjectType.res by genType. */
/* eslint-disable import/first */


import type {IGameObjectForJs_createGameObjectFunc as Meta3dEngineCoreType_IGameObjectForJs_createGameObjectFunc} from 'meta3d-engine-core-type/Meta3dEngineCoreType.gen';

import type {IGameObjectForJs_getAllGameObjectsFunc as Meta3dEngineCoreType_IGameObjectForJs_getAllGameObjectsFunc} from 'meta3d-engine-core-type/Meta3dEngineCoreType.gen';

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class state { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class gameObject { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type usedGameObjectData = {
  state: state; 
  readonly createGameObjectFunc: Meta3dEngineCoreType_IGameObjectForJs_createGameObjectFunc<state,gameObject>; 
  readonly getAllGameObjectsFunc: Meta3dEngineCoreType_IGameObjectForJs_getAllGameObjectsFunc<state,gameObject>
};

/* TypeScript file generated from RegisterComponentType.res by genType. */
/* eslint-disable import/first */


import type {IComponentForJs_addComponentFunc as Meta3dEngineCoreType_IComponentForJs_addComponentFunc} from 'meta3d-engine-core-type/Meta3dEngineCoreType.gen';

import type {IComponentForJs_componentName as Meta3dEngineCoreType_IComponentForJs_componentName} from 'meta3d-engine-core-type/Meta3dEngineCoreType.gen';

import type {IComponentForJs_createComponentFunc as Meta3dEngineCoreType_IComponentForJs_createComponentFunc} from 'meta3d-engine-core-type/Meta3dEngineCoreType.gen';

import type {IComponentForJs_getAllComponentsFunc as Meta3dEngineCoreType_IComponentForJs_getAllComponentsFunc} from 'meta3d-engine-core-type/Meta3dEngineCoreType.gen';

import type {IComponentForJs_getComponentDataFunc as Meta3dEngineCoreType_IComponentForJs_getComponentDataFunc} from 'meta3d-engine-core-type/Meta3dEngineCoreType.gen';

import type {IComponentForJs_getComponentFunc as Meta3dEngineCoreType_IComponentForJs_getComponentFunc} from 'meta3d-engine-core-type/Meta3dEngineCoreType.gen';

import type {IComponentForJs_getGameObjectsFunc as Meta3dEngineCoreType_IComponentForJs_getGameObjectsFunc} from 'meta3d-engine-core-type/Meta3dEngineCoreType.gen';

import type {IComponentForJs_hasComponentFunc as Meta3dEngineCoreType_IComponentForJs_hasComponentFunc} from 'meta3d-engine-core-type/Meta3dEngineCoreType.gen';

import type {IComponentForJs_setComponentDataFunc as Meta3dEngineCoreType_IComponentForJs_setComponentDataFunc} from 'meta3d-engine-core-type/Meta3dEngineCoreType.gen';

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class state { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class component { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class config { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class dataName { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type usedComponentData = {
  readonly componentName: Meta3dEngineCoreType_IComponentForJs_componentName; 
  state: state; 
  readonly createComponentFunc: Meta3dEngineCoreType_IComponentForJs_createComponentFunc<state,component>; 
  readonly getGameObjectsFunc: Meta3dEngineCoreType_IComponentForJs_getGameObjectsFunc<state,component>; 
  readonly addComponentFunc: Meta3dEngineCoreType_IComponentForJs_addComponentFunc<state,component>; 
  readonly hasComponentFunc: Meta3dEngineCoreType_IComponentForJs_hasComponentFunc<state>; 
  readonly getComponentFunc: Meta3dEngineCoreType_IComponentForJs_getComponentFunc<state,component>; 
  readonly getAllComponentsFunc: Meta3dEngineCoreType_IComponentForJs_getAllComponentsFunc<state,component>; 
  readonly getComponentDataFunc: Meta3dEngineCoreType_IComponentForJs_getComponentDataFunc<state,dataName,component>; 
  readonly setComponentDataFunc: Meta3dEngineCoreType_IComponentForJs_setComponentDataFunc<state,dataName,component>
};

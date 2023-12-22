/* TypeScript file generated from ComponentContributeType.res by genType. */
/* eslint-disable import/first */


import type { gameObject as GameObjectContributeType_gameObject } from './GameObjectContributeType';

// tslint:disable-next-line:interface-over-type-literal
export type componentName = string;

// tslint:disable-next-line:interface-over-type-literal
export type createStateFunc<state, config> = (_1: config) => state;

// tslint:disable-next-line:interface-over-type-literal
export type getGameObjectsFunc<state, component> = (_1: state, _2: component) => GameObjectContributeType_gameObject[];

// tslint:disable-next-line:interface-over-type-literal
export type createComponentFunc<state, component> = (_1: state) => [state, component];

// tslint:disable-next-line:interface-over-type-literal
export type addComponentFunc<state, component> = (_1: state, _2: GameObjectContributeType_gameObject, _3: component) => state;

// tslint:disable-next-line:interface-over-type-literal
export type hasComponentFunc<state> = (_1: state, _2: GameObjectContributeType_gameObject) => boolean;

// tslint:disable-next-line:interface-over-type-literal
export type getComponentFunc<state, component> = (_1: state, _2: GameObjectContributeType_gameObject) => (null | undefined | component);

// tslint:disable-next-line:interface-over-type-literal
export type getAllComponentsFunc<state, component> = (_1: state) => component[];

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class dataValue { protected opaque: any } /* simulate opaque types */

export type dataName = number

// tslint:disable-next-line:interface-over-type-literal
export type getComponentDataFunc<state, component> = (_1: state, _2: component, _3: dataName) => (null | undefined | dataValue);

// tslint:disable-next-line:interface-over-type-literal
export type setComponentDataFunc<state, component> = (_1: state, _2: component, _3: dataName, _4: dataValue) => state;

export type restore<state> = (_1: state, _2: state) => state;

export type deepCopy<state> = (_1: state) => state;

// tslint:disable-next-line:interface-over-type-literal
export type componentContribute<state, config, component> = {
  readonly componentName: componentName;
  readonly createStateFunc: createStateFunc<state, config>;
  readonly getGameObjectsFunc: getGameObjectsFunc<state, component>;
  readonly createComponentFunc: createComponentFunc<state, component>;
  readonly addComponentFunc: addComponentFunc<state, component>;
  readonly hasComponentFunc: hasComponentFunc<state>;
  readonly getComponentFunc: getComponentFunc<state, component>;
  readonly getComponentDataFunc: getComponentDataFunc<state, component>;
  readonly setComponentDataFunc: setComponentDataFunc<state, component>;
  readonly getAllComponentsFunc: getAllComponentsFunc<state, component>;
  readonly restore: restore<state>;
  readonly deepCopy: deepCopy<state>;
};

// tslint:disable-next-line:interface-over-type-literal
export type getComponentContribute<state, config, component> = () => componentContribute<state, config, component>;

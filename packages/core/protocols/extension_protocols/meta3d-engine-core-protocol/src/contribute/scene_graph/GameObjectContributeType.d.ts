import { gameObject as gameObjectType } from "meta3d-gameobject-protocol";

export type gameObject = gameObjectType

// tslint:disable-next-line:interface-over-type-literal
export type createStateFunc<state> = () => state;

// tslint:disable-next-line:interface-over-type-literal
export type createGameObjectFunc<state> = (_1: state) => [state, gameObject];

// tslint:disable-next-line:interface-over-type-literal
export type getAllGameObjectsFunc<state> = (_1: state) => gameObject[];

export type clonedGameObjects = Array<Array<gameObject>>

export type restore<state> = (_1: state, _2: state) => state;

export type deepCopy<state> = (_1: state) => state;

// export type cloneGameObjectFunc<state> = (_1: state) => gameObject[];

// tslint:disable-next-line:interface-over-type-literal
export type gameObjectContribute<state> = {
  readonly createStateFunc: createStateFunc<state>;
  readonly createGameObjectFunc: createGameObjectFunc<state>;
  readonly getAllGameObjectsFunc: getAllGameObjectsFunc<state>
  readonly restore: restore<state>;
  readonly deepCopy: deepCopy<state>;
};

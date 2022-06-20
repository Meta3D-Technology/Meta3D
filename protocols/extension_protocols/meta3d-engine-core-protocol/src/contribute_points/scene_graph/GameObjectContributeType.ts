import { gameObject as gameObjectType } from "meta3d-gameobject-protocol";

export type gameObject = gameObjectType

// tslint:disable-next-line:interface-over-type-literal
export type createStateFunc<state> = () => state;

// tslint:disable-next-line:interface-over-type-literal
export type createGameObjectFunc<state, gameObject> = (_1: state) => [state, gameObject];

// tslint:disable-next-line:interface-over-type-literal
export type getAllGameObjectsFunc<state, gameObject> = (_1: state) => gameObject[];

export type clonedGameObjects = Array<Array<gameObject>>

// export type cloneGameObjectFunc<state, gameObject> = (_1: state) => gameObject[];

// tslint:disable-next-line:interface-over-type-literal
export type gameObjectContribute<state, gameObject> = {
  readonly createStateFunc: createStateFunc<state>;
  readonly createGameObjectFunc: createGameObjectFunc<state, gameObject>;
  readonly getAllGameObjectsFunc: getAllGameObjectsFunc<state, gameObject>
};

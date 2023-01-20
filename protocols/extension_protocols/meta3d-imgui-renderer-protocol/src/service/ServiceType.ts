import type { state as StateType_state } from '../../src/state/StateType';
import type { webgl1Context, texture as webgl1Texture } from 'meta3d-webgl1-protocol/src/service/ServiceType';
import { strictNullable } from 'meta3d-commonlib-ts/src/nullable';


// tslint:disable-next-line:interface-over-type-literal
export type rect = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number
};

// tslint:disable-next-line:interface-over-type-literal
export type time = number;

// tslint:disable-next-line:interface-over-type-literal
export type clearColor = [number, number, number, number];

// tslint:disable-next-line:interface-over-type-literal
export type label = string;

// tslint:disable-next-line:interface-over-type-literal
export type size = [number, number];

// tslint:disable-next-line:interface-over-type-literal
export type pos = [number, number];

export type style = string

export type texture = webgl1Texture

export type context = webgl1Context

// tslint:disable-next-line:interface-over-type-literal
export type service = {
  readonly init: (_1: StateType_state, _2: boolean, _3: boolean, _4: HTMLCanvasElement) => Promise<StateType_state>;
  readonly render: () => void;
  readonly setStyle: (_1: StateType_state, _2: style) => StateType_state;
  readonly beforeExec: (_1: StateType_state, _2: time) => StateType_state;
  readonly afterExec: () => void;
  readonly clear: (_1: clearColor) => void;
  readonly beginWindow: (_1: label) => void;
  readonly endWindow: () => void;
  readonly setNextWindowRect: (_1: rect) => void;
  readonly addFBOTexture: (_1: strictNullable<texture>, _2: rect) => void;
  readonly button: (_1: label, _2: size) => boolean;
  readonly setCursorPos: (_1: pos) => void
  readonly getContext: () => context
};

import type { state as StateType_state } from '../../src/state/StateType';

// tslint:disable-next-line:interface-over-type-literal
export type time = number;

// tslint:disable-next-line:interface-over-type-literal
export type clearColor = [number, number, number, number];

// tslint:disable-next-line:interface-over-type-literal
export type label = string;

export type rect = {
    x: number,
    y: number,
    width: number,
    height: number,
}


// tslint:disable-next-line:interface-over-type-literal
export type service = {
    readonly init: (_1: StateType_state, _2: boolean, _3: HTMLCanvasElement) => Promise<StateType_state>;
    readonly render: (_1: StateType_state) => StateType_state;
    readonly beforeExec: (_1: StateType_state, _2: time) => StateType_state;
    readonly afterExec: (_1: StateType_state) => StateType_state;
    readonly clear: (_1: StateType_state, _2: clearColor) => void;
    readonly beginWindow: (_1: label, _2: StateType_state) => StateType_state;
    readonly endWindow: (_1: StateType_state) => StateType_state
    readonly setNextWindowRect: (_1: rect, _2: StateType_state) => StateType_state
};

export abstract class state { protected opaque!: any }; /* simulate opaque types */

export type ioData = {
    pointUp: boolean,
    pointDown: boolean,
    pointTap: boolean,
    pointPosition: [number, number],
    pointMovementDelta: [number, number],
};
export abstract class state { protected opaque!: any }; /* simulate opaque types */

export type ioData = { readonly isPointDown: boolean; readonly pointPosition: [number, number] };
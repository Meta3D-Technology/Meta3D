export abstract class state { protected opaque!: any }; /* simulate opaque types */

export type operateStatesFuncs = {
	getStatesFunc: <states> (_1: state) => states,
	setStatesFunc: <states> (_1: state, _2: states) => state,
}
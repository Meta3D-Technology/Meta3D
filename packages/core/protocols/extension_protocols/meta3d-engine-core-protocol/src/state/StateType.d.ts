import { state as meta3dState, extensionProtocolName, api } from "meta3d-type"

export abstract class state { protected opaque: any } /* simulate opaque types */

export type operateStatesFuncs = {
	api: api,
	getStatesFunc: <states> (_1: meta3dState) => states,
	setStatesFunc: <states> (_1: meta3dState, _2: states) => meta3dState,
	meta3dEngineCoreExtensionProtocolName: extensionProtocolName
}
import { state as meta3dState, api } from "meta3d-type"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { state as eventState } from "meta3d-event-protocol/src/state/StateType"
import { contributeType } from "meta3d-type/src/contribute/ContributeType"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"

let _invokeActionInit = (meta3dState: meta3dState, actionContributes: Array<actionContribute<any, any>>) => {
	let _func = (meta3dState: meta3dState, index: number): Promise<meta3dState> => {
		if (index >= actionContributes.length) {
			return Promise.resolve(meta3dState)
		}

		return actionContributes[index].init(meta3dState).then(meta3dState => {
			return _func(meta3dState, index + 1)
		})
	}

	return _func(meta3dState, 0)
}

export let prepareActions = (meta3dState: meta3dState, api: api): Promise<meta3dState> => {
	let { registerAction } = api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol")

	let eventState = api.getExtensionState<eventState>(meta3dState, "meta3d-event-protocol")


	let actionContributes = api.getAllContributesByType<actionContribute<any, any>>(meta3dState, contributeType.Action)

	eventState = actionContributes.reduce<eventState>((eventState, contribute) => {
		return registerAction(eventState, contribute)
	}, eventState)

	return _invokeActionInit(meta3dState, actionContributes).then(meta3dState => {
		meta3dState = api.setExtensionState(meta3dState, "meta3d-event-protocol", eventState)

		return meta3dState
	})
}
import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
import { state, func } from "meta3d-editor-run-engine-sceneview-protocol/src/state/StateType"
import { service } from "meta3d-editor-run-engine-sceneview-protocol/src/service/ServiceType"
import { addToLoopFuncs, removeFromLoopFuncs, prepareAndInitEngine, loopEngine } from "meta3d-editor-webgl1-three-run-engine-sceneview-utils/src/Main"
import { service as engineWholeService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { state as runEngineState } from "meta3d-editor-run-engine-sceneview-protocol/src/state/StateType"
import { List } from "immutable"
import { state as eventSourcingState, events } from "meta3d-event-sourcing-protocol/src/state/StateType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"

let _execLoopFuncs = (meta3dState: meta3dState, loopFuncs: Array<func>): Promise<meta3dState> => {
	if (loopFuncs.length == 0) {
		return new Promise((resolve) => {
			resolve(meta3dState)
		})
	}

	let func = loopFuncs.shift()

	return func(meta3dState).then(meta3dState => {
		return _execLoopFuncs(meta3dState, loopFuncs)
	})
}

let _isCurrentAllEventsNotContainPrevious = (currentAllEvents: events, previousAllEvents: events) => {
	let result = previousAllEvents.reduce((result, { name }, index) => {
		if (!result) {
			return result
		}

		if (name !== currentAllEvents.get(index).name) {
			return false
		}

		return result
	}, true)

	return result && currentAllEvents.count() < previousAllEvents.count()
}

let _getAddedEvents = (eventSourcingService: eventSourcingService, meta3dState, previousAllEvents:events) => {
	let currentAllEvents = eventSourcingService.getAllEvents(meta3dState)

	if (_isCurrentAllEventsNotContainPrevious(currentAllEvents, previousAllEvents)) {
		throw new Error("current all events should contain previous all events")
	}

	return currentAllEvents.slice(previousAllEvents.count())
}

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		prepareAndInitEngine: (meta3dState, gl, canvas, isDebug) => {
			return prepareAndInitEngine<engineWholeService>(meta3dState, api, gl, canvas, isDebug, "meta3d-engine-whole-sceneview-protocol").then(meta3dState => {
				return addToLoopFuncs<runEngineState>(meta3dState, api, {
					id: "default",
					func: (meta3dState: meta3dState) => {
						return loopEngine<engineWholeService>(meta3dState, api, "meta3d-engine-whole-sceneview-protocol")
					},
					onlyOnce: false
				})
			})
		},
		loopEngine: (meta3dState) => {
			let state = api.getExtensionState<state>(meta3dState, "meta3d-editor-run-engine-sceneview-protocol")

			return _execLoopFuncs(meta3dState, state.loopFuncs.map(({ func }) => func)).then(meta3dState => {
				return removeFromLoopFuncs<runEngineState>(meta3dState, (({ onlyOnce }) => !onlyOnce), api)
			})
		},
		sync: (meta3dState) => {
			let state = api.getExtensionState<state>(meta3dState, "meta3d-editor-run-engine-sceneview-protocol")

			let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

			let addedEvents = _getAddedEvents(
				eventSourcingService,
				meta3dState, state.currentAllEvents)

			return eventSourcingService.forwardView(meta3dState, addedEvents).then(meta3dState => {
				return api.setExtensionState<state>(meta3dState, "meta3d-editor-run-engine-sceneview-protocol", {
					...api.getExtensionState<state>(meta3dState, "meta3d-editor-run-engine-sceneview-protocol"),
					currentAllEvents: eventSourcingService.getAllEvents(meta3dState)
				})
			})
		}
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return {
		loopFuncs: [],
		currentAllEvents: List()
	}
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
		onDeepCopy: (meta3dState) => {
			let state = api.getExtensionState<state>(meta3dState, extensionProtocolName)

			return api.setExtensionState<state>(meta3dState, extensionProtocolName, {
				...state,
				loopFuncs: state.loopFuncs.slice()
			})
		}
	}
}

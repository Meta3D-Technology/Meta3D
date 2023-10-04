import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-event-sourcing-protocol/src/state/StateType"
import { service } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { List, Map } from "immutable"


let _getEventsKey = () => "meta3d-event-sourcing_events"

let _getOutsideImmutableDataKey = () => "meta3d-event-sourcing_outsideImmutableData"

let _buildForwardEventName = (eventName: string) => {
	return `${eventName}_forward`
}

let _buildBackwardEventName = (eventName: string) => {
	return `${eventName}_backward`
}

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		init: (meta3dState) => {
			globalThis[_getEventsKey()] = []
			globalThis[_getOutsideImmutableDataKey()] = {}

			return meta3dState
		},
		on: (meta3dState, eventName,
			priority,
			forwardHandleFunc,
			backwardHandleFunc
		) => {
			let eventService = api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol")


			// debugger

			meta3dState = eventService.onCustomGlobalEvent3(meta3dState,
				"meta3d-event-protocol",
				[
					_buildForwardEventName(eventName),
					priority,
					(meta3dState, customEvent) => {
						return forwardHandleFunc(meta3dState, ...customEvent.userData as any)
					}

				]
			)
			meta3dState = eventService.onCustomGlobalEvent3(meta3dState,
				"meta3d-event-protocol",
				[
					_buildBackwardEventName(eventName),
					priority,
					(meta3dState, customEvent) => {
						return backwardHandleFunc(meta3dState, ...customEvent.userData as any)
					}

				]
			)

			return meta3dState
		},
		addEvent: (meta3dState, eventData) => {
			let state = api.getExtensionState<state>(meta3dState, "meta3d-event-sourcing-protocol")

			state = {
				...state,
				events: state.events.push(eventData)
			}

			globalThis[_getEventsKey()] = state.events

			return api.setExtensionState(meta3dState, "meta3d-event-sourcing-protocol", state)
		},
		addOutsideImmutableData: (meta3dState, outsideImmutableDataId, outsideImmutableData) => {
			let state = api.getExtensionState<state>(meta3dState, "meta3d-event-sourcing-protocol")

			state = {
				...state,
				outsideImmutableData: state.outsideImmutableData.set(outsideImmutableDataId, outsideImmutableData)
			}

			globalThis[_getOutsideImmutableDataKey()] = state.outsideImmutableData

			return api.setExtensionState(meta3dState, "meta3d-event-sourcing-protocol", state)
		},
		removeOutsideImmutableData: (meta3dState, outsideImmutableDataId) => {
			let state = api.getExtensionState<state>(meta3dState, "meta3d-event-sourcing-protocol")

			state = {
				...state,
				outsideImmutableData: state.outsideImmutableData.remove(outsideImmutableDataId)
			}

			globalThis[_getOutsideImmutableDataKey()] = state.outsideImmutableData

			return api.setExtensionState(meta3dState, "meta3d-event-sourcing-protocol", state)
		},
		generateOutsideImmutableDataId: (meta3dState) => {
			return Math.floor(Math.random() * 100000000).toString()
		},
		getOutsideImmutableData: (meta3dState, outsideImmutableDataId) => {
			let state = api.getExtensionState<state>(meta3dState, "meta3d-event-sourcing-protocol")

			return getExn(state.outsideImmutableData.get(outsideImmutableDataId))
		},
		getAllOutsideImmutableData: (meta3dState) => {
			let state = api.getExtensionState<state>(meta3dState, "meta3d-event-sourcing-protocol")

			// return state.outsideImmutableData.entries()
			return state.outsideImmutableData.entrySeq()
		},
		getAllOutsideImmutableDataFromGlobalThis: () => {
			return globalThis[_getOutsideImmutableDataKey()].entrySeq()
		},
		getAllEvents: (meta3dState) => {
			let state = api.getExtensionState<state>(meta3dState, "meta3d-event-sourcing-protocol")

			return state.events as any
		},
		getAllEventsFromGlobalThis: () => {
			return globalThis[_getEventsKey()]
		},
		replaceAllEvents: (meta3dState, allEvents) => {
			let state = api.getExtensionState<state>(meta3dState, "meta3d-event-sourcing-protocol")

			state = {
				...state,
				events: allEvents
			}

			globalThis[_getEventsKey()] = state.events

			return api.setExtensionState(meta3dState, "meta3d-event-sourcing-protocol", state)
		},
		getNeedReplaceAllEvents: (meta3dState) => {
			let state = api.getExtensionState<state>(meta3dState, "meta3d-event-sourcing-protocol")

			return state.needReplaceAllEvents
		},
		setNeedReplaceAllEvents: (meta3dState, allEvents) => {
			let state = api.getExtensionState<state>(meta3dState, "meta3d-event-sourcing-protocol")

			state = {
				...state,
				needReplaceAllEvents: allEvents
			}

			return api.setExtensionState(meta3dState, "meta3d-event-sourcing-protocol", state)
		},
		getNeedBackwardEvents: (meta3dState) => {
			let state = api.getExtensionState<state>(meta3dState, "meta3d-event-sourcing-protocol")

			return state.needBackwardEvents
		},
		setNeedBackwardEvents: (meta3dState, events) => {
			let state = api.getExtensionState<state>(meta3dState, "meta3d-event-sourcing-protocol")

			state = {
				...state,
				needBackwardEvents: events
			}

			return api.setExtensionState(meta3dState, "meta3d-event-sourcing-protocol", state)
		},
		cleanAllNeedEvents: (meta3dState) => {
			let state = api.getExtensionState<state>(meta3dState, "meta3d-event-sourcing-protocol")

			state = {
				...state,
				needReplaceAllEvents: List(),
				needBackwardEvents: List()
			}

			return api.setExtensionState(meta3dState, "meta3d-event-sourcing-protocol", state)
		},
		forwardView: (meta3dState, events) => {
			let eventService = api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol")


			let _func = (meta3dState, index) => {
				if (index >= events.count()) {
					return Promise.resolve(meta3dState)
				}

				// debugger
				let { name, inputData } = getExn(events.get(index))

				return eventService.triggerCustomGlobalEvent3(meta3dState,
					"meta3d-event-protocol",
					eventService.createCustomEvent(_buildForwardEventName(name), inputData as any)
				).then(meta3dState => {
					return _func(meta3dState, index + 1)
				})
			}

			return _func(meta3dState, 0)
		},
		backwardView: (meta3dState, events) => {
			let eventService = api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol")

			let _func = (meta3dState, index) => {
				if (index < 0) {
					return Promise.resolve(meta3dState)
				}

				let { name, inputData } = getExn(events.get(index))

				return eventService.triggerCustomGlobalEvent3(meta3dState,
					"meta3d-event-protocol",
					eventService.createCustomEvent(_buildBackwardEventName(name), inputData as any)
				).then(meta3dState => {
					return _func(meta3dState, index - 1)
				})
			}

			return _func(meta3dState, events.count() - 1)
		}

	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return {
		events: List(),
		needReplaceAllEvents: List(),
		needBackwardEvents: List(),
		outsideImmutableData: Map()
	}
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
	}
}

import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { state } from "meta3d-bind-io-event-protocol/src/state/StateType"
import { service } from "meta3d-bind-io-event-protocol/src/service/ServiceType"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "meta3d-bind-io-event-protocol/src/service/DependentMapType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { customEvent, mouseEvent } from "meta3d-event-protocol/src/service/EventType.gen"

let _initIOData = () => {
	(window as any).ioData = {
		pointUp: false,
		pointDown: false,
		pointTap: false,
		pointPosition: [0, 0],
		pointMovementDelta: [0, 0]
	}
}

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionProtocolNameMap,
	dependentContributeProtocolNameMap,
	service
> = (api, [{ meta3dEventExtensionProtocolName }, _]) => {
	return {
		bindIOEvent: (meta3dState: meta3dState) => {
			let { onPointEvent, getPointDownEventName, getPointUpEventName, getPointTapEventName } = api.getExtensionService<eventService>(meta3dState, meta3dEventExtensionProtocolName)

			_initIOData()

			onPointEvent(meta3dEventExtensionProtocolName, [
				getPointDownEventName(),
				0,
				(customEventData: customEvent) => {
					let { locationInView } = customEventData.userData as unknown as mouseEvent

					(window as any).ioData = {
						...(window as any).ioData,
						pointUp: false,
						pointDown: true,
						pointTap: false,
						pointPosition: locationInView,
					}
				}
			])
			onPointEvent(meta3dEventExtensionProtocolName, [
				getPointUpEventName(),
				0,
				(customEventData: customEvent) => {
					let { locationInView } = customEventData.userData as unknown as mouseEvent

					(window as any).ioData = {
						...(window as any).ioData,
						pointUp: true,
						pointDown: false,
						pointTap: false,
						pointPosition: locationInView,
					}
				}
			])
			onPointEvent(meta3dEventExtensionProtocolName, [
				getPointTapEventName(),
				0,
				(customEventData: customEvent) => {
					let { locationInView } = customEventData.userData as unknown as mouseEvent

					(window as any).ioData = {
						...(window as any).ioData,
						pointUp: false,
						pointDown: false,
						pointTap: true,
						pointPosition: locationInView,
					}
				}
			])
		},
		getIOData: () => {
			return (window as any).ioData
		},
		resetIOData: () => {
			_initIOData()
		}
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionName) => {
	return {
	}
}

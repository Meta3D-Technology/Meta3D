import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-interact-protocol/src/state/StateType"
import { service } from "meta3d-interact-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { service as threeService } from "meta3d-three-protocol/src/service/ServiceType"
import { state as converterState } from "meta3d-scenegraph-converter-three-protocol/src/state/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"


export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		input: {
			point: {
				onPointEvent: (meta3dState, pointEventName, priority, handleFunc) => {
					let { onPointEvent } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return onPointEvent(meta3dState, "meta3d-event-protocol", [pointEventName, priority, handleFunc])
				},
				offPointEvent: (meta3dState, pointEventName, handleFunc) => {
					let { offPointEvent } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return offPointEvent(meta3dState, "meta3d-event-protocol", [pointEventName, handleFunc])
				},
				getPointDownEventName: (meta3dState) => {
					let { getPointDownEventName } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return getPointDownEventName()
				},
				getPointUpEventName: (meta3dState) => {
					let { getPointUpEventName } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return getPointUpEventName()
				},
				getPointTapEventName: (meta3dState) => {
					let { getPointTapEventName } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return getPointTapEventName()
				},
				getPointMoveEventName: (meta3dState) => {
					let { getPointMoveEventName } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return getPointMoveEventName()
				},
				getPointScaleEventName: (meta3dState) => {
					let { getPointScaleEventName } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return getPointScaleEventName()
				},
				getPointDragStartEventName: (meta3dState) => {
					let { getPointDragStartEventName } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return getPointDragStartEventName()
				},
				getPointDragOverEventName: (meta3dState) => {
					let { getPointDragOverEventName } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return getPointDragOverEventName()
				},
			}
		},
		picking: {
			setFromCurrentCamera: (meta3dState, [x, y]) => {
				let threeAPIService = getExn(api.getPackageService<threeService>(meta3dState, "meta3d-three-protocol")).api(meta3dState)

				let mousePos = new threeAPIService.Vector2(x, y)

				let { perspectiveCamera } = api.getExtensionState<converterState>(meta3dState,
					"meta3d-scenegraph-converter-three-protocol")

				let raycaster = new threeAPIService.Raycaster()

				raycaster.setFromCamera(mousePos, perspectiveCamera)

				return meta3dState
			},
			intersectScene: (meta3dState) => {
				let threeAPIService = getExn(api.getPackageService<threeService>(meta3dState, "meta3d-three-protocol")).api(meta3dState)

				let { scene } = api.getExtensionState<converterState>(meta3dState,
					"meta3d-scenegraph-converter-three-protocol")

				let raycaster = new threeAPIService.Raycaster()

				return raycaster.intersectObject(scene as any, true)
			},
		}
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = (meta3dState, api) => {
	return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
	}
}

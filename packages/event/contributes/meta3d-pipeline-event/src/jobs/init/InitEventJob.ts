import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-event-protocol/src/StateType"
import DeviceDetector from "device-detector-js";
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType";

let _getBrowserType = (eventService: eventService) => {
	let deviceDetector = new DeviceDetector()
	let device = deviceDetector.parse(navigator.userAgent)

	switch (device.device?.type) {
		case "desktop":
			if (device.client?.type == "browser") {
				if (device.client.name == "Firefox") {
					return eventService.getBrowserFirefoxType()
				}

				return eventService.getBrowserChromeType()
			}

			return eventService.getBrowserUnknownType()
		case "smartphone":
		case "feature phone":
			switch (device.os?.name) {
				case "Android":
					return eventService.getBrowserAndroidType()
				case "iOS":
					return eventService.getBrowserIOSType()
				default:
					return eventService.getBrowserUnknownType()
			}
		default:
			return eventService.getBrowserUnknownType()
	}
}

export let execFunc: execFuncType = (meta3dState, { getStatesFunc, api }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, eventService } = getState(states)

	return mostService.callFunc(() => {
		//console.log("init event job")

		meta3dState = eventService.setBody(meta3dState, "meta3d-event-protocol", document.body as HTMLBodyElement)
		meta3dState = eventService.setBrowser(meta3dState, "meta3d-event-protocol", _getBrowserType(eventService));
		meta3dState = eventService.setCanvas(meta3dState, "meta3d-event-protocol", document.querySelector("canvas") as HTMLCanvasElement)

		meta3dState = eventService.initEvent(meta3dState, "meta3d-event-protocol")

		return meta3dState
	})
}
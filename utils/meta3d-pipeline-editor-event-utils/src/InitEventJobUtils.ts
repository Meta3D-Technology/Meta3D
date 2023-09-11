import { bindEventForSceneView } from "meta3d-pipeline-utils/src/ArcballCameraControllerEventUtils"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"

export let initEvent = (meta3dState: meta3dState, eventService: eventService) => {
	meta3dState = eventService.setBody(meta3dState, "meta3d-event-protocol", document.body as HTMLBodyElement)
	meta3dState = eventService.setBrowser(meta3dState, "meta3d-event-protocol", eventService.getBrowserChromeType());
	meta3dState = eventService.setCanvas(meta3dState, "meta3d-event-protocol", document.querySelector("canvas") as HTMLCanvasElement)

	meta3dState = eventService.initEvent(meta3dState, "meta3d-event-protocol")


	bindEventForSceneView(eventService, "meta3d-event-protocol")

	return meta3dState

}
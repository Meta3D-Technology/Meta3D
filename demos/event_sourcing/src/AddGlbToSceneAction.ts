import { service as eventSourcingService } from "./EventSourcing"
import { getCurrentGlbId } from "./GetCurrentGlb"
import { add_glb_to_scene_event_inputData, add_glb_to_scene_event_outputData, eventName } from "./events"
import { meta3dState } from "./type"

export let service = {
    handler: (meta3dState) => {
        return new Promise<meta3dState>((resolve, reject) => {
            resolve(eventSourcingService.addEvent<add_glb_to_scene_event_inputData>(meta3dState, {
                name: eventName.add_glb_to_scene_event,
                inputData: [
                    getCurrentGlbId(meta3dState)
                ]
            }))
        })
    }
}





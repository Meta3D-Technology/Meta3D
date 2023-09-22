import { service as eventSourcingService } from "./EventSourcing"
import { getCurrentGlbId } from "./GetCurrentGlb"
import { add_glb_to_scene_event_inputData, add_glb_to_scene_event_outputData, eventName } from "./events"

export let service = {
    handler: (meta3dState) => {
        return eventSourcingService.addEventAndUpdateView<add_glb_to_scene_event_inputData, add_glb_to_scene_event_outputData>(meta3dState, {
            name: eventName.add_glb_to_scene_event,
            inputData: [
                getCurrentGlbId(meta3dState)
            ]
        })
    }
}





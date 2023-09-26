import { meta3dState } from "./type";

// export declare function createMeta3dState(): meta3dState
export let createMeta3dState = () => {
    return {
        eventManager: {
            eventData: {}
        },
        eventSourcing: {
            events: [],
            outsideData: {}
        }
    }
}
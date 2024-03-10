import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-webrender-protocol/src/StateType";
import { execEventHandle, getErrorEventName, getViewServiceForEngine } from "meta3d-script-utils/src/Main"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService } = getState(states)

    let { onCustomGlobalEvent3 } = api.nullable.getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

    meta3dState = onCustomGlobalEvent3(meta3dState, "meta3d-event-protocol", [
        getErrorEventName(),
        0,
        (meta3dState, customEvent) => {
            let [e, eventHandleName] = api.nullable.getExn(customEvent.userData) as any as [Error, string]

            throw e
        }
    ])

    return mostService.fromPromise(execEventHandle(meta3dState, api, "onInit", getViewServiceForEngine(meta3dState, api)))
}
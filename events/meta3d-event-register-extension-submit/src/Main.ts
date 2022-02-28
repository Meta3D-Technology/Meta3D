import { getEventContribute as getEventContributeMeta3d } from "meta3d-event-protocol/src/contribute_points/EventContributeType"
import { eventName, dependentExtensionNameMap, eventData } from "meta3d-event-register-extension-submit-protocol"
import { service as test1Service } from "wonder-extension-test1/src/Main"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { registerExtension } from "./Action"

export let getEventContribute: getEventContributeMeta3d<dependentExtensionNameMap, eventData> = (api, { meta3dUIExtensionName }) => {
    return {
        // TODO remove eventName? can get it from protocol directly!
        eventName: eventName,
        handler: (meta3dState, { extensionName, dependentExtensionNameMap, getExtensionServiceFunc, createExtensionStateFunc }) => {
            meta3dState = api.registerExtension(meta3dState, extensionName, getExtensionServiceFunc, dependentExtensionNameMap, createExtensionStateFunc())

            let { func1 } = api.getServiceExn<test1Service>(meta3dState, extensionName)

            func1()




            let { dispatch } = api.getServiceExn<uiService>(meta3dState, meta3dUIExtensionName)

            let uiState = api.getExtensionStateExn<uiState>(meta3dState, meta3dUIExtensionName)

            uiState = dispatch(uiState, registerExtension(extensionName))



            meta3dState = api.setExtensionState(meta3dState, meta3dUIExtensionName, uiState)


            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }
    }
}

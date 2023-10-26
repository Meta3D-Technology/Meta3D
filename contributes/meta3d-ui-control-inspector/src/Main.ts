import { getContribute as getContributeMeta3D, state as meta3dState } from "meta3d-type"
import { inputData, outputData, uiControlName, state } from "meta3d-ui-control-inspector-protocol"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import { getExn, getWithDefault, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { getActionState } from "meta3d-ui-utils/src/ElementStateUtils"
import { actionName as selectSceneTreeNodeActionName, state as selectSceneTreeNodeState } from "meta3d-action-select-scenetree-node-protocol"
import { actionName as setGameObjectNameActionName } from "meta3d-action-set-gameobjectname-protocol"
import { actionName as setLocalPositionActionName } from "meta3d-action-set-localposition-protocol"
import { actionName as setLocalEulerAngleActionName } from "meta3d-action-set-localeulerangle-protocol"
import { actionName as setLocalScaleActionName } from "meta3d-action-set-localscale-protocol"

export let getContribute: getContributeMeta3D<uiControlContribute<inputData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            {
                rect,
                label
            }
        ) => {
            let {
                selectedGameObject
            } = getActionState<selectSceneTreeNodeState>(meta3dState, api, selectSceneTreeNodeActionName)

            if (isNullable(selectedGameObject)) {
                return Promise.resolve([meta3dState, null])
            }

            let { inspector } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

            let { scene } = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")

            selectedGameObject = getExn(selectedGameObject)
            let transform = scene.gameObject.getTransform(meta3dState, selectedGameObject)

            let data = inspector(
                meta3dState,
                getWithDefault(scene.gameObject.getGameObjectName(meta3dState, selectedGameObject), ""),
                scene.transform.getLocalPosition(meta3dState, transform),
                scene.transform.getLocalEulerAngles(meta3dState, transform),
                scene.transform.getLocalScale(meta3dState, transform),
                "Inspector Window",
                rect
            )
            meta3dState = data[0]
            let [newGameObjectName, newLocalPosition, newLocalEulerAngle, newLocalScale] = data[1]


            let { trigger } = api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol")

            if (!isNullable(newGameObjectName)) {
                return trigger(meta3dState, "meta3d-event-protocol", setGameObjectNameActionName, [selectedGameObject, getExn(newGameObjectName)]).then(meta3dState => [meta3dState, null])
            }
            if (!isNullable(newLocalPosition)) {
                return trigger(meta3dState, "meta3d-event-protocol", setLocalPositionActionName, [selectedGameObject, getExn(newLocalPosition)]).then(meta3dState => [meta3dState, null])
            }
            if (!isNullable(newLocalEulerAngle)) {
                return trigger(meta3dState, "meta3d-event-protocol", setLocalEulerAngleActionName, [selectedGameObject, getExn(newLocalEulerAngle)]).then(meta3dState => [meta3dState, null])
            }
            if (!isNullable(newLocalScale)) {
                return trigger(meta3dState, "meta3d-event-protocol", setLocalScaleActionName, [selectedGameObject, getExn(newLocalScale)]).then(meta3dState => [meta3dState, null])
            }

            return Promise.resolve([meta3dState, null])
        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}

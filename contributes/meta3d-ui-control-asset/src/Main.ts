import { getContribute as getContributeMeta3D } from "meta3d-type"
import { inputData, outputData, uiControlName, state } from "meta3d-ui-control-asset-protocol"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import loadGlbImageSrc from "url-loader!./image/load.png"
import removeAssetImageSrc from "url-loader!./image/remove.png"
import glbImageSrc from "url-loader!./image/glb.png"
import { service as assetService } from "meta3d-asset-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { actionName as removeAssetActionName } from "meta3d-action-remove-asset-protocol"
import { actionName as loadGlbActionName } from "meta3d-action-load-glb-protocol"
import { actionName as selectAssetActionName } from "meta3d-action-select-asset-protocol"

export let getContribute: getContributeMeta3D<uiControlContribute<inputData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            {
                rect,
                label
            }
        ) => {
            let { asset, getUIControlState } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

            let { getAllGLBAssets } = api.getExtensionService<assetService>(meta3dState, "meta3d-asset-protocol")

            let { loadGlbTexture,
                removeAssetTexture,
                glbTexture
            } = getExn(getUIControlState<state>(api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol"), uiControlName))

            let data = asset(meta3dState, {
                loadGlbTexture,
                removeAssetTexture,
                glbTexture
            }, getAllGLBAssets(meta3dState).map(([glbId, glbName, _]: any) => [glbName, glbId]),
                label, rect)
            meta3dState = data[0]
            let [isRemoveAsset, isLoadGlb, selectedGlbId] = data[1]

            let { trigger } = api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol")

            if (isRemoveAsset) {
                return trigger(meta3dState, "meta3d-event-protocol", removeAssetActionName, null).then(meta3dState => [meta3dState, null])
            }
            if (isLoadGlb) {
                return trigger(meta3dState, "meta3d-event-protocol", loadGlbActionName, null).then(meta3dState => [meta3dState, null])
            }
            if (selectedGlbId != null) {
                return trigger(meta3dState, "meta3d-event-protocol", selectAssetActionName, selectedGlbId).then(meta3dState => [meta3dState, null])
            }

            return Promise.resolve([meta3dState, null])
        },
        init: (meta3dState) => {
            let { setUIControlState, loadImage } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

            return loadImage(meta3dState, loadGlbImageSrc).then((loadGlbTexture: any) => {
                return loadImage(meta3dState, removeAssetImageSrc).then((removeAssetTexture: any) => {
                    return loadImage(meta3dState, glbImageSrc).then((glbTexture: any) => {
                        let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

                        uiState = setUIControlState<state>(uiState, uiControlName, {
                            loadGlbTexture,
                            removeAssetTexture,
                            glbTexture
                        })

                        return api.setExtensionState(meta3dState, "meta3d-ui-protocol", uiState)
                    })
                })
            })
        }
    }
}

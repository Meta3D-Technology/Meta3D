import { getContribute as getContributeMeta3D } from "meta3d-type"
import { inputData, outputData, uiControlName } from "meta3d-ui-control-asset-protocol"
import { service } from "meta3d-ui-protocol/src/service/ServiceType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import loadGlbImageSrc from "url-loader!./image/add.png"
import glbImageSrc from "url-loader!./image/glb.png"
import { service as assetService } from "meta3d-asset-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<uiControlContribute<inputData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            {
                rect,
                label
            }
        ) => {
            let { asset, loadBase64Image } = api.getExtensionService<service>(meta3dState, "meta3d-ui-protocol")

            let { getAllGLBAssets } = api.getExtensionService<assetService>(meta3dState, "meta3d-asset-protocol")

            let loadGlbTexture = loadBase64Image(loadGlbImageSrc)
            let glbTexture = loadBase64Image(glbImageSrc)

            return new Promise((resolve, reject) => {
                resolve(asset(meta3dState, { loadGlbTexture, glbTexture },
                    getAllGLBAssets(meta3dState).map(([glbId, glbName, _]) => [glbName, glbId]),
                    label, rect))
            })
        }
    }
}

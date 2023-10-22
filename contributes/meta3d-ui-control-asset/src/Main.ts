import { getContribute as getContributeMeta3D } from "meta3d-type"
import { inputData, outputData, uiControlName } from "meta3d-ui-control-asset-protocol"
import { service } from "meta3d-ui-protocol/src/service/ServiceType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import loadGlbImageSrc from "url-loader!./image/load.png"
import removeAssetImageSrc from "url-loader!./image/remove.png"
import glbImageSrc from "url-loader!./image/glb.png"
import { service as assetService } from "meta3d-asset-protocol/src/service/ServiceType"

let _loadGlbTexture: any = null
let _removeAssetTexture: any = null
let _glbTexture: any = null

export let getContribute: getContributeMeta3D<uiControlContribute<inputData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            {
                rect,
                label
            }
        ) => {
            let { asset, loadImage } = api.getExtensionService<service>(meta3dState, "meta3d-ui-protocol")

            let { getAllGLBAssets } = api.getExtensionService<assetService>(meta3dState, "meta3d-asset-protocol")

            if (_loadGlbTexture !== null) {
                return new Promise((resolve, reject) => {
                    resolve(asset(meta3dState, { loadGlbTexture: _loadGlbTexture, removeAssetTexture: _removeAssetTexture, glbTexture: _glbTexture },
                        getAllGLBAssets(meta3dState).map(([glbId, glbName, _]) => [glbName, glbId]),
                        label, rect))
                })
            }

            return loadImage(meta3dState, loadGlbImageSrc).then((loadGlbTexture: any) => {
                return loadImage(meta3dState, removeAssetImageSrc).then((removeAssetTexture: any) => {
                    return loadImage(meta3dState, glbImageSrc).then((glbTexture: any) => {

                        _loadGlbTexture = loadGlbTexture
                        _removeAssetTexture = removeAssetTexture
                        _glbTexture = glbTexture

                        return [meta3dState, [false, false, null]]
                    })
                })
            })
        }
    }
}

import { getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-asset-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "GlbAssetInput",
        func: (meta3dState) => {
            let { getAllGLBAssets } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).asset(meta3dState)

            return Promise.resolve(getAllGLBAssets(meta3dState).map(([glbId, glbName, _]: any) => [glbName, glbId]))
        }
    }
}

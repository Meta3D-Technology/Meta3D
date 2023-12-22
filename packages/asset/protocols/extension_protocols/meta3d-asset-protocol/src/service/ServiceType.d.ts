import { loadGlb } from "meta3d-load-glb-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { outsideImmutableDataId } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { glb, glbName } from "../state/StateType"

type assetFile = ArrayBuffer

export type service = {
    loadGlb: loadGlb,
    addGLBAsset: (meta3dState: meta3dState, glb: glb, glbId: outsideImmutableDataId, glbName: glbName) => meta3dState,
    removeGLBAsset: (meta3dState: meta3dState, glbId: outsideImmutableDataId) => meta3dState,
    getAllGLBAssets: (meta3dState: meta3dState) => Array<[outsideImmutableDataId, glbName, glb]>
    exportAsset: (meta3dState: meta3dState) => assetFile,
    importAsset: (meta3dState: meta3dState, assetFile: assetFile) => meta3dState,

}

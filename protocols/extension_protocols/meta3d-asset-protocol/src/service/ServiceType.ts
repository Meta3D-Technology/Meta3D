import { state as meta3dState } from "meta3d-type"
import { outsideImmutableDataId } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { glb } from "../state/StateType"

type assetFile = ArrayBuffer

export type service = {
    addGLBAsset: (meta3dState: meta3dState, glb: glb, glbId: outsideImmutableDataId) => meta3dState,
    removeGLBAsset: (meta3dState: meta3dState, glbId: outsideImmutableDataId) => meta3dState,
    getAllGLBAssets: (meta3dState: meta3dState) => Array<[outsideImmutableDataId, glb]>
    exportAsset: (meta3dState: meta3dState) => assetFile,
    importAsset: (meta3dState: meta3dState, assetFile: assetFile) => meta3dState,
}

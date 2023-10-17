import { state as meta3dState } from "meta3d-type"
import type { GLTF } from "meta3d-load-scene-utils/src/three/GLTFLoader"
import { outsideImmutableDataId } from "meta3d-event-sourcing-protocol/src/service/ServiceType"

type assetFile = ArrayBuffer

export type service = {
    addGLBAsset: (meta3dState: meta3dState, gltf: GLTF, glbId: outsideImmutableDataId) => meta3dState,
    removeGLBAsset: (meta3dState: meta3dState, glbId: outsideImmutableDataId) => meta3dState,
    getAllGLBAssets: (meta3dState: meta3dState) => Array<[outsideImmutableDataId, GLTF]>
    exportAsset: (meta3dState: meta3dState) => assetFile,
    importAsset: (meta3dState: meta3dState, assetFile: assetFile) => meta3dState,
}

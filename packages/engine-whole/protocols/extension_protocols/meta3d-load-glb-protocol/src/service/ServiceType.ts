import { state as meta3dState } from "meta3d-type"
// import type { GLTF } from "meta3d-load-scene-utils/src/three/GLTFLoader"

type GLTF = any

export type service = {
    loadGlb: (meta3dState: meta3dState, glb: ArrayBuffer) => Promise<GLTF>
}

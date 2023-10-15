import type { List } from "immutable"
import { outsideImmutableDataId } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import type { GLTF } from "meta3d-load-scene-utils/src/three/GLTFLoader"

export type state = {
    allGLBAssets: List<[outsideImmutableDataId, GLTF]>
}
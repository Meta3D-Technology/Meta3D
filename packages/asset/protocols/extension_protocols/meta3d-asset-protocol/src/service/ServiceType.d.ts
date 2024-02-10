import { loadGlb } from "meta3d-load-glb-protocol/src/service/ServiceType"

type assetData = ArrayBuffer

export type service = {
    loadGlb: loadGlb,
    exportAsset: (data: [Uint8Array, Uint8Array, Uint8Array, Array<Uint8Array>]) => assetData,
    parseAsset: (assetData: assetData) => [Uint8Array, Uint8Array, Uint8Array, Array<Uint8Array>],
}

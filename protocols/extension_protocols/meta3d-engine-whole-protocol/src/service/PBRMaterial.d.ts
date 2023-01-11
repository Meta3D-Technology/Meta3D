import { state as meta3dState } from "meta3d-type"
import { componentName, pbrMaterial, diffuseColor, dataName } from "meta3d-component-pbrmaterial-protocol"

export type createPBRMaterial = (meta3dState: meta3dState) => [meta3dState, pbrMaterial]

export type setDiffuseColor = (meta3dState: meta3dState, pbrMaterial: pbrMaterial, diffuseColor: diffuseColor) => meta3dState

export type getAllPBRMaterials = (meta3dState: meta3dState) => pbrMaterial[]
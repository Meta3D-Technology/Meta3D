import { pbrMaterial as pbrMaterialType } from "meta3d-component-pbrmaterial-protocol-common"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

export const componentName = "PBRMaterial"

export type config = { readonly isDebug: boolean, readonly pbrMaterialCount: number }

export type state = {
  buffer: SharedArrayBuffer,
  config: config,
  gameObjectsMap: Array<Array<gameObject>>
}

export const dataName = {
  name: 0,
  diffuseColor: 1,
  roughness: 2,
  metalness: 3,
  specular: 4,
  specularColor: 5,
  transmission: 6,
  ior: 7,
  diffuseMap: 8,
  normalMap: 9,
  roughnessMap: 10,
  metalnessMap: 11,

}

export type pbrMaterial = pbrMaterialType

export type needDisposedComponents = Record<pbrMaterial, gameObject[]>

export type diffuseColor = [number, number, number]

export type specularColor = diffuseColor

export type specular = number
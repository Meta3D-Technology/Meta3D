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
  diffuseColor: 0,
  roughness: 1,
  metalness: 2,
  specular: 3,
  specularColor: 4,
  transmission:5,
  ior: 6,
  diffuseMap: 7,
  normalMap: 8,
  roughnessMap: 9,
  metalnessMap: 10,
}

export type pbrMaterial = pbrMaterialType

export type needDisposedComponents = Record<pbrMaterial, gameObject[]>

export type diffuseColor = [number, number, number]

export type specularColor = diffuseColor

export type specular = number
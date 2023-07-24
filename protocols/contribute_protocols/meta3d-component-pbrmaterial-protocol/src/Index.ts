import { pbrMaterial as pbrMaterialType } from "meta3d-component-pbrmaterial-protocol-common"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

export const componentName = "PBRMaterial"

export type config = { readonly isDebug: boolean, readonly pbrMaterialCount: number }

export type state = {
	buffer: SharedArrayBuffer,
	config: config
}

export const dataName = {
	diffuseColor: 0,
	specular: 1,
}

export type pbrMaterial = pbrMaterialType

export type needDisposedComponents = Record<pbrMaterial, gameObject[]>

export type diffuseColor = [number, number, number]

export type specular = number
import { pbrMaterial as pbrMaterialType } from "meta3d-component-pbrmaterial-common-protocol"

export const componentName = "PBRMaterialWorker"

export type config = {
	readonly isDebug: boolean; readonly pbrMaterialCount: number,
	buffer: SharedArrayBuffer
};

export const dataName = {
	diffuseColor: 0,
	specular: 1,
}

export type pbrMaterial = pbrMaterialType

export type diffuseColor = [number, number, number];

export type specular = number;
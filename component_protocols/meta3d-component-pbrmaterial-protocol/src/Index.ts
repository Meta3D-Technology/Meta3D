export const componentName = "PBRMaterial"

export type config = { readonly isDebug: boolean; readonly pbrMaterialCount: number };

export const dataName = {
	diffuseColor: 0,
	specular: 1,
}

export type pbrMaterial = number;

export type diffuseColor = [number, number, number];

export type specular = number;
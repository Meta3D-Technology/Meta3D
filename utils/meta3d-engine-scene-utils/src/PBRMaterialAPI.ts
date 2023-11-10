import { engineCoreService } from "meta3d-core-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { componentName, pbrMaterial, diffuseColor, specularColor, dataName, specular } from "meta3d-component-pbrmaterial-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"
import { texture } from "meta3d-texture-basicsource-protocol/src/state/StateType"

export function createPBRMaterial(meta3dState: meta3dState, { unsafeGetUsedComponentContribute,
	createComponent,
	setUsedComponentContribute,
}: engineCoreService): [meta3dState, pbrMaterial] {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	let data = createComponent<pbrMaterial>(contribute)
	contribute = data[0]
	let pbrMaterial = data[1]

	meta3dState =
		setUsedComponentContribute(meta3dState, contribute, componentName)

	return [
		meta3dState,
		pbrMaterial
	]
}

export let getName = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<string> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<pbrMaterial, string>(contribute, pbrMaterial, dataName.name)
}

export let setName = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, name: string): meta3dState => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


    contribute = setComponentData(contribute, pbrMaterial, dataName.name, name)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getDiffuseColor = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<diffuseColor> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentData<pbrMaterial, diffuseColor>(contribute, pbrMaterial, dataName.diffuseColor)
}

export let setDiffuseColor = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, diffuseColor: diffuseColor) => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.diffuseColor, diffuseColor)

	return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getSpecular = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<specular> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentData<pbrMaterial, specular>(contribute, pbrMaterial, dataName.specular)
}

export let setSpecular = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, specular: specular) => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.specular, specular)

	return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getSpecularColor = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<specularColor> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentData<pbrMaterial, specularColor>(contribute, pbrMaterial, dataName.specularColor)
}

export let setSpecularColor = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, specularColor: specularColor) => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.specularColor, specularColor)

	return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getRoughness = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<number> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentData<pbrMaterial, number>(contribute, pbrMaterial, dataName.roughness)
}

export let setRoughness = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, roughness: number) => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.roughness, roughness)

	return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getMetalness = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<number> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentData<pbrMaterial, number>(contribute, pbrMaterial, dataName.metalness)
}

export let setMetalness = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, metalness: number) => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.metalness, metalness)

	return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getTransmission = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<number> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentData<pbrMaterial, number>(contribute, pbrMaterial, dataName.transmission)
}

export let setTransmission = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, transmission: number) => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.transmission, transmission)

	return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getIOR = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<number> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentData<pbrMaterial, number>(contribute, pbrMaterial, dataName.ior)
}

export let setIOR = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, ior: number) => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.ior, ior)

	return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getDiffuseMap = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<texture> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentData<pbrMaterial, texture>(contribute, pbrMaterial, dataName.diffuseMap)
}

export let setDiffuseMap = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, diffuseMap: texture) => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.diffuseMap, diffuseMap)

	return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getRoughnessMap = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<texture> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentData<pbrMaterial, texture>(contribute, pbrMaterial, dataName.roughnessMap)
}

export let setRoughnessMap = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, roughnessMap: texture) => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.roughnessMap, roughnessMap)

	return setUsedComponentContribute(meta3dState, contribute, componentName)
}


export let getMetalnessMap = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<texture> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentData<pbrMaterial, texture>(contribute, pbrMaterial, dataName.metalnessMap)
}

export let setMetalnessMap = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, metalnessMap: texture) => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.metalnessMap, metalnessMap)

	return setUsedComponentContribute(meta3dState, contribute, componentName)
}


export let getNormalMap = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<texture> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentData<pbrMaterial, texture>(contribute, pbrMaterial, dataName.normalMap)
}

export let setNormalMap = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, normalMap: texture) => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.normalMap, normalMap)

	return setUsedComponentContribute(meta3dState, contribute, componentName)
}


// export let getAllPBRMaterials = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getAllComponents }: engineCoreService) => {
// 	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

// 	return getAllComponents<pbrMaterial>(contribute)
// }

export let getGameObjects = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentGameObjects }: engineCoreService, pbrMaterial: pbrMaterial): Array<gameObject> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentGameObjects<pbrMaterial>(contribute, pbrMaterial)
}
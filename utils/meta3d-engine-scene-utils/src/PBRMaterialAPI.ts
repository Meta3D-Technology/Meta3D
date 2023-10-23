import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { componentName, pbrMaterial, diffuseColor, specularColor, dataName, specular } from "meta3d-component-pbrmaterial-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"
import { texture } from "meta3d-texture-basicsource-protocol/src/state/StateType"

export function createPBRMaterial(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
	createComponent,
	setUsedComponentContribute,
}: engineCoreService): [engineCoreState, pbrMaterial] {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	let data = createComponent<pbrMaterial>(contribute)
	contribute = data[0]
	let pbrMaterial = data[1]

	engineCoreState =
		setUsedComponentContribute(engineCoreState, contribute, componentName)

	return [
		engineCoreState,
		pbrMaterial
	]
}

export let getName = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<string> => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<pbrMaterial, string>(contribute, pbrMaterial, dataName.name)
}

export let setName = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, name: string): engineCoreState => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


    contribute = setComponentData(contribute, pbrMaterial, dataName.name, name)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getDiffuseColor = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<diffuseColor> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentData<pbrMaterial, diffuseColor>(contribute, pbrMaterial, dataName.diffuseColor)
}

export let setDiffuseColor = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, diffuseColor: diffuseColor) => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.diffuseColor, diffuseColor)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getSpecular = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<specular> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentData<pbrMaterial, specular>(contribute, pbrMaterial, dataName.specular)
}

export let setSpecular = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, specular: specular) => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.specular, specular)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getSpecularColor = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<specularColor> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentData<pbrMaterial, specularColor>(contribute, pbrMaterial, dataName.specularColor)
}

export let setSpecularColor = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, specularColor: specularColor) => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.specularColor, specularColor)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getRoughness = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<number> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentData<pbrMaterial, number>(contribute, pbrMaterial, dataName.roughness)
}

export let setRoughness = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, roughness: number) => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.roughness, roughness)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getMetalness = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<number> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentData<pbrMaterial, number>(contribute, pbrMaterial, dataName.metalness)
}

export let setMetalness = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, metalness: number) => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.metalness, metalness)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getTransmission = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<number> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentData<pbrMaterial, number>(contribute, pbrMaterial, dataName.transmission)
}

export let setTransmission = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, transmission: number) => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.transmission, transmission)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getIOR = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<number> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentData<pbrMaterial, number>(contribute, pbrMaterial, dataName.ior)
}

export let setIOR = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, ior: number) => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.ior, ior)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getDiffuseMap = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<texture> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentData<pbrMaterial, texture>(contribute, pbrMaterial, dataName.diffuseMap)
}

export let setDiffuseMap = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, diffuseMap: texture) => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.diffuseMap, diffuseMap)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getRoughnessMap = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<texture> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentData<pbrMaterial, texture>(contribute, pbrMaterial, dataName.roughnessMap)
}

export let setRoughnessMap = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, roughnessMap: texture) => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.roughnessMap, roughnessMap)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}


export let getMetalnessMap = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<texture> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentData<pbrMaterial, texture>(contribute, pbrMaterial, dataName.metalnessMap)
}

export let setMetalnessMap = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, metalnessMap: texture) => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.metalnessMap, metalnessMap)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}


export let getNormalMap = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<texture> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentData<pbrMaterial, texture>(contribute, pbrMaterial, dataName.normalMap)
}

export let setNormalMap = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, normalMap: texture) => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.normalMap, normalMap)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}


export let getAllPBRMaterials = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getAllComponents }: engineCoreService) => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getAllComponents<pbrMaterial>(contribute)
}

export let getGameObjects = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentGameObjects }: engineCoreService, pbrMaterial: pbrMaterial): Array<gameObject> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentGameObjects<pbrMaterial>(contribute, pbrMaterial)
}
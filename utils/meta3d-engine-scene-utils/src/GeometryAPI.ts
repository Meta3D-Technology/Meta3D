import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { geometry, componentName, dataName, vertices, indices, normals, texCoords, tangents } from "meta3d-component-geometry-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

export function createGeometry(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
	createComponent,
	setUsedComponentContribute,
}: engineCoreService): [engineCoreState, geometry] {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	let data = createComponent<geometry>(contribute)
	contribute = data[0]
	let geometry = data[1]

	engineCoreState =
		setUsedComponentContribute(engineCoreState, contribute, componentName)

	return [
		engineCoreState,
		geometry
	]
}

export let getName = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, geometry: geometry): nullable<string> => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<geometry, string>(contribute, geometry, dataName.name)
}

export let setName = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, geometry: geometry, name: string): engineCoreState => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


    contribute = setComponentData(contribute, geometry, dataName.name, name)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getVertices = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, geometry: geometry): nullable<vertices> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentData<geometry, vertices>(contribute, geometry, dataName.vertices)
}

export function setVertices(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
	setComponentData,

	setUsedComponentContribute,
}: engineCoreService, geometry: geometry, vertices: Float32Array) {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, geometry, dataName.vertices, vertices)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getNormals = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, geometry: geometry): nullable<normals> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentData<geometry, normals>(contribute, geometry, dataName.normals)
}

export function setNormals(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
	setComponentData,

	setUsedComponentContribute,
}: engineCoreService, geometry: geometry, normals: Float32Array) {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, geometry, dataName.normals, normals)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}


export let getTexCoords = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, geometry: geometry): nullable<texCoords> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentData<geometry, texCoords>(contribute, geometry, dataName.texCoords)
}

export function setTexCoords(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
	setComponentData,

	setUsedComponentContribute,
}: engineCoreService, geometry: geometry, texCoords: Float32Array) {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, geometry, dataName.texCoords, texCoords)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getTangents = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, geometry: geometry): nullable<texCoords> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentData<geometry, tangents>(contribute, geometry, dataName.tangents)
}

export function setTangents(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
	setComponentData,

	setUsedComponentContribute,
}: engineCoreService, geometry: geometry, tangents: Float32Array) {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, geometry, dataName.tangents, tangents)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getIndices = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, geometry: geometry): nullable<indices> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentData<geometry, indices>(contribute, geometry, dataName.indices)
}

export function setIndices(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
	setComponentData,

	setUsedComponentContribute,
}: engineCoreService, geometry: geometry, indices: Uint32Array) {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, geometry, dataName.indices, indices)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getGameObjects = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentGameObjects }: engineCoreService, geometry: geometry): Array<gameObject> => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentGameObjects<geometry>(contribute, geometry)
}
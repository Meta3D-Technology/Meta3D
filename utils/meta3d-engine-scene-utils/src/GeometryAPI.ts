import { engineCoreService } from "meta3d-core-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { geometry, componentName, dataName, vertices, indices, normals, texCoords, tangents } from "meta3d-component-geometry-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

export function createGeometry(meta3dState: meta3dState, { unsafeGetUsedComponentContribute,
	createComponent,
	setUsedComponentContribute,
}: engineCoreService): [meta3dState, geometry] {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	let data = createComponent<geometry>(contribute)
	contribute = data[0]
	let geometry = data[1]

	meta3dState =
		setUsedComponentContribute(meta3dState, contribute, componentName)

	return [
		meta3dState,
		geometry
	]
}

export let getName = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, geometry: geometry): nullable<string> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<geometry, string>(contribute, geometry, dataName.name)
}

export let setName = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, geometry: geometry, name: string): meta3dState => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


    contribute = setComponentData(contribute, geometry, dataName.name, name)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getVertices = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, geometry: geometry): nullable<vertices> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentData<geometry, vertices>(contribute, geometry, dataName.vertices)
}

export function setVertices(meta3dState: meta3dState, { unsafeGetUsedComponentContribute,
	setComponentData,

	setUsedComponentContribute,
}: engineCoreService, geometry: geometry, vertices: Float32Array) {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


	contribute = setComponentData(contribute, geometry, dataName.vertices, vertices)

	return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getNormals = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, geometry: geometry): nullable<normals> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentData<geometry, normals>(contribute, geometry, dataName.normals)
}

export function setNormals(meta3dState: meta3dState, { unsafeGetUsedComponentContribute,
	setComponentData,

	setUsedComponentContribute,
}: engineCoreService, geometry: geometry, normals: Float32Array) {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


	contribute = setComponentData(contribute, geometry, dataName.normals, normals)

	return setUsedComponentContribute(meta3dState, contribute, componentName)
}


export let getTexCoords = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, geometry: geometry): nullable<texCoords> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentData<geometry, texCoords>(contribute, geometry, dataName.texCoords)
}

export function setTexCoords(meta3dState: meta3dState, { unsafeGetUsedComponentContribute,
	setComponentData,

	setUsedComponentContribute,
}: engineCoreService, geometry: geometry, texCoords: Float32Array) {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


	contribute = setComponentData(contribute, geometry, dataName.texCoords, texCoords)

	return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getTangents = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, geometry: geometry): nullable<texCoords> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentData<geometry, tangents>(contribute, geometry, dataName.tangents)
}

export function setTangents(meta3dState: meta3dState, { unsafeGetUsedComponentContribute,
	setComponentData,

	setUsedComponentContribute,
}: engineCoreService, geometry: geometry, tangents: Float32Array) {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


	contribute = setComponentData(contribute, geometry, dataName.tangents, tangents)

	return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getIndices = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, geometry: geometry): nullable<indices> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentData<geometry, indices>(contribute, geometry, dataName.indices)
}

export function setIndices(meta3dState: meta3dState, { unsafeGetUsedComponentContribute,
	setComponentData,

	setUsedComponentContribute,
}: engineCoreService, geometry: geometry, indices: Uint32Array) {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


	contribute = setComponentData(contribute, geometry, dataName.indices, indices)

	return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getGameObjects = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentGameObjects }: engineCoreService, geometry: geometry): Array<gameObject> => {
	let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

	return getComponentGameObjects<geometry>(contribute, geometry)
}
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { geometry, componentName, dataName } from "meta3d-component-geometry-protocol"

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

export function setVertices(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
	setComponentData,

	setUsedComponentContribute,
}: engineCoreService, geometry: geometry, vertices: Float32Array) {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, geometry, dataName.vertices, vertices)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export function setIndices(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
	setComponentData,

	setUsedComponentContribute,
}: engineCoreService, geometry: geometry, indices: Uint32Array) {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, geometry, dataName.indices, indices)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}
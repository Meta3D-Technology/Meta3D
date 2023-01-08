import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { geometry, componentName, dataName } from "meta3d-component-geometry-protocol"

export type createGeometry = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
	createComponent,
	setUsedComponentContribute,
}: engineCoreService) => [engineCoreState, geometry]

export type setVertices = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
	setComponentData,

	setUsedComponentContribute,
}: engineCoreService, geometry: geometry, vertices: Float32Array) => engineCoreState

export type setIndices = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
	setComponentData,

	setUsedComponentContribute,
}: engineCoreService, geometry: geometry, indices: Uint32Array) => engineCoreState
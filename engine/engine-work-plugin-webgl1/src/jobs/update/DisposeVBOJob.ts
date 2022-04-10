// import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
// import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
// import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
// import { getState, getVBO, setState } from "../Utils"
// import { states } from "engine-work-plugin-webgl1-protocol"
// import { geometry, componentName as geometryComponentName, needDisposedComponents as needDisposedGeometrys } from "meta3d-component-geometry-protocol"
// import { getDisposedGeometrys } from "meta3d-component-commonlib"

// export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
// 	let states = getStatesFunc<states>(engineCoreState)
// 	let { mostService, engineCoreService, immutableService } = getState(states)

// 	return mostService.callFunc(() => {
// 		console.log("dispose vbo job");

// 		let usedGeometryContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)

// 		let disposedGeometrys = getDisposedGeometrys(usedGeometryContribute, engineCoreService, engineCoreService.getNeedDisposedComponents(usedGeometryContribute))

// 		// TODO add disposed vbos to pool

// 		let states = getStatesFunc<states>(engineCoreState)

// 		let { verticesVBOMap, indicesVBOMap } = getVBO(states)

// 		let data = disposedGeometrys.reduce(([verticesVBOMap, indicesVBOMap], disposedGeometry) => {
// 			// TODO add and use immutableService.mapRemove
// 			// immutableService.mapSet(verticesVBOMap, disposedGeometry)
// 		}, [verticesVBOMap, indicesVBOMap])

// 	})
// }
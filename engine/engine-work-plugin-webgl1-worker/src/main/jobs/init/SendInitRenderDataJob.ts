import { execFunc as execFuncType } from "../../Type"
import { getState } from "../../Utils"
import { states } from "engine-work-plugin-webgl1-worker-main-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { componentName as transformComponentName, state as transformState } from "meta3d-component-transform-protocol"
import { componentName as geometryComponentName, geometry, state as geometryState } from "meta3d-component-geometry-protocol"
import { componentName as pbrMaterialComponentName, pbrMaterial, state as pbrMaterialState } from "meta3d-component-pbrmaterial-protocol"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, engineCoreService, worker, canvas, isDebug } = getState(states)

	return mostService.callFunc(() => {
		console.log("send init render data job webgl worker exec on main thread")

		let offscreenCanvas: OffscreenCanvas = canvas.transferControlToOffscreen()

		let usedGeometryContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)
		let allGeometryIndices = engineCoreService.getAllComponents<geometry>(usedGeometryContribute)
		let geometryState = getExn(engineCoreService.getComponentState<geometryState>(engineCoreState, geometryComponentName))

		let usedPBRMaterialContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)
		let allMaterialIndices = engineCoreService.getAllComponents<pbrMaterial>(usedPBRMaterialContribute)
		let pbrMaterialState = getExn(engineCoreService.getComponentState<pbrMaterialState>(engineCoreState, pbrMaterialComponentName))

		let transformState = getExn(engineCoreService.getComponentState<transformState>(engineCoreState, transformComponentName))

		getExn(worker).postMessage({
			operateType: "SEND_INIT_RENDER_DATA",
			canvas: offscreenCanvas,
			allGeometryIndices: allGeometryIndices,
			allMaterialIndices: allMaterialIndices,
			isDebug: isDebug,
			transformBuffer: transformState.buffer,
			geometryBuffer: geometryState.buffer,
			pbrMaterialBuffer: pbrMaterialState.buffer
		}, [offscreenCanvas])

		return engineCoreState
	})
}
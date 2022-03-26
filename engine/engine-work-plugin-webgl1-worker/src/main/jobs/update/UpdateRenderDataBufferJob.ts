import { execFunc as execFuncType } from "../../Type"
import { getState } from "../../Utils"
import { states } from "engine-work-plugin-webgl1-worker-main-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { gameObject } from "meta3d-gameobject-protocol"
import { componentName as pbrMaterialComponentName, pbrMaterial } from "meta3d-component-pbrmaterial-worker-protocol"
import { componentName as transformComponentName, transform } from "meta3d-component-transform-worker-protocol"
import { componentName as geometryComponentName, geometry } from "meta3d-component-geometry-worker-protocol"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, engineCoreService, typeArray } = getState(states)

	return mostService.callFunc(() => {
		console.log("update render data buffer job webgl worker exec on main thread")

		let allGameObjects = engineCoreService.getAllGameObjects<gameObject>(engineCoreState)

		let typeArr = getExn(typeArray)
		let renderGameObjectsCount = 0
		let typeArrayIndex: number = 0

		let usedPBRMaterialContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)
		let usedTransformContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)
		let usedGeometryContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)

		allGameObjects.forEach((gameObject) => {
			if (engineCoreService.hasComponent(usedPBRMaterialContribute, gameObject)) {
				let material = getExn(
					engineCoreService.getComponent<pbrMaterial>(usedPBRMaterialContribute, gameObject)
				)
				let transform = getExn(
					engineCoreService.getComponent<transform>(usedTransformContribute, gameObject)
				)
				let geometry = getExn(
					engineCoreService.getComponent<geometry>(usedGeometryContribute, gameObject)
				)

				typeArr[typeArrayIndex * 3] = geometry
				typeArr[typeArrayIndex * 3 + 1] = material
				typeArr[typeArrayIndex * 3 + 2] = transform

				renderGameObjectsCount++
				typeArrayIndex++
			}
		})

		return setStatesFunc<states>(
			engineCoreState,
			{
				...states,
				"engine-work-plugin-webgl1-worker-main": {
					...getState(states),
					renderGameObjectsCount: renderGameObjectsCount,
					typeArray: typeArray
				}
			}
		)
	})
}
import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-work-plugin-renderdatabuffer-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { gameObject } from "meta3d-gameobject-protocol"
import { pbrMaterial } from "meta3d-component-pbrmaterial-common-protocol"
import { transform } from "meta3d-component-transform-common-protocol"
import { geometry } from "meta3d-component-geometry-common-protocol"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, engineCoreService, renderDataBufferService, renderDataBufferTypeArray, transformData, geometryData, materialData } = getState(states)

	return mostService.callFunc(() => {
		console.log("update render data buffer job")

		let allGameObjects = engineCoreService.getAllGameObjects(engineCoreState)

		let typeArr = getExn(renderDataBufferTypeArray)

		let usedPBRMaterialContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, materialData.componentName)
		let usedTransformContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, transformData.componentName)
		let usedGeometryContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryData.componentName)

		let [renderGameObjectsCount, _] = allGameObjects.reduce(([renderGameObjectsCount, typeArrayIndex], gameObject) => {
			if (engineCoreService.hasComponent(usedPBRMaterialContribute, gameObject)) {
				renderDataBufferService.setRenderComponents(typeArr, typeArrayIndex, {
					transform: getExn(
						engineCoreService.getComponent<transform>(usedTransformContribute, gameObject)
					),
					material: getExn(
						engineCoreService.getComponent<pbrMaterial>(usedPBRMaterialContribute, gameObject)
					),
					geometry: getExn(
						engineCoreService.getComponent<geometry>(usedGeometryContribute, gameObject)
					)
				})

				return [
					renderGameObjectsCount + 1,
					typeArrayIndex + 1
				]
			}

			return [
				renderGameObjectsCount,
				typeArrayIndex
			]
		}, [0, 0])

		return setStatesFunc<states>(
			engineCoreState,
			setState(states,
				{
					...getState(states),
					renderGameObjectsCount: renderGameObjectsCount,
					renderDataBufferTypeArray: typeArr
				}
			)
		)
	})
}
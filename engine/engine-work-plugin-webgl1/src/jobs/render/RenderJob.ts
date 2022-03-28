import { getRenderData, render } from "engine-work-plugin-webgl1-utils/src/utils/RenderUtils"
import { execFunc as execFuncType } from "../../Type"
import { getGL, getMaterial, getState, getVBO } from "../Utils"
import { states } from "engine-work-plugin-webgl1-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { componentName as pbrMaterialComponentName, pbrMaterial } from "meta3d-component-pbrmaterial-protocol"
import { componentName as transformComponentName, transform, localToWorldMatrix, dataName as transformDataName } from "meta3d-component-transform-protocol"
import { componentName as geometryComponentName, dataName as geometryDataName, geometry, indicesCount } from "meta3d-component-geometry-protocol"
import { gameObject } from "meta3d-gameobject-protocol"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service, engineCoreService, immutableService } = getState(states)

	return mostService.callFunc(() => {
		console.log("render job");

		let allGameObjects = engineCoreService.getAllGameObjects<gameObject>(engineCoreState)

		let { verticesVBOMap, indicesVBOMap } = getVBO(states)
		let programMap = getMaterial(states).programMap

		let usedPBRMaterialContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)
		let usedTransformContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)
		let usedGeometryContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)

		allGameObjects.forEach(gameObject => {
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

				let count = getExn(engineCoreService.getComponentData<geometry, indicesCount>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName), geometry, geometryDataName.indicesCount));
				let modelMatrix = getExn(engineCoreService.getComponentData<transform, localToWorldMatrix>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, transformComponentName), transform, transformDataName.localToWorldMatrix));

				let [{ verticesBuffer, indicesBuffer }, program] = getRenderData(immutableService, material, geometry, verticesVBOMap, indicesVBOMap, programMap)

				render(webgl1Service, getGL(states), verticesBuffer, indicesBuffer, program, modelMatrix, count)
			}
		})

		return engineCoreState
	})
}
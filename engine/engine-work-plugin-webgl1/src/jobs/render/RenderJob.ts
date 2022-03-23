import { getRenderData, render } from "engine-work-plugin-webgl1-utils/src/utils/RenderUtils";
import { execFunc as execFuncType } from "../../Type"
import { getState } from "../Utils"
import { states } from "engine-work-plugin-webgl1-protocol"
// import { sendCameraData, getCameraView, getCameraProjection } from "engine-work-plugin-webgl1-utils/src/utils/SendCameraDataUtils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
// import { componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
// import { componentName as transformComponentName } from "meta3d-component-transform-protocol"
// import { getViewWorldToCameraMatrix } from "meta3d-component-commonlib"
// import { componentName as perspectiveCameraProjectionComponentName, perspectiveCameraProjection, pMatrix, dataName } from "meta3d-component-perspectivecameraprojection-protocol";
import { componentName as pbrMaterialComponentName, pbrMaterial } from "meta3d-component-pbrmaterial-protocol";
import { componentName as transformComponentName, transform } from "meta3d-component-transform-protocol";
import { componentName as geometryComponentName, geometry } from "meta3d-component-geometry-protocol";
import { gameObject } from "meta3d-gameobject-protocol";

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service, engineCoreService, gl, vbo, material } = getState(states)

	return mostService.callFunc(() => {
		// gl = getExn(gl);

		let allGameObjects = engineCoreService.getAllGameObjects<gameObject>(engineCoreState)

		let { verticesVBOMap, indicesVBOMap } = vbo;
		let programMap = material.programMap;

		let usedPBRMaterialContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)
		let usedTransformContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)
		let usedGeometryContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)

		allGameObjects.forEach(gameObject => {
			if (engineCoreService.hasComponent(usedPBRMaterialContribute, gameObject)) {
				let material = getExn(
					engineCoreService.getComponent<pbrMaterial>(usedPBRMaterialContribute, gameObject)
				);
				let transform = getExn(
					engineCoreService.getComponent<transform>(usedTransformContribute, gameObject)
				);
				let geometry = getExn(
					engineCoreService.getComponent<geometry>(usedGeometryContribute, gameObject)
				);

				let [{ verticesBuffer, indicesBuffer }, count, program, modelMatrix] = getRenderData(engineCoreState, engineCoreService, material, geometry, transform, verticesVBOMap, indicesVBOMap, programMap);

				render(webgl1Service, getExn(gl), verticesBuffer, indicesBuffer, program, modelMatrix, count);
			}
		});

		return engineCoreState;
	})
}
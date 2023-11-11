import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-sceneviewrender-protocol/src/StateType"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { service as renderService } from "meta3d-editor-sceneview-render-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, converterService } = getState(states)

	return mostService.callFunc(() => {
		return api.setExtensionState(meta3dState,
			"meta3d-scenegraph-converter-three-protocol",
			converterService.convert(
				meta3dState => {
					let arcballCameraControllerGameObject = getExn(getExn(api.getPackageService<renderService>(meta3dState, "meta3d-editor-sceneview-render-protocol")).getArcballCameraControllerGameObject(meta3dState))

					return getExn(
						api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol")
					).gameObject.getAllGameObjects(meta3dState).filter(gameObject => {
						return gameObject != arcballCameraControllerGameObject
					})
				},
				meta3dState)
		)
	})
}
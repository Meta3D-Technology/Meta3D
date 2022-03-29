import { range } from "lodash"
import { execFunc as execFuncType } from "../../Type"
import { setState, getState } from "../../Utils"
import { states, renderDataBufferTypeArray } from "engine-work-plugin-webgl1-worker-render-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

function _getAllRenderComponents(renderGameObjectsCount: number, renderDataBufferTypeArray: renderDataBufferTypeArray) {
	return range(0, renderGameObjectsCount).map(renderGameObjectIndex => {
		return {
			transform: renderDataBufferTypeArray[renderGameObjectIndex * 3 + 2],
			material: renderDataBufferTypeArray[renderGameObjectIndex * 3 + 1],
			geometry: renderDataBufferTypeArray[renderGameObjectIndex * 3]
		}

	})
}

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, renderDataBufferTypeArray, renderGameObjectsCount } = getState(states)

	return mostService.callFunc(() => {
		console.log("prepare render data job");

		return setStatesFunc<states>(
			engineCoreState,
			setState(states, {
				...getState(states),
				allRenderComponents: _getAllRenderComponents(renderGameObjectsCount, getExn(renderDataBufferTypeArray))
			})
		)
	})
}
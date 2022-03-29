import { range } from "lodash"
import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { setState, getState } from "../../Utils"
import { states, renderDataBufferTypeArray } from "engine-work-plugin-webgl1-worker-render-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { service as renderDataBufferService } from "meta3d-renderdatabuffer-protocol/src/service/ServiceType"

function _getAllRenderComponents(renderDataBufferService: renderDataBufferService, renderGameObjectsCount: number, renderDataBufferTypeArray: renderDataBufferTypeArray) {
	return range(0, renderGameObjectsCount).map(index => {
		return renderDataBufferService.getRenderComponents(renderDataBufferTypeArray, index)
	})
}

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, renderDataBufferService, renderGameObjectsCount, renderDataBufferTypeArray } = getState(states)

	return mostService.callFunc(() => {
		console.log("prepare render data job")

		return setStatesFunc<states>(
			engineCoreState,
			setState(states, {
				...getState(states),
				allRenderComponents: _getAllRenderComponents(renderDataBufferService, renderGameObjectsCount, getExn(renderDataBufferTypeArray))
			})
		)
	})
}
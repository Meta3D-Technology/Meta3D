import { execFunc as execFuncType } from "../../Type"
import { getState } from "../../Utils"
import { states } from "engine-work-plugin-webgl1-worker-render-protocol"
import { createGetMainWorkerDataStream } from "meta3d-commonlib-ts/src/CreateWorkerDataStreamService"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService } = getState(states)

	let viewMatrix: Float32Array
	let pMatrix: Float32Array
	let typeArray: Uint32Array
	let renderGameObjectsCount: number

	return createGetMainWorkerDataStream(
		mostService,
		(event: MessageEvent) => {
			viewMatrix = event.data.camera.viewMatrix
			pMatrix = event.data.camera.pMatrix
			typeArray = event.data.renderDataBuffer.typeArray
			renderGameObjectsCount = event.data.renderDataBuffer.renderGameObjectsCount
		},
		"SEND_RENDER_DATA",
		self as any as Worker
	).map(() => {
		console.log("get init render data job webgl worker exec on worker thread")

		return setStatesFunc<states>(
			engineCoreState,
			{
				...states,
				"engine-work-plugin-webgl1-worker-render": {
					...getState(states),
					viewMatrix: viewMatrix,
					pMatrix: pMatrix,
					renderDataBufferTypeArray: typeArray,
					renderGameObjectsCount: renderGameObjectsCount
				}
			}
		)
	})
}
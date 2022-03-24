import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"

export function createGL({ getContext }: webgl1Service, canvas: HTMLCanvasElement) {
	return getContext(canvas)
}
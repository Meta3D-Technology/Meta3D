import { state as meta3dState } from "meta3d-type"

export type func = (meta3dState: meta3dState) => Promise<meta3dState>

export type loopFuncData = {
	id: string,
	func: func,
	onlyOnce: boolean
}

export type state = {
	loopFuncs: Array<loopFuncData>
}
import * as ServceType from "meta3d-editor-run-engine-protocol/src/service/ServiceType"
import { Merge } from "meta3d-commonlib-ts/src/type"
import { state as meta3dState } from "meta3d-type"

export type service = Merge<ServceType.service, {
	loopEngineWhenStop: (meta3dState: meta3dState) => Promise<meta3dState>
}>

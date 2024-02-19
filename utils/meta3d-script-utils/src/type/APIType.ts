import { state as meta3dState, immutableAPI, nullableAPI } from "meta3d-type";
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"

export type api = {
    getEngineSceneService: (meta3dState: meta3dState) => engineSceneService,
    nullable: nullableAPI;
    immutable: immutableAPI;
};

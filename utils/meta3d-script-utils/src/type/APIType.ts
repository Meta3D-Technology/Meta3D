import { state as meta3dState, immutableAPI, nullableAPI } from "meta3d-type";
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { service as interactService } from "meta3d-interact-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { viewRect } from "meta3d-editor-gameview-render-protocol/src/state/StateType";
import type { Object3D } from "three";

export type viewService = {
    getViewRect: (meta3dState: meta3dState) => nullable<viewRect>,
    setSelectedObjects: (meta3dState: meta3dState, selectedObjects: Array<Object3D>) => meta3dState,
}

export type api = {
    getEngineSceneService: (meta3dState: meta3dState) => engineSceneService,
    getEventService: (meta3dState: meta3dState) => eventService,
    getInteractService: (meta3dState: meta3dState) => interactService,

    view: viewService,

    nullable: nullableAPI;
    immutable: immutableAPI;
};

// import { state as meta3dState } from "meta3d-type"
// import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
// import type { List } from 'immutable';
import { eventData } from "meta3d-event-sourcing-protocol/src/service/ServiceType";

// export function getSingleEventAllEvents(editorWholeService: editorWholeService, meta3dState: meta3dState, sceneGLB: ArrayBuffer): List<eventData<Array<ArrayBuffer>>>
export function getSingleEventAllEvents(sceneGLB: ArrayBuffer): Array<eventData<Array<ArrayBuffer>>>
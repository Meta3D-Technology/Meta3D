import { state as meta3dState } from "meta3d-type"
import { service as jszipService_ } from "meta3d-jszip-protocol/src/service/ServiceType"
import { service as filesaveService_ } from "meta3d-filesaver-protocol/src/service/ServiceType"

export type service = {
    jszip: (meta3dState: meta3dState) => jszipService_,
    filesave: (meta3dState: meta3dState) => filesaveService_,

}

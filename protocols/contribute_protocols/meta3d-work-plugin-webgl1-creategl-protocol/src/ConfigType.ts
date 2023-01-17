import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { webgl1Context } from "meta3d-webgl1-protocol/src/service/ServiceType";

export type config = {
    canvas: nullable<HTMLCanvasElement>,
    gl: nullable<webgl1Context>,
}
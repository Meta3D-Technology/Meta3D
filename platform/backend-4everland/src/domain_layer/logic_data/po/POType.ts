import { S3 } from "@aws-sdk/client-s3";
import { nullable } from "meta3d-commonlib-ts/src/nullable";

export type po = {
    s3: nullable<S3>
}
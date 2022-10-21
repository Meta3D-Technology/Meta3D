import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import * as POContainer from "../logic_data/container/POContainer";

export let getBackend = () => getExn(POContainer.getPO().s3)

export let setBackend = (s3) => POContainer.setPO({
    ...POContainer.getPO(),
    s3: s3
});
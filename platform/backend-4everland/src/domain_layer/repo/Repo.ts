import { getExn } from "backend-abstract/src/utils/NullableUtils";
import * as POContainer from "../logic_data/container/POContainer";

export let getBackend = () => getExn(POContainer.getPO().s3)

export let setBackend = (s3) => POContainer.setPO({
    ...POContainer.getPO(),
    s3: s3
});
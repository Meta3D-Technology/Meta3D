import { getExn } from "backend-abstract/src/utils/NullableUtils";
import * as POContainer from "../logic_data/container/POContainer";

export let getBackend = () => getExn(POContainer.getPO().app)

export let setBackend = (app) => POContainer.setPO({
    ...POContainer.getPO(),
    app: app
});
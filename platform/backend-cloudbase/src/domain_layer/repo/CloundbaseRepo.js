import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import * as POContainer from "../logic_data/container/POContainer";
export let getEditor = () => getExn(POContainer.getCloundbase().app);
export let setEditor = (app) => POContainer.setCloundbase(Object.assign(Object.assign({}, POContainer.getCloundbase()), { app: app }));

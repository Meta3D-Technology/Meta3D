import { bind, getExn, isNullable, map, return_, getEmpty } from "meta3d-commonlib-ts/src/NullableUtils";
import { api } from "meta3d-type";

export let buildAPI = (

): api => {
    return {
        nullable: {
            isNullable: isNullable,
            map: map,
            bind: bind,
            getExn: getExn,
            return: return_,
            getEmpty: getEmpty
        }
    } as any
}
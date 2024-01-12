import { bind, getExn, isNullable, map, return_, getEmpty } from "meta3d-commonlib-ts/src/NullableUtils";
export let buildAPI = () => {
    return {
        nullable: {
            isNullable: isNullable,
            map: map,
            bind: bind,
            getExn: getExn,
            return: return_,
            getEmpty: getEmpty
        }
    };
};
//# sourceMappingURL=APITool.js.map
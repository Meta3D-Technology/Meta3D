import { setValueToObject } from "meta3d-structure-utils/src/ObjectUtils"
import { forEach, isNullable, map, getWithDefault, getExn, getEmpty, return_, bind } from "meta3d-commonlib-ts/src/NullableUtils"

export let setExtension = (node, key, value) => {
    return {
        ...node,
        extensions: getWithDefault(
            map(extensions => {
                return setValueToObject(extensions, key, value)
            }, node.extensions),
            setValueToObject({}, key, value)
        )
    }
}

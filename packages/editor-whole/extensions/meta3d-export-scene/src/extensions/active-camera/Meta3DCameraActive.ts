import { getKey, getValue } from "meta3d-gltf-extensions/src/Meta3DCameraActive"
import { setValueToObject } from "meta3d-structure-utils/src/ObjectUtils"
import { isNullable, map, getWithDefault, bind } from "meta3d-commonlib-ts/src/NullableUtils"

let _setExtension = (node, key, value) => {
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

let _findActivedCameraIndex = (json, activedCameraName) => {
    return map(nodes => {
        return bind(
            node => {
                return node.camera
            },
            nodes.find(node => {
                return getWithDefault(
                    map(
                        name => {
                            return name == activedCameraName
                        }, node.name
                    ),
                    false
                )
            })
        )
    }, json.nodes)
}

export let getExtension = (activedCameraName, writer) => {
    return {
        afterParse(input) {
            let json = writer.json;

            if (isNullable(json.cameras)) {
                return
            }

            // json.extensions = json.extensions || {}

            writer.extensionsUsed[getKey()] = true;


            // json.cameras = json.cameras.map((camera) => {
            //     if (getWithDefault(
            //         map((name) => {
            //             return name == activedCameraName
            //         }, camera.name),
            //         false
            //     )) {
            //         return _setExtension(camera, getKey(), getValue())
            //     }

            //     return camera
            // })

            let index = _findActivedCameraIndex(json, activedCameraName)

            json.cameras[index] = _setExtension(json.cameras[index], getKey(), getValue())
        }
    }
}
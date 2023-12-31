import { getKey, getValue } from "meta3d-gltf-extensions/src/Meta3DCameraActive"
import { setValueToObject } from "meta3d-structure-utils/src/ObjectUtils"
import { forEach, isNullable, map, getWithDefault, getExn, getEmpty, return_, bind } from "meta3d-commonlib-ts/src/NullableUtils"

// let _findActivedCameraName = (json) => {
//     return map(cameras => {
//         return map(
//             camera => {
//                 return getExn(camera.name)
//             },
//             cameras.find(camera => {
//                 return getWithDefault(
//                     map(
//                         extensions => {
//                             return !isNullable(extensions[getKey()])
//                         }, camera.extensions
//                     ),
//                     false
//                 )
//             })
//         )
//     }, json.cameras)
// }

let _findActivedCameraName = (json) => {
    return bind(cameras => {
        return bind(cameraIndex => {
            return bind(nodes => {
                return bind(node => {
                    return return_(node.name)
                }, nodes.find(node => {
                    return getWithDefault(
                        map(camera => {
                            return camera == cameraIndex
                        }, node.camera),
                        false
                    )
                })
                )
            }, json.nodes)
        }, cameras.reduce((result, camera, i) => {
            if (getWithDefault(
                map(
                    extensions => {
                        return !isNullable(extensions[getKey()])
                    }, camera.extensions
                ),
                false
            )) {
                result = return_(i)
            }

            return result
        }, getEmpty()))
    }, json.cameras)
}

let _markCameraActive = (gltf, activedCameraName) => {
    forEach(activedCameraName => {
        for (let scene of gltf.scenes) {
            scene.traverse(object => {
                if (!object.isCamera || object.name != activedCameraName) {
                    return
                }

                object.userData = setValueToObject(object.userData, getKey(), getValue())
            })
        }
    }, activedCameraName)
}

export let getExtension = (parser) => {
    return {
        afterRoot(gltf) {
            let json = parser.json

            if (getWithDefault(
                map(extensionsUsed => {
                    return !extensionsUsed.includes(getKey())
                }, json.extensionsUsed),
                false
            )) {
                return null
            }

            _markCameraActive(gltf, _findActivedCameraName(json))

            return Promise.resolve()
        }
    }
}
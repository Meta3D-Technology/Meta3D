import { buildKey, buildValue } from "meta3d-gltf-extensions/src/Meta3DCameraActive"
import { setValueToObject } from "meta3d-structure-utils/src/ObjectUtils"
import { forEach, isNullable, map, getWithDefault, getExn, getEmpty, return_, bind } from "meta3d-commonlib-ts/src/NullableUtils"
import { handleNodeNameToAsGLTFLoader, setCameraUserData } from "../utils/CameraUtils"

let _findActivedCameraGameObjectName = (json) => {
    return bind(cameras => {
        return bind(cameraIndex => {
            return bind(nodes => {
                return bind(node => {
                    return return_(
                        handleNodeNameToAsGLTFLoader(node.name)
                    )
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
                        return !isNullable(extensions[buildKey()])
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

let _markCameraActive = (gltf, activedCameraGameObjectName) => {
    forEach(activedCameraGameObjectName => {
        setCameraUserData((object3D) => {
            object3D.userData = setValueToObject(object3D.userData, buildKey(), buildValue())
        }, gltf, activedCameraGameObjectName)
    }, activedCameraGameObjectName)
}

export let getExtension = (parser) => {
    return {
        name: buildKey(),
        afterRoot(gltf) {
            let json = parser.json

            if (getWithDefault(
                map(extensionsUsed => {
                    return !extensionsUsed.includes(buildKey())
                }, json.extensionsUsed),
                false
            )) {
                return null
            }

            _markCameraActive(gltf, _findActivedCameraGameObjectName(json))

            return Promise.resolve()
        }
    }
}
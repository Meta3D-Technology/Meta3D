import { allControllerData, buildKey, buildValue, extensionValue } from "meta3d-gltf-extensions/src/Meta3DCameraController"
import { setValueToObject } from "meta3d-structure-utils/src/ObjectUtils"
import { forEach, isNullable, map, getWithDefault, getExn, getEmpty, return_, bind } from "meta3d-commonlib-ts/src/NullableUtils"
import { handleNodeNameToAsGLTFLoader, setCameraUserData } from "../utils/CameraUtils"

let _findAllCameraControllData = (json): allControllerData => {
    return getWithDefault(
        bind(cameras => {
            return cameras.reduce((result, camera, i) => {
                return getWithDefault(
                    map(
                        (extension: extensionValue) => {
                            result.push([
                                i,
                                extension
                            ])

                            return result
                        },
                        bind(
                            extensions => {
                                return extensions[buildKey()]
                            }, camera.extensions
                        )
                    ),
                    result
                )
            }, []).map(([cameraIndex, extension]: [number, extensionValue]) => {
                return map(
                    gameObjectName => {
                        return [
                            gameObjectName,
                            extension.type,
                            extension.value
                        ]
                    },
                    bind(nodes => {
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
                )

            })


        }, json.cameras),
        []
    )
}

let _setAllControllerData = (gltf, allControllerData: allControllerData) => {
    allControllerData.forEach(([
        gameObjectName,
        controllerType,
        controllerValue
    ]) => {
        setCameraUserData((object3D) => {
            object3D.userData = setValueToObject(object3D.userData, buildKey(), buildValue(controllerType, controllerValue))
        }, gltf, gameObjectName)
    })
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

            _setAllControllerData(gltf, _findAllCameraControllData(json))

            return Promise.resolve()
        }
    }
}
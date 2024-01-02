import { buildKey, buildValue, allControllerData } from "meta3d-gltf-extensions/src/Meta3DCameraController"
import { forEach, isNullable, map, getWithDefault, getExn, getEmpty, return_, bind } from "meta3d-commonlib-ts/src/NullableUtils"
import { findCameraIndex, setExtension } from "../utils/CameraUtils";

export let getExtension = (allControllerData: allControllerData, writer) => {
    return {
        afterParse(input) {
            let json = writer.json;

            if (isNullable(json.cameras)) {
                return
            }

            writer.extensionsUsed[buildKey()] = true;

            allControllerData.map((([cameraGameObjectName, controllerType, controllerValue]) => {
                return [
                    findCameraIndex(json, cameraGameObjectName),
                    controllerType,
                    controllerValue
                ]
            })).forEach(([index, controllerType, controllerValue]) => {
                json.cameras[index] = setExtension(json.cameras[index], buildKey(), buildValue(controllerType, return_(controllerValue)))
            })
        }
    }
}
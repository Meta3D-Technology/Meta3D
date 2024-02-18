import { buildKey, buildValue } from "meta3d-gltf-extensions/src/Meta3DCameraActive"
import { isNullable, map, getWithDefault, bind } from "meta3d-commonlib-ts/src/NullableUtils"
import { findCameraIndex } from "../utils/CameraUtils";
import { setExtension } from "../utils/ExtensionUtils";

export let getExtension = (activedCameraGameObjectName, writer) => {
    return {
        afterParse(input) {
            let json = writer.json;

            if (isNullable(json.cameras)) {
                return
            }

            writer.extensionsUsed[buildKey()] = true;

            let index = findCameraIndex(json, activedCameraGameObjectName)

            json.cameras[index] = setExtension(json.cameras[index], buildKey(), buildValue())
        }
    }
}
import { buildKey, buildValue, allScriptData } from "meta3d-gltf-extensions/src/Meta3DScript"
import { forEach, isNullable, map, getWithDefault, getExn, getEmpty, return_, bind } from "meta3d-commonlib-ts/src/NullableUtils"
import { setExtension } from "../utils/ExtensionUtils"
import { findNodeIndex } from "../utils/NodeUtils"

export let getExtension = (allScriptData: allScriptData, writer) => {
    return {
        afterParse(input) {
            let json = writer.json;

            if (isNullable(json.cameras)) {
                return
            }

            writer.extensionsUsed[buildKey()] = true;

            allScriptData.map((([gameObjectName, extensionValue]) => {
                return [
                    findNodeIndex(json, gameObjectName),
                    extensionValue
                ]
            })).forEach(([index, extensionValue]) => {
                json.nodes[index] = setExtension(json.nodes[index], buildKey(), buildValue(extensionValue))
            })
        }
    }
}
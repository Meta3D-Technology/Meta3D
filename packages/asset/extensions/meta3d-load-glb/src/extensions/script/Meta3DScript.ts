import { allScriptData, buildKey, buildValue, extensionValue } from "meta3d-gltf-extensions/src/Meta3DScript"
import { setValueToObject } from "meta3d-structure-utils/src/ObjectUtils"
import { forEach, isNullable, map, getWithDefault, getExn, getEmpty, return_, bind } from "meta3d-commonlib-ts/src/NullableUtils"
import { handleNodeNameToAsGLTFLoader } from "../utils/NodeUtils"
import { setScriptUserData } from "../utils/ScriptUtils"

let _findAllScriptData = (json): allScriptData => {
    return getWithDefault(
        bind(nodes => {
            return nodes.reduce((result, node) => {
                return getWithDefault(
                    map(
                        (extension: extensionValue) => {
                            result.push([
                                handleNodeNameToAsGLTFLoader(node.name),
                                extension
                            ])

                            return result
                        },
                        bind(
                            extensions => {
                                return extensions[buildKey()]
                            }, node.extensions
                        )
                    ),
                    result
                )
            }, [])
        }, json.nodes),
        []
    )
}

let _setAllScriptData = (gltf, allScriptData: allScriptData) => {
    allScriptData.forEach(([
        gameObjectName,
        extensionValue
    ]) => {
        setScriptUserData((object3D) => {
            object3D.userData = setValueToObject(object3D.userData, buildKey(), buildValue(extensionValue))
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

            _setAllScriptData(gltf, _findAllScriptData(json))

            return Promise.resolve()
        }
    }
}
import { service } from "meta3d-export-scene-protocol/src/service/ServiceType"
import { state } from "meta3d-export-scene-protocol/src/state/StateType"
import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { GLTFExporter, setThreeAPI } from "./three/GLTFExporter"
import { service as threeService } from "meta3d-three-protocol/src/service/ServiceType"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { service as renderService } from "meta3d-editor-sceneview-render-protocol/src/service/ServiceType"
import { getExn, getWithDefault, isNullable, map } from "meta3d-commonlib-ts/src/NullableUtils";
import { buildGetAllGameObjectsFunc } from "meta3d-pipeline-webgl1-three-utils/src/ConvertSceneGraphJobUtils"
import { state as converterState } from "meta3d-scenegraph-converter-three-protocol/src/state/StateType"
import * as Meta3DCameraActive from "./extensions/active-camera/Meta3DCameraActive"
import * as Meta3DCameraController from "./extensions/cameracontroller/Meta3DCameraController"
import * as Meta3DScript from "./extensions/script/Meta3DScript"
import * as  Meta3DCameraControllerUtils from "meta3d-gltf-extensions/src/Meta3DCameraController"
import * as  Meta3DScriptUtils from "meta3d-gltf-extensions/src/Meta3DScript"
import { assertFalse, ensureCheck, requireCheck, test } from "meta3d-ts-contract-utils"
import { hasDuplicateItems } from "meta3d-structure-utils/src/ArrayUtils"

let _buildAllControllerData = (api: api, meta3dState: meta3dState): Meta3DCameraControllerUtils.allControllerData => {
    let engineSceneService = getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))

    let { getArcballCameraControllerGameObject } = api.nullable.getExn(api.getPackageService<renderService>(meta3dState, "meta3d-editor-sceneview-render-protocol"))

    let arcballCameraControllerGameObjectInSceneView = getArcballCameraControllerGameObject(meta3dState)

    return ensureCheck(
        engineSceneService.gameObject.getAllGameObjects(meta3dState).filter(gameObject => {
            return engineSceneService.gameObject.hasArcballCameraController(meta3dState, gameObject) && gameObject != arcballCameraControllerGameObjectInSceneView
        }).map(gameObject => {
            return [
                engineSceneService.gameObject.getGameObjectName(meta3dState, gameObject),
                "arcball",
                Meta3DCameraControllerUtils.getArcballCameraControllerValue(engineSceneService, meta3dState,
                    gameObject
                )
            ]
        }), (
            allControllerData: Meta3DCameraControllerUtils.allControllerData
        ) => {
        test("shouldn't has the same camera gameObject name", () => {
            return assertFalse(
                hasDuplicateItems(
                    allControllerData,
                    ([
                        gameObjectName,
                        controllerType,
                        controllerValue
                    ]) => {
                        return gameObjectName
                    }
                )
            )
        })
    }, true)
}

let _getPerspectiveCameraProjectionGameObjectName = (api: api, meta3dState: meta3dState, perspectiveCamera) => {
    let { gameObject } = getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))

    return api.nullable.getWithDefault(
        gameObject.getGameObjectName(meta3dState, perspectiveCamera.gameObject),
        ""
    )
}

let _buildAllScriptData = (api: api, meta3dState: meta3dState): Meta3DScriptUtils.allScriptData => {
    let engineSceneService = getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))

    return ensureCheck(
        engineSceneService.gameObject.getAllGameObjects(meta3dState).filter(gameObject => {
            return engineSceneService.gameObject.hasScript(meta3dState, gameObject)
        }).map(gameObject => {
            return [
                engineSceneService.gameObject.getGameObjectName(meta3dState, gameObject),
                Meta3DScriptUtils.getValue(engineSceneService, meta3dState,
                    gameObject
                )
            ]
        }), (
            allScriptData: Meta3DScriptUtils.allScriptData
        ) => {
        test("shouldn't has the same script gameObject name", () => {
            return assertFalse(
                hasDuplicateItems(
                    allScriptData,
                    ([
                        gameObjectName,
                        _
                    ]) => {
                        return gameObjectName
                    }
                )
            )
        })
    }, true)
}

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        export: ([onFinishFunc, onErrorFunc], meta3dState) => {
            let threeService = getExn(api.getPackageService<threeService>(meta3dState, "meta3d-three-protocol"))

            meta3dState = threeService.converter(meta3dState).convert(buildGetAllGameObjectsFunc(api), meta3dState)
            let { perspectiveCamera, scene } = api.getExtensionState<converterState>(meta3dState,
                "meta3d-scenegraph-converter-three-protocol")

            let scene_ = getExn(scene)

            // if (!isNullable(perspectiveCamera)) {
            //     scene_.add(getExn(perspectiveCamera))
            // }


            let threeAPIService = threeService.api(meta3dState)

            setThreeAPI(threeAPIService)

            let perspectiveCameraProjectionGameObjectName = _getPerspectiveCameraProjectionGameObjectName(api, meta3dState, perspectiveCamera)

            new GLTFExporter()
                .register(writer => Meta3DCameraActive.getExtension(perspectiveCameraProjectionGameObjectName, writer))
                .register(writer => Meta3DCameraController.getExtension(
                    //     perspectiveCamera.name, getWithDefault(
                    //     map(value => ["arcball", value],
                    //         perspectiveCamera.userData[Meta3DCameraControllerUtils.buildKey()],
                    //     ),
                    //     ["none" as any, null]
                    // ),
                    _buildAllControllerData(api, meta3dState),
                    writer))
                .register(writer => Meta3DScript.getExtension(
                    _buildAllScriptData(api, meta3dState),
                    writer))
                .parse(
                    scene_,
                    onFinishFunc as (gltf: ArrayBuffer | { [key: string]: any }) => void,
                    onErrorFunc,
                    {
                        binary: true
                    }
                )
        }
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
    return {
    }
}

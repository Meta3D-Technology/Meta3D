import { service } from "meta3d-scenegraph-converter-three-protocol/src/service/ServiceType"
import { state } from "meta3d-scenegraph-converter-three-protocol/src/state/StateType"
import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { basicCameraView } from "meta3d-component-basiccameraview-protocol";
import { perspectiveCameraProjection } from "meta3d-component-perspectivecameraprojection-protocol";
import { Matrix4 } from "three";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { getViewWorldToCameraMatrix } from "meta3d-component-commonlib"
import { getEngineCoreService, getEngineCoreState, getMeta3dState, setAPI, setMeta3dState } from "./utils/GlobalUtils";
import { componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
import { componentName as perspectiveCameraProjectionComponentName } from "meta3d-component-perspectivecameraprojection-protocol";
import { componentName as transformComponentName } from "meta3d-component-transform-protocol"
import { getActiveCameraView } from "meta3d-component-commonlib";
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { gameObject } from "meta3d-gameobject-protocol"

function _convertToMatrix4(mat: Float32Array): Matrix4 {
    return new Matrix4(
        mat[0],
        mat[1],
        mat[2],
        mat[3],
        mat[4],
        mat[5],
        mat[6],
        mat[7],
        mat[8],
        mat[9],
        mat[10],
        mat[11],
        mat[12],
        mat[13],
        mat[14],
        mat[15],
    )
}

function _getCameraView(engineCoreState: engineCoreState, engineCoreService: engineCoreService, isDebug: boolean) {
    return getExn(getActiveCameraView(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName), engineCoreService, isDebug))
}

function _getCameraProjection(engineCoreState: engineCoreState, engineCoreService: engineCoreService, gameObject: gameObject) {
    return getExn(engineCoreService.getComponent<perspectiveCameraProjection>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName), gameObject))
}


class Camera {
    constructor(basicCameraViewComponent: basicCameraView, perspectiveCameraProjectionComponent: perspectiveCameraProjection) {
        this.basicCameraViewComponent = basicCameraViewComponent
        this.perspectiveCameraProjectionComponent = perspectiveCameraProjectionComponent
    }

    protected basicCameraViewComponent: basicCameraView
    protected perspectiveCameraProjectionComponent: perspectiveCameraProjection


    public get matrixWorldInverse(): Matrix4 {
        let meta3dState = getMeta3dState()
        let engineCoreState = getEngineCoreState(meta3dState)
        let engineCoreService = getEngineCoreService(meta3dState)

        let usedBasicCameraViewContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName)

        return _convertToMatrix4(
            getExn(getViewWorldToCameraMatrix(
                usedBasicCameraViewContribute,
                engineCoreService,
                engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, transformComponentName),
                this.basicCameraViewComponent
            ))
        )
    }
}

class PerspectiveCamera extends Camera {
    constructor(basicCameraViewComponent: basicCameraView, perspectiveCameraProjectionComponent: perspectiveCameraProjection) {
        super(basicCameraViewComponent, perspectiveCameraProjectionComponent)
    }
}

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        convert: (meta3dState) => {
            let isDebug = true

            setMeta3dState(meta3dState)
            setAPI(api)

            let engineCoreState = getEngineCoreState(meta3dState)
            let engineCoreService = getEngineCoreService(meta3dState)

            let cameraView = _getCameraView(engineCoreState, engineCoreService, isDebug)
            let usedBasicCameraViewContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName)
            let gameObject = engineCoreService.getComponentGameObjects(usedBasicCameraViewContribute, cameraView)[0]
            let cameraProjection = getExn(_getCameraProjection(engineCoreState, engineCoreService, gameObject))


            return {
                perspectiveCamera: new PerspectiveCamera(
                    cameraView,
                    cameraProjection
                ) as any,
                // TODO finish
                scene: null
            }
        }
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return {
        perspectiveCamera: null,
        scene: null
    }
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
    return {
    }
}

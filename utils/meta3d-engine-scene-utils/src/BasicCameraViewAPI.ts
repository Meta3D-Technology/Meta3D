import { engineCoreService } from "meta3d-core-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { componentName, basicCameraView, dataName } from "meta3d-component-basiccameraview-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { getViewWorldToCameraMatrix as getViewWorldToCameraMatrixUtils, getActiveCameraView as getActiveCameraViewUtils } from "meta3d-component-commonlib"
import { componentName as transformComponentName } from "meta3d-component-transform-protocol"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

export function createBasicCameraView(meta3dState: meta3dState, { unsafeGetUsedComponentContribute,
    createComponent,
    setUsedComponentContribute,
}: engineCoreService): [meta3dState, basicCameraView] {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    let data = createComponent<basicCameraView>(contribute)
    contribute = data[0]
    let basicCameraView = data[1]

    meta3dState =
        setUsedComponentContribute(meta3dState, contribute, componentName)

    return [
        meta3dState,
        basicCameraView
    ]
}

export let getName = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, basicCameraView: basicCameraView): nullable<string> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<basicCameraView, string>(contribute, basicCameraView, dataName.name)
}

export let setName = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, basicCameraView: basicCameraView, name: string): meta3dState => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


    contribute = setComponentData(contribute, basicCameraView, dataName.name, name)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getGameObjects = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentGameObjects }: engineCoreService, basicCameraView: basicCameraView): Array<gameObject> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentGameObjects<basicCameraView>(contribute, basicCameraView)
}

export let active = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, basicCameraView: basicCameraView) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    contribute = setComponentData(contribute, basicCameraView, dataName.isActive, true)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let notActive = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, basicCameraView: basicCameraView) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    contribute = setComponentData(contribute, basicCameraView, dataName.isActive, false)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getViewWorldToCameraMatrix = (meta3dState: meta3dState, engineCoreService: engineCoreService, basicCameraView: basicCameraView): nullable<Float32Array> => {
    let { unsafeGetUsedComponentContribute } = engineCoreService

    return getViewWorldToCameraMatrixUtils(
        unsafeGetUsedComponentContribute(meta3dState, componentName),
        engineCoreService,
        unsafeGetUsedComponentContribute(meta3dState, transformComponentName),
        basicCameraView
    )
}

export let getActiveCameraView = (meta3dState: meta3dState, engineCoreService: engineCoreService, isDebug: boolean): nullable<basicCameraView> => {
    let { unsafeGetUsedComponentContribute } = engineCoreService

    return getActiveCameraViewUtils(
        unsafeGetUsedComponentContribute(meta3dState, componentName),
        engineCoreService,
        isDebug
    )
}
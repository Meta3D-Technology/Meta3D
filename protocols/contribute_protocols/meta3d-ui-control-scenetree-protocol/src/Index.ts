import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { imguiImplTexture, sceneTreeIndexData } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export const uiControlName = "SceneTree"

export const dragDropType = "DND_SceneTreeNode"

export type state = {
    lastSceneTreeSelectedData: nullable<sceneTreeIndexData>,
    addCubeTexture: imguiImplTexture,
    cloneTexture: imguiImplTexture,
    disposeTexture: imguiImplTexture,
    cameraIconTexture: imguiImplTexture,
    gameObjectIconTexture: imguiImplTexture,
    lightIconTexture: imguiImplTexture
}

export type inputData = {
    rect: rect,
    label: string,
}

export type outputData = null
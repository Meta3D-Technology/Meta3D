import { getContribute as getContributeMeta3D, state as meta3dState } from "meta3d-type"
import { inputData, outputData, uiControlName, state } from "meta3d-ui-control-scenetree-protocol"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import { getExn, getWithDefault, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
// import { Map } from "immutable"
import { imguiImplTexture, sceneTreeData, sceneTreeIndexData } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { actionName as selectSceneTreeNodeActionName } from "meta3d-action-select-scenetree-node-protocol"
import { actionName as addCubeActionName } from "meta3d-action-add-cube-protocol"
import { actionName as disposeGameObjectActionName } from "meta3d-action-dispose-gameobject-protocol"
import { actionName as cloneGameObjectActionName } from "meta3d-action-clone-gameobject-protocol"
import { actionName as setParentActionName } from "meta3d-action-set-parent-protocol"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import addImageSrc from "url-loader!./image/add.png"
import cloneImageSrc from "url-loader!./image/clone.png"
import disposeImageSrc from "url-loader!./image/remove.png"
import cameraIconImageSrc from "url-loader!./image/cameraIcon.png"
import gameObjectIconImageSrc from "url-loader!./image/gameObjectIcon.png"
import lightIconImageSrc from "url-loader!./image/lightIcon.png"
import { gameObject } from "meta3d-gameobject-protocol"

type hierachyGameObjects = Array<[gameObject, hierachyGameObjects]>

let _getAllTopGameObjects = (meta3dState: meta3dState, engineWholeGameViewService: engineWholeGameViewService) => {
    let { gameObject, transform } = engineWholeGameViewService.scene

    return gameObject.getAllGameObjects(meta3dState).filter(gameObject_ => {
        return isNullable(transform.getParent(meta3dState, gameObject.getTransform(meta3dState, gameObject_)))
    })
}

let _buildHierachyGameObjects = (result: hierachyGameObjects,
    engineWholeGameViewService: engineWholeGameViewService,
    meta3dState: meta3dState, parentGameObjects: Array<gameObject>): hierachyGameObjects => {
    // meta3dState: meta3dState, parentGameObject: gameObject): hierachyGameObjects => {
    let { gameObject, transform } = engineWholeGameViewService.scene

    return parentGameObjects.reduce((result, parentGameObject) => {
        let children = transform.getChildren(meta3dState, gameObject.getTransform(meta3dState, parentGameObject))

        if (isNullable(children) || getExn(children).length == 0) {
            result.push([parentGameObject, []])
        }
        else {
            result.push([parentGameObject, _buildHierachyGameObjects([], engineWholeGameViewService, meta3dState, getExn(children).map(child => {
                return transform.getGameObjects(meta3dState, child)[0]
            })
            )])
        }

        return result
    }, result)
}

let _convertToSceneTreeData = (
    engineWholeGameViewService: engineWholeGameViewService,
    meta3dState: meta3dState, hierachyGameObjects: hierachyGameObjects,
    [
        cameraIconTexture,
        gameObjectIconTexture,
        lightIconTexture
    ]: [imguiImplTexture, imguiImplTexture, imguiImplTexture]
): sceneTreeData => {
    let { gameObject } = engineWholeGameViewService.scene

    return hierachyGameObjects.map(([gameObject_, children]) => {
        return [
            getWithDefault(gameObject.getGameObjectName(meta3dState, gameObject_), ""),
            gameObject.hasBasicCameraView(meta3dState, gameObject_) && gameObject.hasPerspectiveCameraProjection(meta3dState, gameObject_) ? cameraIconTexture :
                gameObject.hasDirectionLight(meta3dState, gameObject_) ? lightIconTexture :
                    gameObjectIconTexture,
            _convertToSceneTreeData(engineWholeGameViewService, meta3dState, children, [
                cameraIconTexture,
                gameObjectIconTexture,
                lightIconTexture
            ])
        ]
    })
}

let _findSelectedGameObject = (hierachyGameObjects: hierachyGameObjects, sceneTreeIndexData: sceneTreeIndexData): gameObject => {
    let _func = (hierachyGameObjects: hierachyGameObjects, index: number, sceneTreeIndexData: sceneTreeIndexData): gameObject => {
        if (sceneTreeIndexData.length == 0) {
            return hierachyGameObjects[index][0]
        }

        return _func(hierachyGameObjects[index][1], getExn(sceneTreeIndexData[0]), sceneTreeIndexData.slice(1))
    }

    return _func(hierachyGameObjects, getExn(sceneTreeIndexData[0]), sceneTreeIndexData.slice(1))
}

export let getContribute: getContributeMeta3D<uiControlContribute<inputData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            {
                rect,
                label
            }
        ) => {
            let { sceneTree, getUIControlState, setUIControlState } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

            let state = getExn(getUIControlState<state>(api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol"), uiControlName))
            let {
                lastSceneTreeSelectedData,
                addCubeTexture,
                cloneTexture,
                disposeTexture,
                cameraIconTexture,
                gameObjectIconTexture,
                lightIconTexture
            } = state

            let engineWholeGameViewService = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")

            let hierachyGameObjects = _buildHierachyGameObjects([],
                engineWholeGameViewService,
                meta3dState, _getAllTopGameObjects(meta3dState, engineWholeGameViewService))

            let sceneTreeData = _convertToSceneTreeData(
                engineWholeGameViewService,
                meta3dState, hierachyGameObjects,
                [
                    cameraIconTexture,
                    gameObjectIconTexture,
                    lightIconTexture
                ]
            )


            let data = sceneTree(meta3dState, sceneTreeData, lastSceneTreeSelectedData,
                { addCubeTexture, disposeTexture, cloneTexture },
                "SceneTree Window", rect)
            meta3dState = data[0]
            let [isAddCube, isDisposeGameObject, isCloneGameObject, sceneTreeSelectedData, sceneTreeDragData] = data[1]


            let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

            uiState = setUIControlState(uiState, uiControlName, {
                ...state,
                lastSceneTreeSelectedData: isNullable(sceneTreeSelectedData) ? lastSceneTreeSelectedData : sceneTreeSelectedData
            })

            meta3dState = api.setExtensionState(meta3dState, "meta3d-ui-protocol", uiState)



            let { trigger } = api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol")

            if (isAddCube) {
                return trigger(meta3dState, "meta3d-event-protocol", addCubeActionName, null).then(meta3dState => [meta3dState, null])
            }
            if (isDisposeGameObject) {
                return trigger(meta3dState, "meta3d-event-protocol", disposeGameObjectActionName, null).then(meta3dState => [meta3dState, null])
            }
            if (isCloneGameObject) {
                return trigger(meta3dState, "meta3d-event-protocol", cloneGameObjectActionName, null).then(meta3dState => [meta3dState, null])
            }
            if (!isNullable(sceneTreeSelectedData)) {
                return trigger(meta3dState, "meta3d-event-protocol", selectSceneTreeNodeActionName, _findSelectedGameObject(hierachyGameObjects, getExn(sceneTreeSelectedData))).then(meta3dState => [meta3dState, null])
            }
            if (!isNullable(sceneTreeDragData)) {
                let { source, target } = getExn(sceneTreeDragData)

                return trigger(meta3dState, "meta3d-event-protocol", setParentActionName,
                    {
                        source: _findSelectedGameObject(hierachyGameObjects, source),
                        target: target.length == 0 ? null : _findSelectedGameObject(hierachyGameObjects, target)
                    }
                ).then(meta3dState => [meta3dState, null])
            }

            return Promise.resolve([meta3dState, null])
        },
        init: (meta3dState) => {
            let { setUIControlState, loadImage } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

            return loadImage(meta3dState, addImageSrc).then((addCubeTexture: any) => {
                return loadImage(meta3dState, cloneImageSrc).then((cloneTexture: any) => {
                    return loadImage(meta3dState, disposeImageSrc).then((disposeTexture: any) => {
                        return loadImage(meta3dState, cameraIconImageSrc).then((cameraIconTexture: any) => {
                            return loadImage(meta3dState, gameObjectIconImageSrc).then((gameObjectIconTexture: any) => {
                                return loadImage(meta3dState, lightIconImageSrc).then((lightIconTexture: any) => {
                                    let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

                                    uiState = setUIControlState<state>(uiState, uiControlName, {
                                        lastSceneTreeSelectedData: null,
                                        addCubeTexture,
                                        cloneTexture,
                                        disposeTexture,
                                        cameraIconTexture,
                                        gameObjectIconTexture,
                                        lightIconTexture
                                    })

                                    return api.setExtensionState(meta3dState, "meta3d-ui-protocol", uiState)
                                })
                            })
                        })
                    })
                })
            })
        }
    }
}

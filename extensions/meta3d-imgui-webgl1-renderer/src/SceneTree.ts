import { sceneTreeFunc, sceneTreeData, sceneTreeDragData, sceneTreeIndexData } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { setNextWindowRect } from "./Utils"
import * as ImGui from "./lib/imgui"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { dragDropType } from "meta3d-ui-control-scenetree-protocol"
import { isArraysEqual } from "meta3d-structure-utils/src/ArrayUtils"

let _renderSceneTree = ([selectedData, dragData]: [nullable<sceneTreeIndexData>, nullable<sceneTreeDragData>], lastSceneTreeSelectedData: nullable<sceneTreeIndexData>,
    indexData: sceneTreeIndexData,
    sceneTreeData: sceneTreeData): [nullable<sceneTreeIndexData>, nullable<sceneTreeDragData>] => {
    if (sceneTreeData.length == 0) {
        return [selectedData, dragData]
    }

    return sceneTreeData.reduce(([selectedData, dragData], [nodeLabel, nodeIconTexture, children], index) => {
        let flag = children.length == 0 ? ImGui.TreeNodeFlags.Leaf : ImGui.TreeNodeFlags.OpenOnArrow

        indexData = indexData.slice()
        indexData.push(index)

        if (!isNullable(lastSceneTreeSelectedData)) {
            let data = getExn(lastSceneTreeSelectedData)

            if (isArraysEqual(data, indexData)) {
                flag = flag | ImGui.TreeNodeFlags.Selected
            }
            // if (data[0] == level && data[1] == index) {
            //     flag = flag | ImGui.TreeNodeFlags.Selected
            // }
        }

        let isOpen = ImGui.TreeNodeEx(((indexData.length - 1) * 100000 + index).toString(), flag, nodeLabel.slice(0, 20))

        if (ImGui.IsItemClicked() && !ImGui.IsItemToggledOpen()) {
            selectedData = indexData.slice()
        }

        if (ImGui.BeginDragDropSource()) {
            ImGui.SetDragDropPayload(dragDropType, indexData.slice())
            ImGui.Text(nodeLabel)
            ImGui.EndDragDropSource()
        }

        if (ImGui.BeginDragDropTarget()) {
            let payload = ImGui.AcceptDragDropPayload<sceneTreeIndexData>(dragDropType)

            if (payload !== null) {
                dragData = {
                    source: payload.Data,
                    target: indexData.slice()
                }
            }
            ImGui.EndDragDropTarget()
        }

        /*! Icons in the tree
        * refer to:
        https://github.com/ocornut/imgui/issues/282
        https://github.com/ocornut/imgui/issues/1863
        */
        ImGui.SameLine()
        ImGui.Image(nodeIconTexture._texture, new ImGui.ImVec2(20, 20))


        let returnData = null

        if (isOpen) {
            returnData = _renderSceneTree([selectedData, dragData], lastSceneTreeSelectedData, indexData.slice(), children)

            ImGui.TreePop()
        }

        return returnData
    }, [selectedData, dragData])
}

export let sceneTree: sceneTreeFunc = (sceneTreeData, lastSceneTreeSelectedData, { addCubeTexture, disposeTexture, cloneTexture }, windowName, rect) => {
    setNextWindowRect(rect)

    ImGui.Begin(windowName, null, ImGui.WindowFlags.NoTitleBar)


    let sizeX = 20
    let sizeY = sizeX

    let isAddCube = ImGui.ImageButton(addCubeTexture._texture, new ImGui.ImVec2(sizeX, sizeY))
    ImGui.SameLine()
    let isDisposeGameObject = ImGui.ImageButton(disposeTexture._texture, new ImGui.ImVec2(sizeX, sizeY))
    ImGui.SameLine()
    let isCloneGameObject = ImGui.ImageButton(cloneTexture._texture, new ImGui.ImVec2(sizeX, sizeY))


    ImGui.SetNextItemOpen(true, ImGui.Cond.Always)

    let data: [nullable<sceneTreeIndexData>, nullable<sceneTreeDragData>] = null

    if (ImGui.TreeNode("Scene")) {
        data = _renderSceneTree([null, null], lastSceneTreeSelectedData, [], sceneTreeData)
    }

    ImGui.End()

    return [isAddCube, isDisposeGameObject, isCloneGameObject, data[0], data[1]]
}
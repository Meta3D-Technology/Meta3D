import { sceneTreeFunc, sceneTreeData, sceneTreeDragData, sceneTreeIndexData } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { setNextWindowRect } from "./Utils"
import imgui, * as ImGui from "./lib/imgui"
import { getExn, getWithDefault, isNullable, map } from "meta3d-commonlib-ts/src/NullableUtils"
import { dragDropType } from "meta3d-ui-control-scenetree-protocol"
import { isArraysEqual, push } from "meta3d-structure-utils/src/ArrayUtils"

let _renderSceneTree = ([selectedData, dragData]: [nullable<sceneTreeIndexData>, nullable<sceneTreeDragData>], lastSceneTreeSelectedData: nullable<sceneTreeIndexData>,
    index: nullable<number>,
    indexData: sceneTreeIndexData,
    sceneTreeData: sceneTreeData): [nullable<sceneTreeIndexData>, nullable<sceneTreeDragData>] => {
    if (sceneTreeData.length == 0) {
        return [selectedData, dragData]
    }

    indexData = getWithDefault(
        map((index) => {
            indexData = indexData.slice()
            indexData.push(index)

            return indexData
        }, index),
        indexData
    )

    return sceneTreeData.reduce(([selectedData, dragData], [nodeLabel, nodeIconTexture, children], index) => {
        let flag = children.length == 0 ? ImGui.TreeNodeFlags.Leaf : ImGui.TreeNodeFlags.OpenOnArrow


        if (!isNullable(lastSceneTreeSelectedData)) {
            let data = getExn(lastSceneTreeSelectedData)

            if (isArraysEqual(data, push(indexData.slice(), index))) {
                flag = flag | ImGui.TreeNodeFlags.Selected
            }
        }

        let isOpen = ImGui.TreeNodeEx(((indexData.length - 1) * 100000 + index).toString(), flag, nodeLabel.slice(0, 20))

        if (ImGui.IsItemClicked() && !ImGui.IsItemToggledOpen()) {
            indexData = push(indexData.slice(), index)
            selectedData = indexData
        }

        if (ImGui.BeginDragDropSource()) {
            ImGui.SetDragDropPayload(dragDropType, push(indexData.slice(), index))
            ImGui.Text(nodeLabel)
            ImGui.EndDragDropSource()
        }

        if (ImGui.BeginDragDropTarget()) {
            let payload = ImGui.AcceptDragDropPayload<sceneTreeIndexData>(dragDropType)

            if (payload !== null) {
                dragData = {
                    source: payload.Data,
                    target: push(indexData.slice(), index)
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


        let returnData: any = [null, null]

        if (isOpen) {
            returnData = _renderSceneTree([selectedData, dragData], lastSceneTreeSelectedData, index, indexData, children)

            ImGui.TreePop()
        }
        else {
            returnData = [selectedData, dragData]
        }

        return returnData
    }, [selectedData, dragData])
}

export let sceneTree: sceneTreeFunc = (sceneTreeData, lastSceneTreeSelectedData, { addCubeTexture, disposeTexture, cloneTexture }, windowName, rect) => {
    let headerHeight = 40

    setNextWindowRect({
        ...rect,
        height: headerHeight
    })

    ImGui.Begin(`${windowName}_header`, null, ImGui.WindowFlags.NoTitleBar | ImGui.WindowFlags.NoScrollbar)


    let sizeX = 20
    let sizeY = sizeX

    let isAddCube = ImGui.ImageButton(addCubeTexture._texture, new ImGui.ImVec2(sizeX, sizeY))
    ImGui.SameLine()
    let isDisposeGameObject = ImGui.ImageButton(disposeTexture._texture, new ImGui.ImVec2(sizeX, sizeY))
    ImGui.SameLine()
    let isCloneGameObject = ImGui.ImageButton(cloneTexture._texture, new ImGui.ImVec2(sizeX, sizeY))

    ImGui.End()


    setNextWindowRect({
        ...rect,
        y: rect.y + headerHeight,
        height: rect.height - headerHeight
    })

    ImGui.Begin(`${windowName}_tree`, null, ImGui.WindowFlags.NoTitleBar | ImGui.WindowFlags.HorizontalScrollbar)

    ImGui.SetNextItemOpen(true, ImGui.Cond.Always)

    let data: [nullable<sceneTreeIndexData>, nullable<sceneTreeDragData>] = null

    if (ImGui.TreeNode("Scene")) {
        data = _renderSceneTree([null, null], lastSceneTreeSelectedData, null, [], sceneTreeData)

        ImGui.TreePop();
    }



    ImGui.End()

    return [isAddCube, isDisposeGameObject, isCloneGameObject, data[0], data[1]]
}
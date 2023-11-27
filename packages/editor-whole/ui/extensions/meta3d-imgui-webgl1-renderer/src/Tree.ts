import { treeFunc, treeData, treeDragData, treeIndexData } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { setNextWindowRect } from "./Utils"
import imgui, * as ImGui from "./lib/imgui"
import { getExn, getWithDefault, isNullable, map } from "meta3d-commonlib-ts/src/NullableUtils"
import { dragDropType } from "meta3d-ui-control-tree-protocol"
import { isArraysEqual, push } from "meta3d-structure-utils/src/ArrayUtils"

let _renderTree = ([selectedData, dragData]: [nullable<treeIndexData>, nullable<treeDragData>], lastTreeSelectedData: nullable<treeIndexData>,
    index: nullable<number>,
    indexData: treeIndexData,
    treeData: treeData): [nullable<treeIndexData>, nullable<treeDragData>] => {
    if (treeData.length == 0) {
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

    return treeData.reduce(([selectedData, dragData], [nodeLabel, nodeIconTexture, children], index) => {
        let flag = children.length == 0 ? ImGui.TreeNodeFlags.Leaf : ImGui.TreeNodeFlags.OpenOnArrow


        if (!isNullable(lastTreeSelectedData)) {
            let data = getExn(lastTreeSelectedData)

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
            let payload = ImGui.AcceptDragDropPayload<treeIndexData>(dragDropType)

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
            returnData = _renderTree([selectedData, dragData], lastTreeSelectedData, index, indexData, children)

            ImGui.TreePop()
        }
        else {
            returnData = [selectedData, dragData]
        }

        return returnData
    }, [selectedData, dragData])
}

export let tree: treeFunc = (treeData, rootNodeLabel, lastTreeSelectedData, windowName, rect) => {
    // let headerHeight = 40

    // setNextWindowRect({
    //     ...rect,
    //     height: headerHeight
    // })

    // ImGui.Begin(`${windowName}_header`, null, ImGui.WindowFlags.NoTitleBar | ImGui.WindowFlags.NoScrollbar)


    // let sizeX = 20
    // let sizeY = sizeX

    // let isAddCube = ImGui.ImageButton(addCubeTexture._texture, new ImGui.ImVec2(sizeX, sizeY))
    // ImGui.SameLine()
    // let isDisposeGameObject = ImGui.ImageButton(disposeTexture._texture, new ImGui.ImVec2(sizeX, sizeY))
    // ImGui.SameLine()
    // let isCloneGameObject = ImGui.ImageButton(cloneTexture._texture, new ImGui.ImVec2(sizeX, sizeY))

    // ImGui.End()


    // setNextWindowRect({
    //     ...rect,
    //     y: rect.y + headerHeight,
    //     height: rect.height - headerHeight
    // })
    setNextWindowRect(rect)

    ImGui.Begin(`${windowName}`, null, ImGui.WindowFlags.NoTitleBar | ImGui.WindowFlags.HorizontalScrollbar)

    ImGui.SetNextItemOpen(true, ImGui.Cond.Always)

    let data: [nullable<treeIndexData>, nullable<treeDragData>] = [null, null]
    let dragData: nullable<treeDragData> = null

    if (ImGui.TreeNode(rootNodeLabel)) {
        if (ImGui.BeginDragDropTarget()) {
            let payload = ImGui.AcceptDragDropPayload<treeIndexData>(dragDropType)

            if (payload !== null) {
                dragData = {
                    source: payload.Data,
                    target: []
                }
            }
            ImGui.EndDragDropTarget()
        }



        data = _renderTree([null, dragData], lastTreeSelectedData, null, [], treeData)

        ImGui.TreePop();
    }



    ImGui.End()

    return [data[0], data[1]]
}
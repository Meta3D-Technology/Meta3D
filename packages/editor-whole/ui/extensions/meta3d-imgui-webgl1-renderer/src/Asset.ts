import { assetFunc } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { setNextWindowRect } from "./Utils"
import * as ImGui from "./lib/imgui"
import { uiControlName as assetUIControlName } from "meta3d-ui-control-asset-protocol"
import { dragDropType, dropAssetFileUIData } from "meta3d-ui-control-scene-view-protocol"
import { return_ } from "meta3d-commonlib-ts/src/NullableUtils"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export let asset: assetFunc = (fileTexture, files, label, rect) => {
    // let headerHeight = 60

    // setNextWindowRect({
    //     ...rect,
    //     height: headerHeight
    // })

    // ImGui.Begin(label, null, ImGui.WindowFlags.NoScrollbar)



    // let isRemoveAsset = ImGui.ImageButton(removeAssetTexture._texture, new ImGui.ImVec2(20, 20))

    // ImGui.SameLine()

    // let isLoadFile = ImGui.ImageButton(loadFileTexture._texture, new ImGui.ImVec2(20, 20))


    // ImGui.End()





    // setNextWindowRect({
    //     ...rect,
    //     y: rect.y + headerHeight,
    //     height: rect.height - headerHeight
    // })
    setNextWindowRect(rect)

    // ImGui.Begin(`${label}_body`, null, ImGui.WindowFlags.NoTitleBar)
    ImGui.Begin(`${label}`, null, ImGui.WindowFlags.NoTitleBar)



    let style: ImGui.Style = ImGui.GetStyle()
    let fileCount: number = files.length
    let window_visible_x2: number = ImGui.GetWindowPos().x + ImGui.GetWindowContentRegionMax().x
    let sizeX = 32
    let sizeY = sizeX

    let selectedFileId = files.reduce<nullable<string>>((selectedFileId, [fileName, fileId], fileIndex) => {
        ImGui.PushID(fileIndex)

        ImGui.BeginGroup() // Lock X position
        if (ImGui.ImageButton(fileTexture._texture, new ImGui.ImVec2(sizeX, sizeY))) {
            selectedFileId = return_(fileId)
        }

        if (ImGui.BeginDragDropSource(ImGui.DragDropFlags.None)) {
            // Set payload to carry the index of our item (could be anything)
            ImGui.SetDragDropPayload<dropAssetFileUIData>(dragDropType, {
                fromUIControlName: assetUIControlName,
                data: fileId
            })

            // Display preview (could be anything, e.g. when dragging an image we could decide to display
            // the filename and a small preview of the image, etc.)
            ImGui.Text(fileName)
            ImGui.EndDragDropSource()
        }


        ImGui.Text(fileName.slice(0, 8))


        let last_button_x2: number = ImGui.GetItemRectMax().x
        let next_button_x2: number = last_button_x2 + style.ItemSpacing.x + sizeX // Expected position if next button was on same line
        ImGui.EndGroup() // Lock X position
        if (fileIndex + 1 < fileCount && next_button_x2 < window_visible_x2)
            ImGui.SameLine()

        ImGui.PopID()

        return selectedFileId
    }, null)

    ImGui.End()

    return selectedFileId
}
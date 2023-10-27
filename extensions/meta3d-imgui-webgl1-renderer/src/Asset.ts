import { assetFunc } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { setNextWindowRect } from "./Utils"
import * as ImGui from "./lib/imgui"
import { uiControlName as assetUIControlName } from "meta3d-ui-control-asset-protocol"
import { dragDropType, dropGlbUIData } from "meta3d-ui-control-scene-view-protocol"
import { return_ } from "meta3d-commonlib-ts/src/NullableUtils"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export let asset: assetFunc = ({ loadGlbTexture, removeAssetTexture, glbTexture }, glbs, label, rect) => {
    let headerHeight = 60

    setNextWindowRect({
        ...rect,
        height: headerHeight
    })

    ImGui.Begin(label, null, ImGui.WindowFlags.NoScrollbar)



    let isRemoveAsset = ImGui.ImageButton(removeAssetTexture._texture, new ImGui.ImVec2(20, 20))

    ImGui.SameLine()

    let isLoadGlb = ImGui.ImageButton(loadGlbTexture._texture, new ImGui.ImVec2(20, 20))


    ImGui.End()





    setNextWindowRect({
        ...rect,
        y: rect.y + headerHeight,
        height: rect.height - headerHeight
    })

    ImGui.Begin(`${label}_body`, null, ImGui.WindowFlags.NoTitleBar)



    let style: ImGui.Style = ImGui.GetStyle()
    let glbCount: number = glbs.length
    let window_visible_x2: number = ImGui.GetWindowPos().x + ImGui.GetWindowContentRegionMax().x
    let sizeX = 32
    let sizeY = sizeX

    let selectedGlbId = glbs.reduce<nullable<string>>((selectedGlbId, [glbName, glbId], glbIndex) => {
        ImGui.PushID(glbIndex)

        ImGui.BeginGroup() // Lock X position
        if (ImGui.ImageButton(glbTexture._texture, new ImGui.ImVec2(sizeX, sizeY))) {
            selectedGlbId = return_(glbId)
        }

        if (ImGui.BeginDragDropSource(ImGui.DragDropFlags.None)) {
            // Set payload to carry the index of our item (could be anything)
            ImGui.SetDragDropPayload<dropGlbUIData>(dragDropType, {
                fromUIControlName: assetUIControlName,
                data: glbId
            })

            // Display preview (could be anything, e.g. when dragging an image we could decide to display
            // the filename and a small preview of the image, etc.)
            ImGui.Text(glbName)
            ImGui.EndDragDropSource()
        }


        ImGui.Text(glbName.slice(0, 8))


        let last_button_x2: number = ImGui.GetItemRectMax().x
        let next_button_x2: number = last_button_x2 + style.ItemSpacing.x + sizeX // Expected position if next button was on same line
        ImGui.EndGroup() // Lock X position
        if (glbIndex + 1 < glbCount && next_button_x2 < window_visible_x2)
            ImGui.SameLine()

        ImGui.PopID()

        return selectedGlbId
    }, null)

    ImGui.End()

    return [isRemoveAsset, isLoadGlb, selectedGlbId]

}
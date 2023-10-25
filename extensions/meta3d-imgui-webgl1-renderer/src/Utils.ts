import { rect } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import * as ImGui from "./lib/imgui"

export let setNextWindowRect = (rect: rect) => {
    ImGui.SetNextWindowPos(new ImGui.ImVec2(rect.x, rect.y))
    ImGui.SetNextWindowSize(new ImGui.ImVec2(rect.width, rect.height))
}
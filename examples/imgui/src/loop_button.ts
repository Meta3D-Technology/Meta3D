import * as ImGui from "./imgui"
import * as ImGui_Impl from "./imgui_impl_button"

let first = true

export let loop = (time: number) => {
    ImGui_Impl.NewFrame(time);
    ImGui.NewFrame();

    if(first)  {
        ImGui.SetNextWindowPos(new ImGui.ImVec2(0,0));
        // if(ImGui.isMobile.any())
        //     ImGui.SetNextWindowSize(new ImGui.ImVec2(ImGui_Impl.canvas.scrollWidth,ImGui_Impl.canvas.scrollHeight));
        first=false
    }


    ImGui.Begin("Hello");
    // Buttons return true when clicked (NB: most widgets return true when edited/activated)
    if (ImGui.Button("Button")) {
        console.log("click Button")
    }

    ImGui.End();
    ImGui.EndFrame();
    ImGui.Render();

    // ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.25, 0.25, 0.25, 1));
    ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.0, 0.0, 0.0, 1));
    ImGui_Impl.RenderDrawData(ImGui.GetDrawData());
}
import imgui, * as ImGui from "./imgui"
import * as ImGui_Impl from "./imgui_impl_button"

// let first = true

export let loop = (time: number) => {
    ImGui_Impl.NewFrame(time);
    ImGui.NewFrame();


    // ImGui.StyleColorsClassic();

    // // if(first)  {
    ImGui.SetNextWindowPos(new ImGui.ImVec2(0, 0), ImGui.Cond.Once);
    // // ImGui.SetNextWindowSize(new ImGui.ImVec2(100, 200), ImGui.Cond.FirstUseEver);
    // // ImGui.SetNextWindowPos(new ImGui.ImVec2(0, 0));
    ImGui.SetNextWindowSize(new ImGui.ImVec2(200, 200));
    // if(ImGui.isMobile.any())
    //     ImGui.SetNextWindowSize(new ImGui.ImVec2(ImGui_Impl.canvas.scrollWidth,ImGui_Impl.canvas.scrollHeight));
    //     first=false
    // }


    // ImGui.Begin("Hello");
    // // Buttons return true when clicked (NB: most widgets return true when edited/activated)
    // ImGui.SetCursorPos(
    //     new ImGui.ImVec2(0, 40)
    // )
    // if (ImGui.Button("Button")) {
    //     console.log("click Button")
    // }
    // ImGui.SetCursorPos(
    //     new ImGui.ImVec2(80, 40)
    // )
    // if (ImGui.Button("Button")) {
    //     console.log("click Button")
    // }

    // ImGui.End();

    ImGui.SetNextWindowPos(new ImGui.ImVec2(0, 200), ImGui.Cond.Once);
    // // ImGui.SetNextWindowSize(new ImGui.ImVec2(100, 200), ImGui.Cond.FirstUseEver);
    // // ImGui.SetNextWindowPos(new ImGui.ImVec2(0, 0));
    ImGui.SetNextWindowSize(new ImGui.ImVec2(200, 200));

    ImGui.Begin("Hello1", null, ImGui.WindowFlags.NoCollapse);
    // Buttons return true when clicked (NB: most widgets return true when edited/activated)
    ImGui.SetCursorScreenPos(
        new ImGui.ImVec2(0, 60)
    )
    // SetCursorScreenPos
    if (ImGui.Button("Button")) {
        console.log("click Button")
    }
    ImGui.SetCursorPos(
        new ImGui.ImVec2(80, 40)
    )
    if (ImGui.Button("Button")) {
        console.log("click Button")
    }
    // if (ImGui.Button("Button")) {
    //     console.log("click Button")
    // }



    // ImGui.SetNextWindowPos(new ImGui.ImVec2(0,50));
    // ImGui.SetNextWindowSize(new ImGui.ImVec2(100, 200));
    // ImGui.Begin("Hello2");
    // ImGui.BeginChild("HHello2", new ImGui.ImVec2(100, 200));

    // ImGui.SetCursorPos(
    //     new ImGui.ImVec2(0, 0)
    // )

    // if (ImGui.Button("Button2")) {
    //     console.log("click Button")
    // }



    // // ImGui.BeginChild("HHello2", new ImGui.ImVec2(100, 200));

    // // ImGui.SetCursorPos(
    // //     new ImGui.ImVec2(0, 0)
    // // )

    // // if (ImGui.Button("Button2")) {
    // //     console.log("click Button")
    // // }
    // // ImGui.EndChild();
    // ImGui.EndChild();



    // ImGui.BeginChild("HHello2", new ImGui.ImVec2(200, 200));

    // ImGui.SetCursorPos(
    //     new ImGui.ImVec2(0, 0)
    // )

    // if (ImGui.Button("Button2")) {
    //     console.log("click Button")
    // }
    // ImGui.EndChild();


    ImGui.End();



    // ImGui.SetNextWindowPos(new ImGui.ImVec2(200, 300), ImGui.Cond.Once);
    // ImGui.SetNextWindowSize(new ImGui.ImVec2(100, 200));
    // ImGui.Begin("Hello2");
    // // Buttons return true when clicked (NB: most widgets return true when edited/activated)
    // // if (ImGui.Button("Button")) {
    // //     console.log("click Button")
    // // }

    // ImGui.End();


    ImGui.EndFrame();
    ImGui.Render();


    // ImGui.StyleColorsDark();
    ImGui.StyleColorsClassic();

    // ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.25, 0.25, 0.25, 1));
    ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.0, 0.0, 0.0, 1));
    ImGui_Impl.RenderDrawData(ImGui.GetDrawData());
}
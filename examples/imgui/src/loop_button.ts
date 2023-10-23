import imgui, * as ImGui from "./imgui"
import * as ImGui_Impl from "./imgui_impl_button"
import { addTexture } from "./init_button";

// let first = true

// export let loop = (time: number) => {
//     ImGui_Impl.NewFrame(time);
//     ImGui.NewFrame();


//     // ImGui.StyleColorsClassic();

//     // // if(first)  {
//     ImGui.SetNextWindowPos(new ImGui.ImVec2(0, 0), ImGui.Cond.Once);
//     // // ImGui.SetNextWindowSize(new ImGui.ImVec2(100, 200), ImGui.Cond.FirstUseEver);
//     // // ImGui.SetNextWindowPos(new ImGui.ImVec2(0, 0));
//     ImGui.SetNextWindowSize(new ImGui.ImVec2(200, 200));
//     // if(ImGui.isMobile.any())
//     //     ImGui.SetNextWindowSize(new ImGui.ImVec2(ImGui_Impl.canvas.scrollWidth,ImGui_Impl.canvas.scrollHeight));
//     //     first=false
//     // }


//     // ImGui.Begin("Hello");
//     // // Buttons return true when clicked (NB: most widgets return true when edited/activated)
//     // ImGui.SetCursorPos(
//     //     new ImGui.ImVec2(0, 40)
//     // )
//     // if (ImGui.Button("Button")) {
//     //     console.log("click Button")
//     // }
//     // ImGui.SetCursorPos(
//     //     new ImGui.ImVec2(80, 40)
//     // )
//     // if (ImGui.Button("Button")) {
//     //     console.log("click Button")
//     // }

//     // ImGui.End();

//     ImGui.SetNextWindowPos(new ImGui.ImVec2(0, 200), ImGui.Cond.Once);
//     // // ImGui.SetNextWindowSize(new ImGui.ImVec2(100, 200), ImGui.Cond.FirstUseEver);
//     // // ImGui.SetNextWindowPos(new ImGui.ImVec2(0, 0));
//     ImGui.SetNextWindowSize(new ImGui.ImVec2(200, 200));

//     ImGui.Begin("Hello1", null, ImGui.WindowFlags.NoCollapse);
//     // // Buttons return true when clicked (NB: most widgets return true when edited/activated)
//     // ImGui.SetCursorScreenPos(
//     //     new ImGui.ImVec2(0, 60)
//     // )
//     // // SetCursorScreenPos
//     // if (ImGui.Button("Button")) {
//     //     console.log("click Button")
//     // }
//     ImGui.SetCursorPos(
//         new ImGui.ImVec2(80, 40)
//     )
//     if (ImGui.Button("Button")) {
//         console.log("click Button")
//     }
//     // if (ImGui.Button("Button")) {
//     //     console.log("click Button")
//     // }



//     // ImGui.SetNextWindowPos(new ImGui.ImVec2(0,50));
//     // ImGui.SetNextWindowSize(new ImGui.ImVec2(100, 200));
//     // ImGui.Begin("Hello2");
//     // ImGui.BeginChild("HHello2", new ImGui.ImVec2(100, 200));

//     // ImGui.SetCursorPos(
//     //     new ImGui.ImVec2(0, 0)
//     // )

//     // if (ImGui.Button("Button2")) {
//     //     console.log("click Button")
//     // }



//     // // ImGui.BeginChild("HHello2", new ImGui.ImVec2(100, 200));

//     // // ImGui.SetCursorPos(
//     // //     new ImGui.ImVec2(0, 0)
//     // // )

//     // // if (ImGui.Button("Button2")) {
//     // //     console.log("click Button")
//     // // }
//     // // ImGui.EndChild();
//     // ImGui.EndChild();



//     // ImGui.BeginChild("HHello2", new ImGui.ImVec2(200, 200));

//     // ImGui.SetCursorPos(
//     //     new ImGui.ImVec2(0, 0)
//     // )

//     // if (ImGui.Button("Button2")) {
//     //     console.log("click Button")
//     // }
//     // ImGui.EndChild();


//     ImGui.End();



//     // ImGui.SetNextWindowPos(new ImGui.ImVec2(200, 300), ImGui.Cond.Once);
//     // ImGui.SetNextWindowSize(new ImGui.ImVec2(100, 200));
//     // ImGui.Begin("Hello2");
//     // // Buttons return true when clicked (NB: most widgets return true when edited/activated)
//     // // if (ImGui.Button("Button")) {
//     // //     console.log("click Button")
//     // // }

//     // ImGui.End();


//     ImGui.EndFrame();
//     ImGui.Render();


//     // ImGui.StyleColorsDark();
//     ImGui.StyleColorsClassic();

//     // ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.25, 0.25, 0.25, 1));
//     ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.0, 0.0, 0.0, 1));
//     ImGui_Impl.RenderDrawData(ImGui.GetDrawData());
// }


// export let loop = (time: number) => {
//     ImGui_Impl.NewFrame(time);
//     ImGui.NewFrame();


//     ImGui.SetNextWindowPos(new ImGui.ImVec2(600, 600));
//     ImGui.SetNextWindowSize(new ImGui.ImVec2(200, 200));


//     ImGui.Begin("Target");

//     ImGui.BeginChild("Child");
//     // ImGui.Dummy(new ImGui.ImVec2(180,160))
//     // ImGui.InvisibleButton("z", new ImGui.ImVec2(180,160))




//     ImGui.Button("Remove"); 
//     ImGui.Button("Remove"); 
//     ImGui.Button("Remove"); 
//     ImGui.Button("Remove"); 
//     ImGui.Button("Remove"); 
//     ImGui.Button("Remove"); 
//     ImGui.Button("Remove"); 
//     ImGui.Button("Remove"); 
//     ImGui.Button("Remove"); 
//     ImGui.Button("Remove"); 
//     ImGui.Button("Remove"); 
//     ImGui.Button("Remove"); 
//     ImGui.Button("Remove"); 



//     ImGui.EndChild()

//     if (ImGui.BeginDragDropTarget()) {
//         let payload
//         if (payload = ImGui.AcceptDragDropPayload("DND_DEMO_CELL")) {
//             // ImGui.ASSERT(payload.DataSize === sizeof(int));
//             const payload_n = payload.Data;
//             console.log("accept drag target, from source: ", payload_n)

//         }
//         ImGui.EndDragDropTarget();
//     }

//     ImGui.End()






//     ImGui.SetNextWindowPos(new ImGui.ImVec2(0, 0));
//     ImGui.SetNextWindowSize(new ImGui.ImVec2(600, 600));

//     ImGui.Begin("Asset");


//     // ImGui.AlignTextToFramePadding();
//     // ImGui.Text("Normal buttons"); ImGui.SameLine();

//     ImGui.Button("Remove"); ImGui.SameLine();



//     // ImGui.Button("Add")
//     // ImGui.Button("Corniflower");
//     ImGui.ImageButton(addTexture._texture, new ImGui.ImVec2(32, 32))





//     ImGui.Text("Drag Target");
//     ImGui.ImageButton(addTexture._texture, new ImGui.ImVec2(200, 200))


//     // if (ImGui.BeginDragDropTarget()) {
//     //     let payload
//     //     if (payload = ImGui.AcceptDragDropPayload("DND_DEMO_CELL")) {
//     //         // ImGui.ASSERT(payload.DataSize === sizeof(int));
//     //         const payload_n = payload.Data;
//     //         console.log("accept drag target, from source: ", payload_n)

//     //     }
//     //     ImGui.EndDragDropTarget();
//     // }



//     // ImGui.BeginGroup(); // Lock X position
//     // {
//     // ImGui.BeginGroup(); // Lock X position
//     // ImGui.Button("Add"); ImGui.SameLine();
//     // ImGui.Button("Add2"); ImGui.SameLine();
//     // ImGui.EndGroup(); // Lock X position
//     // }

//     // ImGui.EndGroup()




//     const button_sz: ImGui.Vec2 = new ImGui.Vec2(40, 40);

//     ImGui.Text("Manual wrapping:");
//     const style: ImGui.Style = ImGui.GetStyle();
//     // let buttons_count: number = 200;
//     let buttons_count: number = 1;
//     const window_visible_x2: number = ImGui.GetWindowPos().x + ImGui.GetWindowContentRegionMax().x;
//     for (let n = 0; n < buttons_count; n++) {
//         ImGui.PushID(n);

//         ImGui.BeginGroup(); // Lock X position
//         ImGui.ImageButton(addTexture._texture, new ImGui.ImVec2(32, 32))

//         if (ImGui.BeginDragDropSource(ImGui.DragDropFlags.None)) {
//             // Set payload to carry the index of our item (could be anything)
//             // ImGui.SetDragDropPayload("DND_DEMO_CELL", "Remove Button");
//             ImGui.SetDragDropPayload("DND_DEMO_CELL", "Group");

//             // Display preview (could be anything, e.g. when dragging an image we could decide to display
//             // the filename and a small preview of the image, etc.)
//             ImGui.Text(`Drag Source: Group`);
//             ImGui.EndDragDropSource();
//         }


//         ImGui.Text("Box");


//         // ImGui.Button("Box", button_sz);
//         const last_button_x2: number = ImGui.GetItemRectMax().x;
//         const next_button_x2: number = last_button_x2 + style.ItemSpacing.x + button_sz.x; // Expected position if next button was on same line
//         ImGui.EndGroup(); // Lock X position
//         if (n + 1 < buttons_count && next_button_x2 < window_visible_x2)
//             ImGui.SameLine();

//         ImGui.PopID();




//     }


//     // if (ImGui.BeginDragDropSource(ImGui.DragDropFlags.None)) {
//     //     // Set payload to carry the index of our item (could be anything)
//     //     // ImGui.SetDragDropPayload("DND_DEMO_CELL", "Remove Button");
//     //     ImGui.SetDragDropPayload("DND_DEMO_CELL", "Group");

//     //     // Display preview (could be anything, e.g. when dragging an image we could decide to display
//     //     // the filename and a small preview of the image, etc.)
//     //     ImGui.Text(`Drag Source: Group`);
//     //     ImGui.EndDragDropSource();
//     // }







//     ImGui.End();




//     ImGui.EndFrame();
//     ImGui.Render();


//     // ImGui.StyleColorsDark();
//     ImGui.StyleColorsClassic();

//     // ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.25, 0.25, 0.25, 1));
//     ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.0, 0.0, 0.0, 1));
//     ImGui_Impl.RenderDrawData(ImGui.GetDrawData());
// }



export let loop = (time: number) => {
    ImGui_Impl.NewFrame(time);
    ImGui.NewFrame();


    ImGui.SetNextWindowPos(new ImGui.ImVec2(600, 600));
    ImGui.SetNextWindowSize(new ImGui.ImVec2(300, ImGui.GetFontSize()));


    ImGui.Begin("Menu Window", null, ImGui.WindowFlags.NoTitleBar| ImGui.WindowFlags.MenuBar | ImGui.WindowFlags.NoBackground |ImGui.WindowFlags.NoCollapse);

    let isClick = false

    if (ImGui.BeginMenuBar()) {
        if (ImGui.BeginMenu("Examples")) {
            isClick = ImGui.MenuItem("Main menu bar")
            ImGui.EndMenu();
        }
        if (ImGui.BeginMenu("222")) {
            ImGui.MenuItem("222-1")
            ImGui.EndMenu();
        }

        ImGui.EndMenuBar();
    }

    console.log(isClick)

    ImGui.End()





    ImGui.EndFrame();
    ImGui.Render();


    // ImGui.StyleColorsDark();
    ImGui.StyleColorsClassic();

    // ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.25, 0.25, 0.25, 1));
    ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.0, 0.0, 0.0, 1));
    ImGui_Impl.RenderDrawData(ImGui.GetDrawData());
}
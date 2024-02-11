import imgui, * as ImGui from "./imgui"
import * as ImGui_Impl from "./imgui_impl_button"
import { addTexture } from "./init_button"
// import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js"

// let first = true

// export let loop = (time: number) => {
//     ImGui_Impl.NewFrame(time)
//     ImGui.NewFrame()


//     // ImGui.StyleColorsClassic()

//     // // if(first)  {
//     ImGui.SetNextWindowPos(new ImGui.ImVec2(0, 0), ImGui.Cond.Once)
//     // // ImGui.SetNextWindowSize(new ImGui.ImVec2(100, 200), ImGui.Cond.FirstUseEver)
//     // // ImGui.SetNextWindowPos(new ImGui.ImVec2(0, 0))
//     ImGui.SetNextWindowSize(new ImGui.ImVec2(200, 200))
//     // if(ImGui.isMobile.any())
//     //     ImGui.SetNextWindowSize(new ImGui.ImVec2(ImGui_Impl.canvas.scrollWidth,ImGui_Impl.canvas.scrollHeight))
//     //     first=false
//     // }


//     // ImGui.Begin("Hello")
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

//     // ImGui.End()

//     ImGui.SetNextWindowPos(new ImGui.ImVec2(0, 200), ImGui.Cond.Once)
//     // // ImGui.SetNextWindowSize(new ImGui.ImVec2(100, 200), ImGui.Cond.FirstUseEver)
//     // // ImGui.SetNextWindowPos(new ImGui.ImVec2(0, 0))
//     ImGui.SetNextWindowSize(new ImGui.ImVec2(200, 200))

//     ImGui.Begin("Hello1", null, ImGui.WindowFlags.NoCollapse)
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



//     // ImGui.SetNextWindowPos(new ImGui.ImVec2(0,50))
//     // ImGui.SetNextWindowSize(new ImGui.ImVec2(100, 200))
//     // ImGui.Begin("Hello2")
//     // ImGui.BeginChild("HHello2", new ImGui.ImVec2(100, 200))

//     // ImGui.SetCursorPos(
//     //     new ImGui.ImVec2(0, 0)
//     // )

//     // if (ImGui.Button("Button2")) {
//     //     console.log("click Button")
//     // }



//     // // ImGui.BeginChild("HHello2", new ImGui.ImVec2(100, 200))

//     // // ImGui.SetCursorPos(
//     // //     new ImGui.ImVec2(0, 0)
//     // // )

//     // // if (ImGui.Button("Button2")) {
//     // //     console.log("click Button")
//     // // }
//     // // ImGui.EndChild()
//     // ImGui.EndChild()



//     // ImGui.BeginChild("HHello2", new ImGui.ImVec2(200, 200))

//     // ImGui.SetCursorPos(
//     //     new ImGui.ImVec2(0, 0)
//     // )

//     // if (ImGui.Button("Button2")) {
//     //     console.log("click Button")
//     // }
//     // ImGui.EndChild()


//     ImGui.End()



//     // ImGui.SetNextWindowPos(new ImGui.ImVec2(200, 300), ImGui.Cond.Once)
//     // ImGui.SetNextWindowSize(new ImGui.ImVec2(100, 200))
//     // ImGui.Begin("Hello2")
//     // // Buttons return true when clicked (NB: most widgets return true when edited/activated)
//     // // if (ImGui.Button("Button")) {
//     // //     console.log("click Button")
//     // // }

//     // ImGui.End()


//     ImGui.EndFrame()
//     ImGui.Render()


//     // ImGui.StyleColorsDark()
//     ImGui.StyleColorsClassic()

//     // ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.25, 0.25, 0.25, 1))
//     ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.0, 0.0, 0.0, 1))
//     ImGui_Impl.RenderDrawData(ImGui.GetDrawData())
// }


// export let loop = (time: number) => {
//     ImGui_Impl.NewFrame(time)
//     ImGui.NewFrame()


//     ImGui.SetNextWindowPos(new ImGui.ImVec2(600, 600))
//     ImGui.SetNextWindowSize(new ImGui.ImVec2(200, 200))


//     ImGui.Begin("Target")

//     ImGui.BeginChild("Child")
//     // ImGui.Dummy(new ImGui.ImVec2(180,160))
//     // ImGui.InvisibleButton("z", new ImGui.ImVec2(180,160))




//     ImGui.Button("Remove") 
//     ImGui.Button("Remove") 
//     ImGui.Button("Remove") 
//     ImGui.Button("Remove") 
//     ImGui.Button("Remove") 
//     ImGui.Button("Remove") 
//     ImGui.Button("Remove") 
//     ImGui.Button("Remove") 
//     ImGui.Button("Remove") 
//     ImGui.Button("Remove") 
//     ImGui.Button("Remove") 
//     ImGui.Button("Remove") 
//     ImGui.Button("Remove") 



//     ImGui.EndChild()

//     if (ImGui.BeginDragDropTarget()) {
//         let payload
//         if (payload = ImGui.AcceptDragDropPayload("DND_DEMO_CELL")) {
//             // ImGui.ASSERT(payload.DataSize === sizeof(int))
//             const payload_n = payload.Data
//             console.log("accept drag target, from source: ", payload_n)

//         }
//         ImGui.EndDragDropTarget()
//     }

//     ImGui.End()






//     ImGui.SetNextWindowPos(new ImGui.ImVec2(0, 0))
//     ImGui.SetNextWindowSize(new ImGui.ImVec2(600, 600))

//     ImGui.Begin("Asset")


//     // ImGui.AlignTextToFramePadding()
//     // ImGui.Text("Normal buttons") ImGui.SameLine()

//     ImGui.Button("Remove") ImGui.SameLine()



//     // ImGui.Button("Add")
//     // ImGui.Button("Corniflower")
//     ImGui.ImageButton(addTexture._texture, new ImGui.ImVec2(32, 32))





//     ImGui.Text("Drag Target")
//     ImGui.ImageButton(addTexture._texture, new ImGui.ImVec2(200, 200))


//     // if (ImGui.BeginDragDropTarget()) {
//     //     let payload
//     //     if (payload = ImGui.AcceptDragDropPayload("DND_DEMO_CELL")) {
//     //         // ImGui.ASSERT(payload.DataSize === sizeof(int))
//     //         const payload_n = payload.Data
//     //         console.log("accept drag target, from source: ", payload_n)

//     //     }
//     //     ImGui.EndDragDropTarget()
//     // }



//     // ImGui.BeginGroup() // Lock X position
//     // {
//     // ImGui.BeginGroup() // Lock X position
//     // ImGui.Button("Add") ImGui.SameLine()
//     // ImGui.Button("Add2") ImGui.SameLine()
//     // ImGui.EndGroup() // Lock X position
//     // }

//     // ImGui.EndGroup()




//     const button_sz: ImGui.Vec2 = new ImGui.Vec2(40, 40)

//     ImGui.Text("Manual wrapping:")
//     const style: ImGui.Style = ImGui.GetStyle()
//     // let buttons_count: number = 200
//     let buttons_count: number = 1
//     const window_visible_x2: number = ImGui.GetWindowPos().x + ImGui.GetWindowContentRegionMax().x
//     for (let n = 0 n < buttons_count n++) {
//         ImGui.PushID(n)

//         ImGui.BeginGroup() // Lock X position
//         ImGui.ImageButton(addTexture._texture, new ImGui.ImVec2(32, 32))

//         if (ImGui.BeginDragDropSource(ImGui.DragDropFlags.None)) {
//             // Set payload to carry the index of our item (could be anything)
//             // ImGui.SetDragDropPayload("DND_DEMO_CELL", "Remove Button")
//             ImGui.SetDragDropPayload("DND_DEMO_CELL", "Group")

//             // Display preview (could be anything, e.g. when dragging an image we could decide to display
//             // the filename and a small preview of the image, etc.)
//             ImGui.Text(`Drag Source: Group`)
//             ImGui.EndDragDropSource()
//         }


//         ImGui.Text("Box")


//         // ImGui.Button("Box", button_sz)
//         const last_button_x2: number = ImGui.GetItemRectMax().x
//         const next_button_x2: number = last_button_x2 + style.ItemSpacing.x + button_sz.x // Expected position if next button was on same line
//         ImGui.EndGroup() // Lock X position
//         if (n + 1 < buttons_count && next_button_x2 < window_visible_x2)
//             ImGui.SameLine()

//         ImGui.PopID()




//     }


//     // if (ImGui.BeginDragDropSource(ImGui.DragDropFlags.None)) {
//     //     // Set payload to carry the index of our item (could be anything)
//     //     // ImGui.SetDragDropPayload("DND_DEMO_CELL", "Remove Button")
//     //     ImGui.SetDragDropPayload("DND_DEMO_CELL", "Group")

//     //     // Display preview (could be anything, e.g. when dragging an image we could decide to display
//     //     // the filename and a small preview of the image, etc.)
//     //     ImGui.Text(`Drag Source: Group`)
//     //     ImGui.EndDragDropSource()
//     // }







//     ImGui.End()




//     ImGui.EndFrame()
//     ImGui.Render()


//     // ImGui.StyleColorsDark()
//     ImGui.StyleColorsClassic()

//     // ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.25, 0.25, 0.25, 1))
//     ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.0, 0.0, 0.0, 1))
//     ImGui_Impl.RenderDrawData(ImGui.GetDrawData())
// }



// export let loop = (time: number) => {
//     ImGui_Impl.NewFrame(time)
//     ImGui.NewFrame()


//     ImGui.SetNextWindowPos(new ImGui.ImVec2(600, 600))
//     ImGui.SetNextWindowSize(new ImGui.ImVec2(300, ImGui.GetFontSize()))


//     ImGui.Begin("Menu Window", null, ImGui.WindowFlags.NoTitleBar| ImGui.WindowFlags.MenuBar | ImGui.WindowFlags.NoBackground |ImGui.WindowFlags.NoCollapse)

//     let isClick = false

//     if (ImGui.BeginMenuBar()) {
//         if (ImGui.BeginMenu("Examples")) {
//             isClick = ImGui.MenuItem("Main menu bar")
//             ImGui.EndMenu()
//         }
//         if (ImGui.BeginMenu("222")) {
//             ImGui.MenuItem("222-1")
//             ImGui.EndMenu()
//         }

//         ImGui.EndMenuBar()
//     }

//     console.log(isClick)

//     ImGui.End()





//     ImGui.EndFrame()
//     ImGui.Render()


//     // ImGui.StyleColorsDark()
//     ImGui.StyleColorsClassic()

//     // ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.25, 0.25, 0.25, 1))
//     ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.0, 0.0, 0.0, 1))
//     ImGui_Impl.RenderDrawData(ImGui.GetDrawData())
// }






// let selectedNodeIndex = -1
// export let loop = (time: number) => {
//     ImGui_Impl.NewFrame(time)
//     ImGui.NewFrame()


//     ImGui.SetNextWindowPos(new ImGui.ImVec2(100, 100))
//     ImGui.SetNextWindowSize(new ImGui.ImVec2(300, 300))


//     ImGui.Begin("Menu Window")



//     ImGui.SetNextItemOpen(true, ImGui.Cond.Always)
//     if (ImGui.TreeNode("Scene")) {
//         for (let i = 0 i <= 30 i++) {
//             let flags = ImGui.TreeNodeFlags.OpenOnArrow

//             if (selectedNodeIndex == i) {
//                 flags = flags | ImGui.TreeNodeFlags.Selected
//             }

//             // console.log(selectedNodeIndex)

// let node_open = ImGui.TreeNodeEx(/*(void*)(intptr_t)*/i, flags, `Selectable NodSelectable NodSelectable NodSelectable NodSelectable NodSelectable NodeeeeeeSelectable Node i`.slice(0, 20))
//             if (ImGui.IsItemClicked() && !ImGui.IsItemToggledOpen()) {
//                 selectedNodeIndex = i
//             }

//             if (ImGui.BeginDragDropSource()) {
//                 ImGui.SetDragDropPayload("_TREENODE", i)
//                 ImGui.Text("This is a drag and drop source")
//                 ImGui.EndDragDropSource()
//             }

//             if (ImGui.BeginDragDropTarget()) {
//                 let payload
//                 if (payload = ImGui.AcceptDragDropPayload("_TREENODE")) {
//                     // ImGui.ASSERT(payload.DataSize === sizeof(int))
//                     const payload_n = payload.Data
//                     console.log("accept drag target, from source: ", payload_n, i)

//                 }
//                 ImGui.EndDragDropTarget()
//             }

//             ImGui.SameLine()
//             ImGui.Image(addTexture._texture, new ImGui.ImVec2(20, 20))



//             if (node_open) {
//                 ImGui.Text("blah blah")


//                 ImGui.TreePop()
//             }
//         }

//         ImGui.TreePop()
//     }






//     ImGui.End()





//     ImGui.EndFrame()
//     ImGui.Render()


//     // ImGui.StyleColorsDark()
//     ImGui.StyleColorsClassic()

//     // ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.25, 0.25, 0.25, 1))
//     ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.0, 0.0, 0.0, 1))
//     ImGui_Impl.RenderDrawData(ImGui.GetDrawData())
// }




// let name: string = "Hello"
// let value: number = 1
// let value2: number = 1
// export let loop = (time: number) => {
//     ImGui_Impl.NewFrame(time)
//     ImGui.NewFrame()


//     ImGui.SetNextWindowPos(new ImGui.ImVec2(100, 100))
//     ImGui.SetNextWindowSize(new ImGui.ImVec2(400, 600))


//     ImGui.Begin("Inspector", null, ImGui.WindowFlags.NoTitleBar)

//     ImGui.InputText("Name", (_ = name) => name = _, 30)

//     // ImGui.SetNextItemOpen(true, ImGui.Cond.Once)
//     ImGui.SetNextItemOpen(false, ImGui.Cond.Once)
//     // ImGui.SetNextItemOpen(true, ImGui.Cond.None)
//     if (ImGui.CollapsingHeader("Transform")) {
//         ImGui.PushItemWidth(400/4)
//         ImGui.PushID(1)
//         if(ImGui.InputFloat("", (_ = value2) => value2 = _, 0.01, 1.0, "%.5f")){
// console.log(value2)
//         }
//         // console.log(result)


//         ImGui.PopID()
//         ImGui.SameLine()

//         ImGui.PushID(2)
//         ImGui.InputFloat("", (_ = value) => value = _, 0.01, 1.0, "%.5f")
//         ImGui.PopID()

//         ImGui.SameLine()

//         ImGui.PushID(3)
//         ImGui.InputFloat("", (_ = value) => value = _, 0.01, 1.0, "%.5f")
//         ImGui.PopID()
//         ImGui.PopItemWidth()

//         ImGui.SameLine()

//         ImGui.Text("Position")
//     }





//     ImGui.End()





//     ImGui.EndFrame()
//     ImGui.Render()


//     // ImGui.StyleColorsDark()
//     ImGui.StyleColorsClassic()

//     // ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.25, 0.25, 0.25, 1))
//     ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.0, 0.0, 0.0, 1))
//     ImGui_Impl.RenderDrawData(ImGui.GetDrawData())
// }













// let selected_fish = -1
// export let loop = (time: number) => {
//     ImGui_Impl.NewFrame(time)
//     ImGui.NewFrame()


//     if (ImGui.Button("Delete.."))
//         ImGui.OpenPopup("Delete?")


//     // Always center this window when appearing
//     // const center = (ImGui as any).GetMainViewport().GetCenter()
//     // ImGui.SetNextWindowPos(center, ImGui.Cond.Appearing, new ImGui.Vec2(0.5, 0.5))

//     // ImGui.ShowMetricsWindow()

//     const names: string[] = ["Bream", "Haddock", "Mackerel", "Pollock", "Tilefish"]

//     if (ImGui.Button("Select.."))
//         ImGui.OpenPopup("my_select_popup")
//     ImGui.SameLine()
//     ImGui.TextUnformatted(selected_fish === -1 ? "<None>" : names[selected_fish])
//     if (ImGui.BeginPopup("my_select_popup")) {
//         ImGui.Text("Aquarium")
//         ImGui.Separator()
//         for (let i = 0 i < ImGui.ARRAYSIZE(names) i++)
//             if (ImGui.Selectable(names[i]))
//                 selected_fish = i
//         ImGui.EndPopup()
//     }



//     if (ImGui.BeginPopupModal("Delete?", null, ImGui.WindowFlags.AlwaysAutoResize)) {
//         ImGui.Text("All those beautiful files will be deleted.\nThis operation cannot be undone!\n\n")
//         ImGui.Separator()


//         if (ImGui.Button("OK", new ImGui.Vec2(120, 0))) { ImGui.CloseCurrentPopup() }
//         ImGui.SetItemDefaultFocus()
//         ImGui.SameLine()
//         if (ImGui.Button("Cancel", new ImGui.Vec2(120, 0))) { ImGui.CloseCurrentPopup() }

//         ImGui.EndPopup()
//     }


//     ImGui.EndFrame()
//     ImGui.Render()


//     // ImGui.StyleColorsDark()
//     ImGui.StyleColorsClassic()

//     // ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.25, 0.25, 0.25, 1))
//     ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.0, 0.0, 0.0, 1))
//     ImGui_Impl.RenderDrawData(ImGui.GetDrawData())
// }



// let result = false
// let name = "aa"
// export let loop = (time: number) => {
//     ImGui_Impl.NewFrame(time)
//     ImGui.NewFrame()


//     // if (ImGui.Checkbox("aaa", (_ = result) => result = _)) {
//     //     console.log(result)
//     // }

//     if (ImGui.CollapsingHeader("Transform")) {
//         if(ImGui.Checkbox("assadasd", (_ = result) => result = _)){
//         console.log("'aaa")
//         }
//     }


//     ImGui.EndFrame()
//     ImGui.Render()


//     // ImGui.StyleColorsDark()
//     ImGui.StyleColorsClassic()

//     // ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.25, 0.25, 0.25, 1))
//     ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.0, 0.0, 0.0, 1))
//     ImGui_Impl.RenderDrawData(ImGui.GetDrawData())
// }


// let selected_fish = { value: -1 }
// const names: string[] = ["Bream", "Haddock", "Mackerel", "Pollock", "Tilefish"]
// export let loop = (time: number) => {
//     ImGui_Impl.NewFrame(time)
//     ImGui.NewFrame()


//     // if (ImGui.Checkbox("aaa", (_ = result) => result = _)) {
//     //     console.log(result)
//     // }

//     // if (ImGui.CollapsingHeader("Transform")) {
//     //     // if(ImGui.Checkbox("assadasd", (_ = result) => result = _)){
//     //     // console.log("'aaa")
//     //     // }
//     // }

//     // if (ImGui.Button("Add Component", new ImGui.Vec2(120, 60))) {

//     // if (ImGui.TreeNode("Selection State: Single Selection")) {
//     //     for (let n = 0 n < 5 n++) {
//     //         const buf: string = `Object ${n}`
//     //         if (ImGui.Selectable(buf, selected.value === n))
//     //             selected.value = n
//     //     }

//     //     ImGui.TreePop()
//     // }

//     // Simple selection popup (if you want to show the current selection inside the Button itself,
//     // you may want to build a string using the "###" operator to preserve a constant ID with a variable label)
//     // if (ImGui.Button("Select.."), new ImGui.Vec2(120, 60))
//     if (ImGui.Button("Select.."))
//         ImGui.OpenPopup("my_select_popup")
//     // ImGui.SameLine()
//     // ImGui.TextUnformatted(selected_fish.value === -1 ? "<None>" : names[selected_fish.value])
//     if (ImGui.BeginPopup("my_select_popup")) {
//         ImGui.Text("Aquarium")
//         ImGui.Separator()
//         for (let i = 0 i < ImGui.ARRAYSIZE(names) i++)
//             if (ImGui.Selectable(names[i]))
//                 selected_fish.value = i
//         ImGui.EndPopup()
//     }


//     ImGui.EndFrame()
//     ImGui.Render()


//     // ImGui.StyleColorsDark()
//     ImGui.StyleColorsClassic()

//     // ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.25, 0.25, 0.25, 1))
//     ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.0, 0.0, 0.0, 1))
//     ImGui_Impl.RenderDrawData(ImGui.GetDrawData())
// }






// let isCreateMonaco = false
// let isLoad = false
// let monaco = null
// let editor = null
// export let loop = (time: number) => {
//     ImGui_Impl.NewFrame(time)
//     ImGui.NewFrame()



//     ImGui.SetNextWindowPos(new ImGui.ImVec2(100, 100))
//     ImGui.SetNextWindowSize(new ImGui.ImVec2(300, 300))

//     ImGui.Begin("Asset Inspector")

//     if (ImGui.CollapsingHeader("Transform")) {
//     }

//     // if (ImGui.CollapsingHeader("Script")) {
//     // }

//     ImGui.Text("Script Name")
//     ImGui.Separator();



//     // console.log("aaa")
//     // console.log(ImGui.GetWindowPos())

//     // console.log(ImGui.GetWindowContentRegionMax())

//     // console.log(ImGui.GetItemRectMin())
//     // console.log(ImGui.GetItemRectMax())
//     // console.log("bbb")

//     (document.querySelector("#container") as any).style.top = ImGui.GetItemRectMin().y + "px";
//     (document.querySelector("#container") as any).style.left = ImGui.GetItemRectMin().x + "px";
//     (document.querySelector("#container") as any).style.width = ImGui.GetWindowSize().x + "px";
//     (document.querySelector("#container") as any).style.height = ImGui.GetWindowSize().y - ImGui.GetItemRectMin().y + ImGui.GetWindowPos().y + "px";


//     if (!isLoad) {
//         import(
//     /* webpackPrefetch: true */"monaco-editor/esm/vs/editor/editor.api.js"
//         ).then(value => {
//             monaco = value
//         })

//         isLoad = true
//     }

//     if (monaco !== null && !isCreateMonaco) {
//         let code = `let a = 1`
//         var model = monaco.editor.createModel(code, "typescript")
//         editor = monaco.editor.create(document.querySelector("#container"), {
//             model: model,
//         })

//         isCreateMonaco = true
//     }

//     if (editor !== null) {
//         console.log(editor.getValue())
//     }


//     ImGui.End()

//     ImGui.EndFrame()
//     ImGui.Render()


//     // ImGui.StyleColorsDark()
//     ImGui.StyleColorsClassic()

//     // ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.25, 0.25, 0.25, 1))
//     ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.0, 0.0, 0.0, 1))
//     ImGui_Impl.RenderDrawData(ImGui.GetDrawData())
// }









let value2
export let loop = (time: number) => {
    ImGui_Impl.NewFrame(time)
    ImGui.NewFrame()

    let items = [
        "l1",
        "l1",
        "l1",
        "l1",
        // "l2",
        // "l3",
    ]

    if (ImGui.ListBoxHeader("listbox 1", new ImGui.ImVec2(300, 100))) {
        for (let n = 0; n < ImGui.IM_ARRAYSIZE(items); n++) {
            // const is_selected = (item_current_idx.value === n);
            // if (ImGui.Selectable(items[n], is_selected))
            //     item_current_idx.value = n;

            // // Set the initial focus when opening the combo (scrolling + keyboard navigation focus)
            // if (is_selected)
            //     ImGui.SetItemDefaultFocus();


            // ImGui.ListBox(items[n], (_ = value2) => value2 = _, items, 4)
            ImGui.Selectable(items[n], false, ImGui.ImGuiSelectableFlags.None, new ImGui.ImVec2(32, 32))
            ImGui.SameLine()
            ImGui.ImageButton(addTexture._texture, new ImGui.ImVec2(32, 32))
            // ImGui.Button("Select..")
        }
        // ImGui.EndListBox();

        ImGui.ListBoxFooter()
    }



    ImGui.EndFrame()
    ImGui.Render()


    // ImGui.StyleColorsDark()
    ImGui.StyleColorsClassic()

    // ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.25, 0.25, 0.25, 1))
    ImGui_Impl.ClearBuffer(new ImGui.ImVec4(0.0, 0.0, 0.0, 1))
    ImGui_Impl.RenderDrawData(ImGui.GetDrawData())
}
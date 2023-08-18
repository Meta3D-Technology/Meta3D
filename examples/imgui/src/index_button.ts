import * as ImGui from "./imgui"
import * as ImGui_Impl from "./imgui_impl_button"
import { loop } from "./loop_button";

export { ImGui, ImGui_Impl }


// export let ImGuiObject = (obj: any, id: number = 0): number  => {
//     if (obj == null) {
//         ImGui.Text("(null)");
//         return;
//     }
//     Object.entries(obj).forEach(([key, value]) => {
//         ImGui.PushID(id);
//         id++;
//         if (value == null) {
//             ImGui.Text(key + ": (null)");
//         }
//         else if (typeof (value) === 'object') {
//             if (ImGui.TreeNode(key)) {
//                 id = this.ImObject(value, id + 1);
//                 ImGui.TreePop();
//             }
//         }
//         else if (typeof (value) === 'number') {
//             let v = (_: number = value as number): number => obj[key] = _;
//             ImGui.SetNextItemWidth(100);
//             ImGui.InputFloat(key, v);
//         }
//         else if (typeof (value) === 'boolean') {
//             let v = (_: boolean = value as boolean): boolean => obj[key] = _;
//             ImGui.SetNextItemWidth(100);
//             ImGui.Checkbox(key, v);
//         }
//         else {
//             ImGui.Text(key + ": " + value);
//         }
//         ImGui.PopID();
//     })
//     return id;
// }


let _loop = (time: number) =>  {
    loop(time)
    window.requestAnimationFrame(_loop);
}


let _initCanvas = (canvas: HTMLCanvasElement) => {
    ImGui_Impl.window_on_resize()
    canvas.style.touchAction = "none"; // Disable browser handling of all panning and zooming gestures.
}

let _initEvent = (canvas: HTMLCanvasElement) => {
    canvas.addEventListener("blur", ImGui_Impl.canvas_on_blur);
    ImGui_Impl.add_key_event();
    ImGui_Impl.add_pointer_event();
    // canvas.addEventListener("contextmenu", ImGui_Impl.canvas_on_contextmenu);

    // canvas.addEventListener('webglcontextlost', canvas_on_contextlost, false);
    // canvas.addEventListener('webglcontextrestored', canvas_on_contextrestored, false);
}


window.addEventListener('DOMContentLoaded', async () => {
    await ImGui.default();
    ImGui.CHECKVERSION();
    console.log("ImGui.CreateContext() VERSION=", ImGui.VERSION);

    ImGui.CreateContext();
    // ImGui.StyleColorsDark();
    // ImGui.StyleColorsLight();
    // ImGui.StyleColorsClassic();


    console.log(ImGui.GetStyle())
    console.log(JSON.stringify(ImGui.GetStyle()))
 

    // if(ImGui.isMobile.any())    {
    //     ImGui_Impl.setCanvasScale(1);
    //     ImGui_Impl.setFontScale(1.5)
    // }

    const io: ImGui.IO = ImGui.GetIO();
    let font = io.Fonts.AddFontDefault();
    //font.FontName="Microsoft JhengHei";
    //font.FontName="Arial";
    font.FontName = "sans-serif"
    font.FontStyle = "bold";
    //font.FontSize=32;
    //font.Ascent=2.5;

    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    ImGui_Impl.Init(canvas);

    _initCanvas(canvas)
    _initEvent(canvas)

    window.requestAnimationFrame(_loop);
});

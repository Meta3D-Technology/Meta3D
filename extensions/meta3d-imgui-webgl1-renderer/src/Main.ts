import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { service } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { state } from "meta3d-imgui-renderer-protocol/src/state/StateType"
import * as ImGui from "./lib/imgui"
import * as ImGui_Impl from "./lib/imgui_impl"

// let _generateUniqueId = () => {
//     return Math.floor(Math.random() * 1000000.0).toString()
// }

let _initCanvas = (canvas: HTMLCanvasElement) => {
    ImGui_Impl.window_on_resize()
    canvas.style.touchAction = "none" // Disable browser handling of all panning and zooming gestures.
}

let _initEvent = (canvas: HTMLCanvasElement) => {
    canvas.addEventListener("blur", ImGui_Impl.canvas_on_blur)
    ImGui_Impl.add_key_event()
    ImGui_Impl.add_pointer_event()
    // canvas.addEventListener("contextmenu", ImGui_Impl.canvas_on_contextmenu)

    // canvas.addEventListener('webglcontextlost', canvas_on_contextlost, false)
    // canvas.addEventListener('webglcontextrestored', canvas_on_contextrestored, false)
}


export let getExtensionService: getExtensionServiceMeta3D<
    service
> = (api) => {
    return {
        init: (state, isInitEvent, isDebug, canvas) => {
            return ImGui.default().then(_ => {
                if (isDebug) {
                    ImGui.CHECKVERSION()
                    console.log("ImGui.CreateContext() VERSION=", ImGui.VERSION)
                }

                ImGui.CreateContext()

                // if(ImGui.isMobile.any())    {
                //     ImGui_Impl.setCanvasScale(1)
                //     ImGui_Impl.setFontScale(1.5)
                // }

                const io: ImGui.IO = ImGui.GetIO()
                let font = io.Fonts.AddFontDefault()
                //font.FontName="Microsoft JhengHei"
                //font.FontName="Arial"
                font.FontName = "sans-serif"
                font.FontStyle = "bold"
                //font.FontSize=32
                //font.Ascent=2.5

                // const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
                ImGui_Impl.Init(canvas)

                _initCanvas(canvas)

                if (isInitEvent) {
                    _initEvent(canvas)
                }

                return {
                    ...state,
                    isDebug
                }
            })
        },
        beforeExec: (state, time) => {
            ImGui_Impl.NewFrame(time)
            ImGui.NewFrame()

            switch (state.style) {
                case "dark":
                    ImGui.StyleColorsDark();
                    break;
                case "light":
                    ImGui.StyleColorsLight();
                    break;
                case "classic":
                    ImGui.StyleColorsClassic();
                    break;
                default:
                    throw new Error("unknown style: " + state.style)
            }

            return state
        },
        afterExec: () => {
            ImGui.EndFrame()
            ImGui.Render()
        },
        clear: (clearColor) => {
            let [r, g, b, a] = clearColor

            ImGui_Impl.ClearBuffer(new ImGui.ImVec4(r, g, b, a))
        },
        render: () => {
            ImGui_Impl.RenderDrawData(ImGui.GetDrawData())
        },
        setStyle: (state, style) => {
            return {
                ...state,
                style: style
            }
        },
        beginWindow: (label) => {
            // ImGui.Begin(label + "##" + _generateUniqueId())
            ImGui.Begin(label)

            // console.log(
            //     ImGui.IsWindowFocused(),
            //     ImGui.IsWindowAppearing(),
            //     ImGui.IsWindowCollapsed(),
            //     ImGui.IsWindowHovered(),
            //     ImGui.GetWindowDrawList(),
            // )
        },
        endWindow: () => {
            ImGui.End()
        },
        setNextWindowRect: (rect) => {
            ImGui.SetNextWindowPos(new ImGui.ImVec2(rect.x, rect.y));
            ImGui.SetNextWindowSize(new ImGui.ImVec2(rect.width, rect.height));
        },
        addFBOTexture: (texture, { x, y, width, height }) => {
            let pos = ImGui.GetCursorScreenPos();
            let rectMin = ImGui.GetItemRectMin()

            console.log(x, y, width, height)
            console.log(pos, rectMin)

            ImGui.GetWindowDrawList().AddImage(
                texture,
                // new ImGui.ImVec2(rectMin.x + pos.x, rectMin.y + pos.y),
                // new ImGui.ImVec2(pos.x + width / 2, pos.y + height / 2),
                new ImGui.ImVec2(x, y),
                // new ImGui.ImVec2(width, height),
                new ImGui.ImVec2(x + width, y + height),
                new ImGui.ImVec2(0, 1),
                new ImGui.ImVec2(1, 0),
            )
        },
        getWindowBarHeight: () => {
            return ImGui.GetFrameHeight()
        },
        button: (label, [width, height]) => {
            let isClick = ImGui.Button(label, new ImGui.ImVec2(width, height))

            return isClick
        },
        setCursorPos: ([x, y]) => {
            ImGui.SetCursorPos(
                new ImGui.ImVec2(x, y)
            )
        },
        getContext: () => {
            return ImGui_Impl.gl
        },
    }
}

export let createExtensionState: createExtensionStateMeta3D<
    state
> = () => {
    return {
        isDebug: false,
        style: "classic"
    }
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionName) => {
    return {
        onRegister: (meta3dState, service) => {
            return meta3dState
        }
    }
}

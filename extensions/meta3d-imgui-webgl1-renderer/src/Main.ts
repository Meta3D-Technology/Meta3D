import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-imgui-renderer-protocol/src/service/DependentMapType"
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
    dependentExtensionNameMap,
    dependentContributeNameMap,
    service
> = (api, _) => {
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
        afterExec: (state) => {
            ImGui.EndFrame()
            ImGui.Render()

            return state
        },
        clear: (state, clearColor) => {
            let [r, g, b, a] = clearColor

            ImGui_Impl.ClearBuffer(new ImGui.ImVec4(r, g, b, a))

            return state
        },
        render: (state) => {
            ImGui_Impl.RenderDrawData(ImGui.GetDrawData())

            return state
        },
        setStyle: (style, state) => {
            return {
                ...state,
                style: style
            }
        },
        beginWindow: (label, state) => {
            // ImGui.Begin(label + "##" + _generateUniqueId())
            ImGui.Begin(label)

            // console.log(
            //     ImGui.IsWindowFocused(),
            //     ImGui.IsWindowAppearing(),
            //     ImGui.IsWindowCollapsed(),
            //     ImGui.IsWindowHovered(),
            //     ImGui.GetWindowDrawList(),
            // )

            return state
        },
        endWindow: (state) => {
            ImGui.End()

            return state
        },
        setNextWindowRect: (rect, state) => {
            ImGui.SetNextWindowPos(new ImGui.ImVec2(rect.x, rect.y));
            ImGui.SetNextWindowSize(new ImGui.ImVec2(rect.width, rect.height));

            return state
        },
        button: (label, [width, height], state) => {
            let isClick = ImGui.Button(label, new ImGui.ImVec2(width, height))

            return [state, isClick]
        },
        setCursorPos: ([x, y], state) => {
            ImGui.SetCursorPos(
                new ImGui.ImVec2(x, y)
            )

            return state
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
